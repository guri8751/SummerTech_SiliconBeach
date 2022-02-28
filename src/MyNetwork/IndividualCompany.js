import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import "../UI/Dashboard.css";
import { auth, db, logout, uploadPhoto } from "../Firebase/firebase";
import ServiceList from "../Services/ServiceList";
import logo from '../icon.png'
import avatar from '../avatar.jpg'

import company_icon from '../company_icon.png'


function IndividualCompany({ id }) {
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [photoURL, setPhotoURL] = useState(company_icon);
    const [address, setAddress] = useState("");
    const [buttonLoading, setButtonLoading] = useState(false);
    const [city, setCity] = useState("");
    const [abn, setAbn] = useState("");
    const history = useHistory();


    const fetchUserData = async () => {
        try {
            const query = await db
                .collection("users")
                .where("uid", "==", "NQZXgFjT6eRXWfhQAeLFXb6sfi32")
                .get();
            const data = await query.docs[0].data();
            setName(data.name);
            setAddress(data.address);
            setEmail(data.email);
            setCity(data.city);
            setAbn(data.abn);
            setPhotoURL(data.image)
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    };

    useEffect(() => {
        if (loading) return;
        if (!user) return history.replace("/");
        fetchUserData();
    }, [user, loading]);

    return (
        <div className="main-div">

            <div className="dashboard">
                <div className="user">
                    <img src={photoURL} alt="Profile" className="avatar" />
                    <h1>{name}</h1>
                </div>
                <div className="links">
                    <div className="link">
                        <h2>Email: {email}</h2>
                    </div>
                    <div className="link">
                        <h2>Address: {address}</h2>
                    </div>
                    <div className="link">
                        <h2>City: {city}</h2>
                    </div>
                    <div className="link">
                        <h2>ABN: {abn}</h2>
                    </div>


                </div>

            </div>

            <div className="Services">
                <div className="status">
                    <h1>Services</h1>
                </div>
                <ServiceList dashboard={false} id={"NQZXgFjT6eRXWfhQAeLFXb6sfi32"} />
            </div>




        </div>
    );
}

export default IndividualCompany;
