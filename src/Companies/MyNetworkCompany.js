import React from 'react'
import company_icon from '../company_icon.png'
import "../UI/Company.css"
import "../UI/modal"
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase";
import { auth, db } from "../Firebase/firebase";
import IndividualCompany from '../MyNetwork/IndividualCompany';


export default function MyNetworkCompany({ id, city, image, name, email, inAllCompanies, inNetwork }) {
    const [user, loading, error] = useAuthState(auth);
    const [userId, setUserId] = useState("");
    const [network, setNetwork] = useState([]);
    const [companyOpen, setCompanyOpen] = useState(false);

    const [companyID, setCompanyID] = useState(id);


    const fetchUserData = async () => {
        try {
            const query = await db
                .collection("users")
                .where("uid", "==", user?.uid)
                .get();
            const data = await query.docs[0].data();
            setUserId(user?.uid);
            setNetwork(data.network);

        } catch (err) {
            console.error(err);

        }
    };



    const handleClose = () => {
        setCompanyOpen(false);
    }

    const handleOpen = () => {
        setCompanyOpen(true);
    }

    const removeFromNetwork = () => {
        db.collection("users").doc(userId).update({
            network: firebase.firestore.FieldValue.arrayRemove(id)
        });
        fetchUserData();
    }

    useEffect(() => {
        if (loading) return;
        fetchUserData();
    }, [user, loading]);



    return (
        <div className="company">
            <div className="company-body">


            </div>


            <IndividualCompany
                id={id}
            />
            <div className='buttons-container'>
                <button onClick={removeFromNetwork} className='button'>Remove from Network</button>
            </div>
        </div>
    )
}
