import React from 'react'
import { useState } from 'react';
import { auth, db } from "../Firebase/firebase";
import '../UI/Service.css'
import { useAuthState } from "react-firebase-hooks/auth";
import EditService from './EditService';


function Service({ id, title, description, cost }) {
    const [editOpen, setEditOpen] = useState(false);

    const handleClose = () => {
        setEditOpen(false);
    }

    const handleDelete = () => {
        try {
            db.collection("services").doc(id).delete()
        }
        catch (err) {
            alert(err);
        }

    }



    return (
        <div className="service">
            <div className='service__body'>
                <div>
                    <h2>{title}</h2>
                    <p>{description}</p>
                </div>
                <div>
                    <h2>${cost}</h2>
                    <div className='buttons-container'>
                        <a
                            className='button'
                            onClick={() => setEditOpen(true)}>
                            Edit
                        </a>
                        <a className='button' onClick={handleDelete}>Delete</a>
                    </div>
                </div>


            </div>

            {editOpen &&
                <EditService
                    onClose={handleClose}
                    toEditTitle={title}
                    toEditDescription={description}
                    toEditCost={cost}
                    open={editOpen}
                    id={id} />}

        </div>


    )
}

export default Service;
