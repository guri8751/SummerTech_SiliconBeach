import React from 'react'
import { useState } from 'react';
import Modal from './UI/Modal.js';
import { useAuthState } from "react-firebase-hooks/auth";
import AddService from './Firebase/firebase.js'
import { auth, db, logout, uploadPhoto } from "../Firebase/firebase";

function AddService() {
    const [user, loading, error] = useAuthState(auth);
    const [userId, setUserId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [cost, setCost] = useState("");

    setUserID(user?.uid);

    const submitHandler = async (e) => {
        e.preventDefault();
        AddService(userId, title, description, cost);
    }
    return (
        <Modal modalLabel="Add Service" onClose={onClose} open={open}>
            <form onSubmit={submitHandler} className="addTask" name="addTask">
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
