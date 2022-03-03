import React from 'react'
import firebase from "firebase";
import { useState, useEffect } from 'react';
import Modal from '../UI/modal.js';
import { useAuthState } from "react-firebase-hooks/auth";
import { addService } from '../Firebase/firebase.js'
import { auth, db, uploadPhoto } from "../Firebase/firebase";
import "../UI/UpdatePicture.css";


function UpdatePicture({ onClose, open }) {
    const [user, loading, error] = useAuthState(auth);
    const [userId, setUserId] = useState("");
    const [buttonLoading, setButtonLoading] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [photoURL, setPhotoURL] = useState(null);
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

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setPhoto(e.target.files[0]);
        }
    };

    const handleClick = () => {
        uploadPhoto(photo, user, setButtonLoading)
    };

    useEffect(() => {
        if (loading) return;
        if (user && user.photoURL) {
            setPhotoURL(user.photoURL);
        }
        fetchUserData();
    }, [user, loading]);
    return (
        <Modal modalLabel="Update Picture" onClose={onClose} open={open}>
            <input className="input" onChange={handleChange} type="file"></input>
            <button className="upload-button" disabled={buttonLoading || !photo} onClick={handleClick}>Upload</button>
        </Modal>
    )
}

export default UpdatePicture;
