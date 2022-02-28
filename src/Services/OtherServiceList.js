import React from 'react'
import { useState, useEffect, useCallback } from 'react';
import { db, auth } from "../Firebase/firebase";
import Service from "./Service";
import { useAuthState } from "react-firebase-hooks/auth";
import AddService from "./AddService";


function OtherServiceList({ id, dashboard }) {
    const [user, loading, error] = useAuthState(auth);
    const [photoURL, setPhotoURL] = useState("");
    const [openAddModal, setOpenAddModal] = useState(false);
    const [userId, setUserId] = useState("");
    const [otherServicesArr, setOtherServicesArr] = useState([]);
    const [otherServicesData, setOtherServicesData] = useState([]);
    const [network, setNetwork] = useState([]);
    const [city, setCity] = useState("");


    const fetchUserData = async () => {
        try {
            const query = await db
                .collection("users")
                .where("uid", "==", user?.uid)
                .get();
            const data = await query.docs[0].data();
            setUserId(user?.uid);
            setOtherServicesArr(data.otherServices);

        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    };

    const getSharedServices = useCallback(async () => {
        if (otherServicesArr.length > 0) {
            const data = db.collection("services").where("serviceID", "in", otherServicesArr);
            data.get().then((query) => {
                query.forEach((doc) => {
                    console.log(doc.data(), 'doc');
                    setOtherServicesData(otherServicesData => [...otherServicesData, doc.data()]);
                })
            });
        }
    }, [otherServicesArr])


    useEffect(() => {
        if (loading) return;
        fetchUserData();

    }, [user, loading]);

    useEffect(() => {
        getSharedServices();
    }, [otherServicesArr])



    console.log(otherServicesData, "HEYYY")

    return (
        <div className="service-list">
            <div className="service-conatiner">

                <div className="services">

                    {otherServicesData.map((service) => (
                        <Service
                            id={service.id}
                            key={service.id}
                            title={service.title}
                            description={service.description}
                            advertise={service.advertise}
                            cost={service.cost}
                            dashboard={dashboard}

                        />
                    ))}


                </div>



            </div>

        </div>
    )
}

export default OtherServiceList;
