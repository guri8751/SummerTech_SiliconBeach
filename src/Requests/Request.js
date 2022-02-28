import React from 'react'
import { useState, useEffect } from 'react';
import { auth, db } from "../Firebase/firebase";
import '../UI/Service.css'
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";




function Request({ requestStatus, serviceID, id, senderCompanyID, senderCompanyName, title, description, cost, dashboard, home }) {
    const [editOpen, setEditOpen] = useState(false);
    const [ServiceID, setServiceID] = useState(serviceID);
    const [companyName, setCompanyName] = useState("");
    const [viewOpen, setViewOpen] = useState(false);
    const [user, loading, error] = useAuthState(auth);
    const [userId, setUserId] = useState("");



    const handleEditClose = () => {
        setEditOpen(false);
    }

    const handleViewClose = () => {
        setViewOpen(false);
    }

    const handleApprove = () => {
        try {
            db.collection("users").doc(senderCompanyID).update({
                otherServices: firebase.firestore.FieldValue.arrayUnion(serviceID)
            });
            db.collection("requests").doc(id).update({
                status: "requestAccepted"
            })
            alert("Service Added!")
        }
        catch (err) {
            alert(err)
        }

    }

    const handleRetract = () => {
        try {
            db.collection("users").doc(senderCompanyID).update({
                otherServices: firebase.firestore.FieldValue.arrayRemove(serviceID)
            });
            db.collection("requests").doc(id).update({
                status: "requestRaised"
            })
            alert("Service Retracted!")
        }
        catch (err) {
            alert(err)
        }

    }

    const handleDeny = () => {
        try {
            db.collection("requests").doc(id).update({
                status: "requestDenied"
            })
        }
        catch (err) {
            alert(err)
        }

    }

    return (
        <div className="service">
            <div className='service__body'>
                <div>
                    <h2>{senderCompanyName} has sent you a service request!</h2>
                    <h2>Service Details:</h2>
                    <h2>{title}</h2>
                    <p>{description}</p>
                </div>
                <div>
                    <h2>${cost}</h2>
                    {(requestStatus == "requestAccepted") && <div>
                        <p>Request Approved</p>
                        <a className='button' onClick={handleRetract}>Retract Service</a>
                    </div>}
                    {(requestStatus == "requestDenied") && <div>
                        <p>Request Denied</p>
                        <a className='button' onClick={handleApprove}>Approve Request</a>
                    </div>}
                    {(requestStatus == "requestRaised") && <div>
                        <a className='button' onClick={handleApprove}>Approve</a>
                        <a className='button' onClick={handleDeny}>Deny</a>
                    </div>}


                </div>


            </div>



        </div>


    )
}

export default Request;
