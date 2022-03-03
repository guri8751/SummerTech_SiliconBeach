import React from 'react'
import { useState, useEffect, useCallback } from 'react';
import { db, auth } from "../Firebase/firebase";
import Service from "./Service";
import { useAuthState } from "react-firebase-hooks/auth";
import AddService from "./AddService";


function ServiceList({ id, dashboard }) {
    const [user, loading, error] = useAuthState(auth);
    const [photoURL, setPhotoURL] = useState("");
    const [openAddModal, setOpenAddModal] = useState(false);
    const [userId, setUserId] = useState("");
    const [services, setServices] = useState([]);

    const fetchUserData = async () => {
        try {
            const query = await db
                .collection("users")
                .where("uid", "==", user?.uid)
                .get();
            const data = await query.docs[0].data();
            setUserId(user?.uid);
            setPhotoURL(user?.photoURL);

        } catch (err) {
            console.error(err);

        }
    };

    const fetchServices = useCallback(async () => {
        try {
            db.collection('services').where("companyID", "==", id)
                .onSnapshot((snapshot) => {
                    setServices(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                })
        }
        catch (err) {
            console.error(err);

        }
    })

    useEffect(() => {
        if (loading) return;

        fetchUserData();
    }, [user, loading]);

    useEffect(() => {
        fetchServices();
    })



    return (
        <div className="service-list">
            <div className="service-conatiner">
                {dashboard && <a onClick={() => setOpenAddModal(true)} className="user-btn add-service">+ Add A New Service</a>}

                <div className="services">

                    {services.map((service) => (
                        <Service
                            id={service.id}
                            key={service.id}
                            title={service.data.title}
                            description={service.data.description}
                            advertise={service.data.advertise}
                            serviceID={service.id}
                            cost={service.data.cost}
                            dashboard={dashboard}
                        />
                    ))}


                </div>



            </div>



            {openAddModal &&
                <AddService id={userId} onClose={() => setOpenAddModal(false)} open={openAddModal} />}

        </div>
    )
}

export default ServiceList;
