import React from 'react'
import { useState, useEffect } from 'react';
import { db, auth } from "../Firebase/firebase";
import Service from "./Service";
import { useAuthState } from "react-firebase-hooks/auth";
import AddService from "./AddService";


function ServiceList() {
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
            alert("An error occured while fetching user data");
        }
    };

    useEffect(() => {
        if (loading) return;

        fetchUserData();
    }, [user, loading]);

    useEffect(() => {
        db.collection('services')
            .onSnapshot((snapshot) => {
                setServices(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
    }, [])

    return (
        <div className="service-list">
            <div className="service-conatiner">
                <a onClick={() => setOpenAddModal(true)} className="user-btn add-service">+ Add A New Service</a>
                <div className="services">

                    {services.map((service) => (
                        <Service
                            id={service.id}
                            key={service.id}
                            title={service.data.title}
                            description={service.data.description}
                            advertise={service.data.advertise}
                            cost={service.data.cost}
                        />
                    ))}


                </div>



            </div>



            {openAddModal &&
                <AddService onClose={() => setOpenAddModal(false)} open={openAddModal} />}

        </div>
    )
}

export default ServiceList;
