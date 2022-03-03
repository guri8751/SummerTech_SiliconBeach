import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import "../UI/Dashboard.css";
import { auth, db, logout, uploadPhoto } from "../Firebase/firebase";
import ServiceList from "../Services/ServiceList";
import OtherServiceList from "../Services/OtherServiceList";
import logo from '../icon.png'
import avatar from '../avatar.jpg'
import UpdatePicture from './UpdatePicture';
import company_icon from '../company_icon.png'
import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";


function Profile() {
    const [user, loading, error] = useAuthState(auth);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [name, setName] = useState("");
    const [userId, setUserId] = useState("");
    const [photo, setPhoto] = useState(null);
    const [photoURL, setPhotoURL] = useState(company_icon);
    const [address, setAddress] = useState("");
    const [buttonLoading, setButtonLoading] = useState(false);
    const [city, setCity] = useState("");
    const [abn, setAbn] = useState("");
    const history = useHistory();

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setPhoto(e.target.files[0]);
        }
    };

    const handleClick = () => {
        uploadPhoto(photo, user, setButtonLoading)
    };

    const fetchUserData = async () => {
        try {
            const query = await db
                .collection("users")
                .where("uid", "==", user?.uid)
                .get();
            const data = await query.docs[0].data();

            setUserId(user?.uid);
            setName(data.name);
            setAddress(data.address);
            setCity(data.city);
            setAbn(data.abn);
        } catch (err) {
            console.error(err);

        }
    };



    useEffect(() => {
        if (loading) return;
        if (!user) return history.replace("/");
        if (user && user.photoURL) {
            setPhotoURL(user.photoURL);

        }
        fetchUserData();
    }, [user, loading]);



    return (
        <div className="outer-div">
            <div className="main-div">

                <div className="dashboard">
                    <div className="user">
                        <img src={photoURL} alt="Profile" className="avatar" />

                        <a onClick={() => setOpenAddModal(true)} className="user-btn add-service">Update Picture</a>
                        {openAddModal &&
                            <UpdatePicture onClose={() => setOpenAddModal(false)} open={openAddModal} />}
                        <h1>{name}</h1>
                    </div>
                    <div className="links">
                        <div className="link">
                            <h2>Email: {user?.email}</h2>
                        </div>
                        <div className="link">
                            <h2>Address: {address}</h2>
                        </div>
                        <div className="link">
                            <h2>City: {city}</h2>
                        </div>
                        <div className="link">
                            <h2>ABN: {abn}</h2>
                        </div>
                        <div className="buttons">
                            <a className="user-btn"><Link className="button-link" to="/updateprofile">Update Profile</Link></a>
                            <a className="user-btn"><Link className="button-link" to="/passwordupdate">Update Password</Link></a>
                            <a className="user-btn" onClick={logout}>Logout</a>
                        </div>


                    </div>

                </div>

                <div className="Services">
                    <div>
                        <a className="user-btn"><Link className="button-link" to="/companies">All Companies</Link></a>
                        <a className="user-btn add-service"><Link className="button-link" to="/network">My Network</Link></a>
                        <a className="user-btn add-service"><Link className="button-link" to="/home">Home</Link></a>
                    </div>
                    <div className="status">
                        <h1>Services</h1>
                    </div>
                    <ServiceList dashboard={true} id={userId} />
                    <div className="status">
                        <h1>Shared Services</h1>
                    </div>
                    <OtherServiceList dashboard={false} id={userId} />

                </div>




            </div>
        </div>
    );
}

export default Profile;
