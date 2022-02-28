import React from 'react'
import { useState, useEffect, useCallback } from 'react';
import { db, auth } from "../Firebase/firebase";
import Service from "../Services/Service";
import { useAuthState } from "react-firebase-hooks/auth";
import '../UI/Home.css'
import Request from "./Request";


function RequestList({ id, dashboard }) {

    const [user, loading, error] = useAuthState(auth);
    const [senderCompanyID, setSenderCompanyID] = useState("");
    const [openViewModal, setOpenViewModal] = useState(false);
    const [services, setServices] = useState([]);
    const [userId, setUserId] = useState("");
    const [requests, setRequests] = useState([]);

    const fetchUserData = async () => {
        try {
            const query = await db
                .collection("users")
                .where("uid", "==", user?.uid)
                .get();
            const data = await query.docs[0].data();
            setUserId(user?.uid);

        } catch (err) {
            console.error(err);

        }
    };

    const fetchRequests = useCallback(async () => {
        try {
            db.collection('requests').where("receiverID", "==", userId)
                .onSnapshot((snapshot) => {
                    setRequests(snapshot.docs.map(doc => ({
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
        fetchRequests();
    })
    return (
        <div className="home-div">
            <h1 className="heading">Requests</h1>
            <div className="service-conatiner">
                <div className="services-home">
                    {requests.map((request) => (
                        <Request
                            id={request.id}
                            key={request.id}
                            title={request.data.serviceName}
                            description={request.data.serviceDescription}
                            cost={request.data.serviceCost}
                            serviceID={request.data.serviceID}
                            senderCompanyID={request.data.senderID}
                            requestStatus={request.data.status}
                            senderCompanyName={request.data.senderCompanyName}
                            home={true}
                        />
                    ))}


                </div>



            </div>


        </div>
    )
}

export default RequestList;
