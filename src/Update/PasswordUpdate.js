import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import "./Reset.css";
import { auth, db, passwordUpdate } from "../Firebase/firebase";

function PasswordUpdate() {
    const [user, loading, error] = useAuthState(auth);
    const [userID, setUserID] = useState("");
    const [passChanged, setPassChanged] = useState(false);
    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const history = useHistory();

    const fetchUserData = async () => {
        try {
            const query = await db
                .collection("users")
                .where("uid", "==", user?.uid)
                .get();
            const data = await query.docs[0].data();
            setUserID(user?.uid);

        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    };

    const update = () => {
        if (newPass !== confirmPass) {
            return alert("Passwords do not match");
        }
        passwordUpdate(newPass);
        setPassChanged(true);

    }

    useEffect(() => {
        if (loading) return;
        if (!user) return history.replace("/dashboard");

        fetchUserData();
    }, [user, loading]);

    return (
        <div className="reset">
            <div className="reset__container">
                <h2>Password Update</h2>
                {passChanged && <p>Password Changed!</p>}
                <input
                    type="password"
                    className="reset__textBox"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    placeholder="New Password"
                />

                <input
                    type="password"
                    className="reset__textBox"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    placeholder="Confirm Password"
                />

                <button className="reset__btn" onClick={update}>
                    Update Password
            </button>
            </div>
        </div>
    );
}

export default PasswordUpdate;
