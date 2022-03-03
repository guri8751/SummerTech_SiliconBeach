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
    const [network, setNetwork] = useState([]);

    const fetchUserData = async () => {
        try {
            const query = await db
                .collection("users")
                .where("uid", "==", user?.uid)
                .get();
            const data = await query.docs[0].data();
            setUserId(user?.uid);
            setPhotoURL(user?.photoURL);
            setNetwork(data.network)

        } catch (err) {
            console.error(err);

        }
    };



    // const fetchServices = useCallback(async () => {
    //     try {
    //         db.collection('services').where("companyID", "!=", id)
    //             .onSnapshot((snapshot) => {
    //                 setServices(snapshot.docs.map(doc => ({
    //                     id: doc.id,
    //                     data: doc.data()
    //                 })))
    //             })
    //     }
    //     catch (err) {
    //         console.error(err);

    //     }
    // })

    const getServices = useCallback(async () => {
        if (network.length > 0) {
            const data = db.collection("services").where("companyID", "in", network);
            data.get().then((query) => {
                query.forEach((doc) => {
                    console.log(doc.data(), 'doc');
                    setServices(services => [...services, doc.data()]);
                })
            });
        }
    }, [network])

    useEffect(() => {
        if (loading) return;
        fetchUserData();
    }, [user, loading]);

    useEffect(() => {
        getServices();
    }, [network])

    return (
        <div className="home-div">
            <h1 className="heading">News Feed</h1>
            <div className="service-conatiner">
                <div className="services-home">
                    {services.map((service) => (
                        <HomeService
                            id={service.id}
                            key={service.id}
                            title={service.title}
                            description={service.description}
                            advertise={service.advertise}
                            cost={service.cost}
                            dashboard={false}
                            home={true}
                        />
                    ))}


                </div>



            </div>


        </div>
    )
}

export default Home;
