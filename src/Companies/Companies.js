import React, { useCallback } from 'react'
import "../UI/Companies.css"
import { useState, useEffect } from 'react';
import { db, auth } from "../Firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Company from './Company';


function Companies() {
    const [user, loading, error] = useAuthState(auth);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [userId, setUserId] = useState("");
    const [companies, setCompanies] = useState([]);

    const fetchUserData = async () => {
        try {
            const query = await db
                .collection("users")
                .where("uid", "==", user?.uid)
                .get();
            setUserId(user?.uid);

        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    };



    const handleClick = () => {
        console.log("Company Clicked")
    }

    const fetchCompanies = useCallback(async () => {
        try {
            db.collection('users').where("uid", "!=", userId)
                .onSnapshot((snapshot) => {
                    setCompanies(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                })
        }

        catch (err) {
            console.error(err);
            alert("An error occured while fetching service data");
        }
    })

    useEffect(() => {
        if (loading) return;

        fetchUserData();
    }, [user, loading]);

    useEffect(() => {
        fetchCompanies();
    }, [])

    return (
        <div className="Companies">
            <h1>COMPANIES</h1>
            <div className="companies-list" >

                {companies.map((company) => (
                    <Company
                        id={company.id}
                        key={company.id}
                        image={company.data.image}
                        name={company.data.name}
                        city={company.data.city}
                        inAllCompanies={true}
                        inNetwork={false}
                        email={company.data.email} onClick={handleClick} />
                ))}


            </div>
        </div>
    )
}

export default Companies;
