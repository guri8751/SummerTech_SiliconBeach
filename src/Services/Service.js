import React from 'react'
import { useState } from 'react';
import { auth, db } from "../Firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";


function Service({ id, title, description, cost }) {
    const [user, loading, error] = useAuthState(auth);
    const [userId, setUserId] = useState("");
    const [openEdit, setOpenEdit] = useState("false");
    const [openView, setOpenView] = useState("false");

    setUserId(user?.uid);

    const clickEdit = () => {
        setOpenEdit(true);
    }

    const handleClose = () => {
        setOpenEdit(false);
        setOpenView(false);
    }

    const clickView = () => {
        setOpenView(true);
    }

    const handleDelete = () => {
        try {
            db.collection('services').doc(userId).delete();
        }
        catch (err) {
            alert(err);
        }
    }

    return (
        <div>
            <h2>{title}</h2>
            <h2>{cost}</h2>
            <p>{description}</p>
            <button className="button" onClick={clickEdit}>
                Edit
            </button>
            <button className="button" onClick={clickView}>
                View
            </button>
            <button className="button" onClick={handleDelete}>
                Delete
            </button>



        </div>


    )
}

export default Service;
