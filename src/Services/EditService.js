import React from 'react';
import { useState } from 'react';
import { db } from "../Firebase/firebase";
import Modal from '../UI/modal.js';

export default function EditService({ id, toEditTitle, toEditCost, toEditDescription, open, onClose }) {

    const [title, setTitle] = useState(toEditTitle);
    const [cost, setCost] = useState(toEditCost);
    const [description, setDescription] = useState(toEditDescription);

    const handleEdit = async (e) => {
        e.preventDefault();
        var docRef = db.collection("services").doc(id);
        try {
            await docRef.update({
                title: title,
                cost: cost,
                description: description
            })
            onClose()
        }
        catch (err) {
            alert(err);
        }
    }
    return (
        <Modal modalLabel="Edit Service" onClose={onClose} open={open}>
            <form onSubmit={handleEdit} className="addService" name="addService">
                <input
                    type='text'
                    name='title'
                    onChange={(e) => setTitle(e.target.value.toUpperCase())}
                    value={title} />

                <input
                    type='number'
                    name='cost'
                    onChange={(e) => setCost(e.target.value)}
                    value={cost} />
                <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}></textarea>
                <button type='submit'>Edit</button>
            </form>
        </Modal>
    )
}
