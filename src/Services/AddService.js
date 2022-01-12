import React from 'react'
import { useState, useEffect } from 'react';
import Modal from '../UI/modal.js';
import { useAuthState } from "react-firebase-hooks/auth";
import { addService } from '../Firebase/firebase.js'
import { auth, db } from "../Firebase/firebase";
import './addService.css';

function AddService({ onClose, open }) {
    const [user, loading, error] = useAuthState(auth);
    const [userId, setUserId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [cost, setCost] = useState("");

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

    useEffect(() => {
        if (loading) return;

        fetchUserData();
    }, [user, loading]);


    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(userId)

    }
    return (
        <Modal modalLabel="Add A Service" onClose={onClose} open={open}>
            <form onSubmit={submitHandler} className="addService" name="addService">
                <input
                    type='text'
                    name='title'
                    onChange={(e) => setTitle(e.target.value.toUpperCase())}
                    value={title}
                    placeholder='Enter Title' />

                <input
                    type='number'
                    name='cost'
                    onChange={(e) => setCost(e.target.value)}
                    value={cost}
                    placeholder='Enter Cost' />
                <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder='Enter service decription'
                    value={description}></textarea>
                <button type='submit'>Done</button>
            </form>
        </Modal>
    )
}

export default AddService;
