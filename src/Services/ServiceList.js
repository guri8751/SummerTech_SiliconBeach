import React from 'react'
import { useState, useEffect } from 'react';
import { db } from "../Firebase/firebase";
import Service from "./Service";
import AddService from "./AddService";


function ServiceList() {
    const [openAddModal, setOpenAddModal] = useState(false);
    const [services, setServices] = useState([]);

    useEffect(() => {
        db.collection('services').orderBy('created', 'desc')
            .onSnapshot((snapshot) => {
                setServices(snapshot.doc.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
    }, [])

    return (
        <div className="service-list">
            <div className="service-conatiner">
                <a onClick={() => setOpenAddModal(true)} className="user-btn add-service">+ Add A New Service</a>
                <div className="services">
                    {services.map((service) => {
                        <Service
                            id={service.id}
                            key={service.key}
                            title={service.data.title}
                            description={service.data.description}
                            cost={service.data.cost} />
                    })}
                </div>


            </div>

            <div className="cards">
                <div className="card">
                    <div className="card-info">
                        <h2>Service 1</h2>
                        <p>Service 1 Description</p>
                    </div>
                    <h2 className="percentage">$60</h2>
                </div>
                <div className="card">

                    <div className="card-info">
                        <h2>Service 2</h2>
                        <p>Service 2 Description</p>

                    </div>
                    <h2 className="percentage">$80</h2>
                </div>

            </div>

            {openAddModal &&
                <AddService onClose={() => setOpenAddModal(false)} open={openAddModal} />}

        </div>
    )
}

export default ServiceList;
