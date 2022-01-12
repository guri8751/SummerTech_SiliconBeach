import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import "./Dashboard.css";
import { auth, db, logout, uploadPhoto } from "../Firebase/firebase";
import logo from '../icon.png'
import avatar from '../avatar.jpg'

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState("");
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
    if (user && user.photoURL) {
      setPhotoURL(user.photoURL);
    }
    fetchUserData();
  }, [user, loading]);

  return (
    <div className="main-div">
      {/* <img className="image" src={logo} />
      <div className="dashboard__container">
        <h1>User Details</h1>
        <input onChange={handleChange} type="file"></input>
        <button disabled={buttonLoading || !photo} onClick={handleClick}>Upload</button>
        <img src={photoURL} alt="Profile" className="avatar" />
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
      </div> */}


      <div className="dashboard">
        <div className="user">
          <img src={photoURL} alt="Profile" className="avatar" />

          <a className="user-btn update-pic">Update Picture</a>
          <h1>{name}</h1>
        </div>
        <div className="links">
          <div className="link">
            <img src="./images/steam.png" alt="" />
            <h2>Email: {user?.email}</h2>
          </div>
          <div className="link">
            <img src="./images/upcoming.png" alt="" />
            <h2>Address: {address}</h2>
          </div>
          <div className="link">
            <img src="./images/library.png" alt="" />
            <h2>City: {city}</h2>
          </div>
          <div className="link">
            <img src="./images/library.png" alt="" />
            <h2>ABN: {abn}</h2>
          </div>
          <div className="buttons">
            <a className="user-btn"><Link className="button-link" to="/updateprofile">Update Profile</Link></a>
            <a className="user-btn"><Link className="button-link" to="/passwordupdate">Update Password</Link></a>
            <a className="user-btn" onClick={logout}>Logout</a>
          </div>


        </div>

      </div>

      <div className="games">
        <div className="status">
          <h1>Services</h1>
          <a className="user-btn add-service">+ Add A New Service</a>
        </div>
        <div className="cards">
          <div className="card">
            <div className="card-info">
              <h2>Assassins Creed Valhalla</h2>
              <p>PS5 Version</p>
            </div>
            <h2 className="percentage">60%</h2>
          </div>
          <div className="card">

            <div className="card-info">
              <h2>Spiderman Miles Morales</h2>
              <p>PS5 Version</p>

            </div>
            <h2 className="percentage">80%</h2>
          </div>

        </div>
      </div>


    </div>
  );
}

export default Dashboard;
