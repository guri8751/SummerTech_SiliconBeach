import React from 'react'
import company_icon from '../company_icon.png'
import "../UI/Company.css"
import { useState, useEffect } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase";
import { auth, db } from "../Firebase/firebase";


export default function Company({ id, city, image, name, email }) {
    const [user, loading, error] = useAuthState(auth);
    const [userId, setUserId] = useState("");

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
            alert("An error occured while fetching user data");
        }
    };

    const addToNetwork = () => {
        db.collection("users").doc(userId).update({
            network: firebase.firestore.FieldValue.arrayUnion(id)
        });

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
                    <div className='buttons-container'>
                        <button onClick={addToNetwork} className='button'>Add to Network</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
