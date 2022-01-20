import React from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../Firebase/firebase";
import { useState, useEffect } from 'react';
import Company from './Company';

function MyNetwork() {
    const [user, loading, error] = useAuthState(auth);
    const [userId, setUserId] = useState("");
    const [network, setNetwork] = useState([]);
    const [companies, setCompanies] = useState([]);


    const fetchUserData = async () => {
        try {
            const query = await db
                .collection("users")
                .where("uid", "==", user?.uid)
                .get();
            const data = await query.docs[0].data();
            setUserId(user?.uid);
            setNetwork(data.network);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    };

    useEffect(() => {
        if (loading) return;
        fetchUserData();
    }, [user, loading]);

    const handleClick = () => {
        console.log("Company Clicked")
    }

    useEffect(() => {
        network.map((company) => {
            let array = []
            db.collection('users').where("uid", "==", company)
                .get().then((querySnapshot) => {

                    querySnapshot.forEach((doc) => {

                        array.push(doc.data())

                    })
                    setCompanies(array)


                })


        })

    }, [])


    return (
        <div className="Companies">
            <h1>COMPANIES</h1>
            {network.length}
            {companies.length}
            <div className="companies-list" >

                {companies.map((company) => (
                    <Company
                        id={company.data.uid}
                        key={company.id}
                        image={company.data.image}
                        name={company.data.name}
                        city={company.data.city}
                        email={company.data.email} onClick={handleClick} />
                ))}


            </div>
        </div>
    )
}

export default MyNetwork;

