import React from 'react'
import firebase from "firebase";
import { useState, useEffect, useCallback } from 'react';
import Modal from '../UI/modal.js';
import { useAuthState } from "react-firebase-hooks/auth";
import { addService } from '../Firebase/firebase.js'
import { auth, db } from "../Firebase/firebase";
import '../UI/addService.css';
import AddService from './AddService.js';

function ViewService({ senderCompany, dashboard, senderCompanyName, serviceID, title, cost, description, onClose, open }) {

    const [receiverCompany, setReceiverCompany] = useState("");
    const [requestStatus, setRequestStatus] = useState("");

    const fetchReceiverCompany = async () => {
        try {
            const query = await db
                .collection("services")
                .where("serviceID", "==", serviceID)
                .get();
            const data = await query.docs[0].data();
            setReceiverCompany(data.companyID);
        } catch (err) {
            console.error(err);

        }
    };

    const fetchRequestStatus = async () => {
        try {
            const query = await db
                .collection("requests")
                .where("serviceID", "==", serviceID)
                .get();
            const data = await query.docs[0].data();
            setRequestStatus(data.status);
        } catch (err) {
            console.error(err);

        }
    };

    const AddRequest = async () => {
        try {
            console.log(receiverCompany, "COMPANY")
            await db.collection("requests").doc().set({
                receiverID: receiverCompany,
                senderID: senderCompany,
                serviceID: serviceID,
                serviceName: title,
                senderCompanyName: senderCompanyName,
                serviceCost: cost,
                serviceDescription: description,
                status: "requestRaised"
            })
            onClose()
        }
        catch (err) {
            console.error(err);

        }
    }

    useEffect(() => {
        fetchReceiverCompany();
        fetchRequestStatus();
    }, []);


    return (
        <Modal modalLabel="Service Details" onClose={onClose} open={open}>
            <div>
                <p>Title: {title}</p>

                <p>Cost: ${cost}</p>

                <p>{requestStatus}</p>

                <p>Description: {description}</p>

                {!dashboard && <button onClick={AddRequest}>Request Service</button>}
            </div>
        </Modal>
    )
}

export default ViewService;
