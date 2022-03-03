import React, { useCallback } from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../Firebase/firebase";
import { useState, useEffect } from 'react';
import MyNetworkCompany from './MyNetworkCompany';

function MyNetwork() {
    const [user, loading, error] = useAuthState(auth);
    const [userId, setUserId] = useState("");
    const [network, setNetwork] = useState([]);
    const [companies, setCompanies] = useState([]);


    const fetchUserData = useCallback(async () => {
        try {
            const query = await db
                .collection("users")
                .where("uid", "==", user?.uid)
                .get();
            const data = query.docs[0].data();
            setUserId(user?.uid);
            setNetwork(data.network);
        } catch (err) {
            console.error(err);

        }
    }, [user?.uid]);

    const getCompanies = useCallback(async () => {
        if (network.length > 0) {
            const data = db.collection("users").where("uid", "in", network);
            data.get().then((query) => {
                query.forEach((doc) => {
                    console.log(doc.data(), 'doc');
                    setCompanies(companies => [...companies, doc.data()]);
                })
            });
        }
    }, [network])

    useEffect(() => {
        fetchUserData();
        return (() => {
            setUserId('');
            setNetwork([]);
        })
    }, [fetchUserData]);

    const handleClick = () => {
        console.log("Company Clicked")
    }

    useEffect(() => {
        getCompanies();
    }, [network])


    return (
        <div className="Companies">
            <h1>MY NETWORK</h1>
            <div className="companies-list" >

                {companies.map((company) => (
                    <MyNetworkCompany
                        id={company.uid}
                        key={company.uid}
                        image={company.image}
                        name={company.name}
                        city={company.city}
                        inNetwork={true}
                        inAllCompanies={false}
                        email={company.email} onClick={handleClick} />
                ))}


            </div>
        </div>
    )
}

export default MyNetwork;

