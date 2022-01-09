import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import "./Dashboard.css";
import { auth, db, logout } from "../Firebase/firebase";
import logo from '../icon.png'

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
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
      setName(data.name);
      setAddress(data.address);
      setCity(data.city);
      setAbn(data.abn);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return history.replace("/");

    fetchUserData();
  }, [user, loading]);

  return (
    <div className="dashboard">
      <img className="image" src={logo} />
      <div className="dashboard__container">
        <h1>User Details</h1>
        <div className="details"><span className="heading">Email: </span>{user?.email}</div>
        <div className="details"><span className="heading">Name: </span>{name}</div>
        <div className="details"><span className="heading">Address: </span>{address}</div>
        <div className="details"><span className="heading">City: </span>{city}</div>
        <div className="details"><span className="heading">ABN: </span>{abn}</div>
        <button className="dashboard__btn btn1"><Link className="link" to="/updateprofile">Update Profile</Link></button>
        <button className="dashboard__btn btn2"><Link className="link" to="/passwordupdate">Update Password</Link></button>
        <button className="dashboard__btn btn3" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
