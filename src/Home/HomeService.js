import React from 'react'
import { useState, useEffect } from 'react';
import { auth, db } from "../Firebase/firebase";
import '../UI/Service.css'
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import ViewService from "../Services/ViewService";

function HomeService({ serviceID, id, title, description, cost }) {
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
            setCompanyName(data.name);
            setOtherServices(data.otherServices)

        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
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
            alert(err);
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
            alert(err)
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
                    <p>{ServiceID}</p>
                    <p>{description}</p>

                </div>
                <div>
                    <h2>${cost}</h2>
                    <a className='button' onClick={() => setViewOpen(true)} >View Service</a>
                </div>
            </div>

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

export default HomeService;
