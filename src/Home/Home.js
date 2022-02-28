import React from 'react'
import { useState, useEffect, useCallback } from 'react';
import { db, auth } from "../Firebase/firebase";
import HomeService from "./HomeService";
import { useAuthState } from "react-firebase-hooks/auth";
import '../UI/Home.css'


function Home({ id, dashboard }) {

    const [user, loading, error] = useAuthState(auth);
    const [photoURL, setPhotoURL] = useState("");
    const [userId, setUserId] = useState("");
    const [openViewModal, setOpenViewModal] = useState(false);
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
            db.collection('services').where("companyID", "!=", id)
                .onSnapshot((snapshot) => {
                    setServices(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                })
        }
        catch (err) {
            console.error(err);
            alert("An error occured while fetching service data");
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
        <div className="home-div">
            <h1 className="heading">News Feed</h1>
            <div className="service-conatiner">
                <div className="services-home">
                    {services.map((service) => (
                        <HomeService
                            id={service.id}
                            key={service.id}
                            title={service.data.title}
                            description={service.data.description}
                            advertise={service.data.advertise}
                            cost={service.data.cost}
                            dashboard={dashboard}
                            home={true}
                        />
                    ))}


                </div>



            </div>


        </div>
    )
}

export default Home;
