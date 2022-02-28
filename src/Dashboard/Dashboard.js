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
import Profile from "./Profile";
import Home from "../Home/Home"
import RequestList from "../Requests/RequestList"


function Dashboard() {

  const [user, loading, error] = useAuthState(auth);

  const [userId, setUserId] = useState("");

  const fetchUserData = async () => {
    try {
      const query = await db
        .collection("users")
        .where("uid", "==", user?.uid)
        .get();
      const data = await query.docs[0].data();
      setUserId(user?.uid);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };



  useEffect(() => {
    if (loading) return;
    fetchUserData();
  }, [user, loading]);


  const [showProfile, setShowProfile] = useState(false);
  const [showHome, setShowHome] = useState(true);
  const [showRequests, setShowRequests] = useState(false);

  const homeClicked = () => {
    setShowHome(true);
    setShowProfile(false);
    setShowRequests(false);
  }

  const profileClicked = () => {
    setShowHome(false);
    setShowProfile(true);
    setShowRequests(false);
  }

  const requestsClicked = () => {
    setShowHome(false);
    setShowProfile(false);
    setShowRequests(true);
  }


  return (
    <div className="outer-div">
      <div className="main-nav">
        <h1 onClick={homeClicked}>Home</h1>
        <h1 onClick={profileClicked}>Profile</h1>
        <h1 onClick={requestsClicked}>Requests</h1>
      </div>
      {showHome && <Home id={userId} dashboard={false} />}
      {showProfile && <Profile />}
      {showRequests && <RequestList />}
    </div>
  );
}

export default Dashboard;
