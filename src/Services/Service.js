import React from 'react'
import { useState, useEffect } from 'react';
import { auth, db } from "../Firebase/firebase";
import '../UI/Service.css'
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import EditService from './EditService';
import ViewService from "./ViewService";



function Service({ serviceID, id, advertise, title, description, cost, dashboard, home }) {
    const [editOpen, setEditOpen] = useState(false);
    const [ServiceID, setServiceID] = useState(serviceID);
    const [companyName, setCompanyName] = useState("");
    const [viewOpen, setViewOpen] = useState(false);
    const [user, loading, error] = useAuthState(auth);
    const [userId, setUserId] = useState("");
    const [otherServices, setOtherServices] = useState([]);

    const fetchUserData = async () => {
        try {
            const query = await db
                .collection("users")
                .where("uid", "==", user?.uid)
                .get();
            const data = await query.docs[0].data();
            setUserId(user?.uid);
            setCompanyName(data.name)
            setOtherServices(data.otherServices)

        } catch (err) {
            console.error(err);

        }
    };


    const handleEditClose = () => {
        setEditOpen(false);
    }

    const handleViewClose = () => {
        setViewOpen(false);
    }

    const handleDelete = () => {
        try {
            db.collection("services").doc(serviceID).delete()
        }
        catch (err) {
            console.log(err);
        }

    }

    const addToCompany = () => {
        try {
            db.collection("users").doc(userId).update({
                otherServices: firebase.firestore.FieldValue.arrayUnion(serviceID)
            });
            alert("Service Added!")
        }
        catch (err) {
            console.log(err)
        }

    }

    const removeService = async () => {
        db.collection("users").doc(userId).update({
            otherServices: firebase.firestore.FieldValue.arrayRemove(serviceID)
        });
    }

    useEffect(() => {
        if (loading) return;
        fetchUserData();
    }, [user, loading]);



    return (
        <div className="service">
            <div className='service__body'>
                <div>
                    <h2>{title}</h2>
                    {!home && <p>{description}</p>}
                    {dashboard && <p>Advertise to other companies: {advertise}</p>}

                </div>
                <div>
                    <h2>${cost}</h2>
                    {dashboard && <div className='buttons-container'>
                        <a
                            className='button'
                            onClick={() => setEditOpen(true)}>
                            Edit
                        </a>
                        <a className='button' onClick={handleDelete}>Delete</a>
                    </div>}

                    {!dashboard && [(otherServices.includes(serviceID)) ?
                        (<div>
                            <a className='button' onClick={removeService} >Remove Service</a></div>) :
                        <a onClick={addToCompany} className='button' >Add Service</a>]}

                    {home && <a className='button' onClick={() => setViewOpen(true)} >View Service</a>}

                </div>


            </div>

            {editOpen &&
                <EditService
                    onClose={handleEditClose}
                    toEditTitle={title}
                    toEditDescription={description}
                    toEditCost={cost}
                    open={editOpen}
                    serviceID={serviceID} />}

            {viewOpen &&
                <ViewService
                    onClose={handleViewClose}
                    title={title}
                    description={description}
                    cost={cost}
                    open={viewOpen}
                    senderCompanyName={companyName}
                    senderCompany={userId}
                    serviceID={id} />}

        </div>


    )
}

export default Service;
