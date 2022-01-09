import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import "./Reset.css";
import { auth, db, updateData, logout } from "../Firebase/firebase";

function UpdateProfile() {
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("Name");
    const [email, setEmail] = useState("");
    const [userID, setUserID] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [abn, setAbn] = useState("");
    const history = useHistory();

    const fetchUserData = async () => {
        try {
            const query = await db
                .collection("users")
                .where("uid", "==", user?.uid)
                .get();
            const data = await query.docs[0].data();
            setUserID(user?.uid);
            setName(data.name);
            setAddress(data.address);
            setCity(data.city);
            setAbn(data.abn);

        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    };

    const update = () => {
        updateData(userID, name, address, city, abn);
        history.replace("/dashboard");

    }

    useEffect(() => {
        if (loading) return;
        if (!user) return history.replace("/dashboard");

        fetchUserData();
    }, [user, loading]);

    return (
        <div className="reset">
            <div className="reset__container">
                <h1>Update Profile</h1>
                <input
                    type="text"
                    className="reset__textBox"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Company Name"
                />

                <input
                    type="text"
                    className="reset__textBox"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Address"
                />
                <input
                    type="text"
                    className="reset__textBox"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                />
                <input
                    type="text"
                    className="reset__textBox"
                    value={abn}
                    onChange={(e) => setAbn(e.target.value)}
                    placeholder="ABN"
                />
                <button className="reset__btn" onClick={update}>
                    Update
            </button>

            </div>
        </div>
    );
}

export default UpdateProfile;
