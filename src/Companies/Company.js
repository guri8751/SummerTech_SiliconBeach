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


export default function Company({ id, city, image, name, email, inAllCompanies, inNetwork }) {
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

    const addToNetwork = () => {
        db.collection("users").doc(userId).update({
            network: firebase.firestore.FieldValue.arrayUnion(id)
        });
        fetchUserData();

    }

    const handleClose = () => {
        setCompanyOpen(false);
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
                <div className="company-data">
                    <div className="img-container">
                        <img className="company-logo" src={image} />
                    </div>
                    <h2>{name}</h2>
                    <p>{email}</p>
                    <p>{city}</p>

                </div>
                <div>
                    {inAllCompanies && [network.includes(id) ? (<div className='buttons-container'>
                        <button className='button'> ✓ Added</button>
                    </div>) : (<div className='buttons-container'>
                        <button onClick={addToNetwork} className='button'>Add to Network</button>
                    </div>)]}

                    {inNetwork && <a className="user-btn"><Link className="button-link" to={{ pathname: "/individualcompany", state: { companyID } }}>View Info</Link></a>}


                    {inNetwork && <div className='buttons-container'>
                        <button onClick={removeFromNetwork} className='button'>Remove from Network</button>
                    </div>}


                </div>
            </div>

            {companyOpen &&
                <IndividualCompany
                    id={id}
                    open={companyOpen}
                    onClose={handleClose} />}
        </div>
    )
}
