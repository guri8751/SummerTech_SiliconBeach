import firebase from "firebase";


const firebaseConfig = {
  apiKey: "AIzaSyB_iFkn66BYtysUTD3PGhaWJ8jwzeRhF9E",
  authDomain: "siliconebeach-development.firebaseapp.com",
  projectId: "siliconebeach-development",
  storageBucket: "siliconebeach-development.appspot.com",
  messagingSenderId: "729916066471",
  appId: "1:729916066471:web:2781988e5b666160d32982"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();

let documentID = "";


const signInWithEmailAndPassword = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password, address, city, abn) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const user = res.user;
    await db.collection("users").doc(user.uid).set({
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      address,
      city,
      abn,
    })
      .then(function (docRef) {
        db.collection("users").where("uid", "==", user.uid).add({
          documentID: docRef.id
        })
      });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const addService = async (userId, title, description, cost) => {
  try {
    db.collection("services").doc(userId).set({
      title: title,
      description: description,
      cost: cost,
      uid: userId,
    });
  }
  catch (err) {
    alert(err.message);
  }
}

const updateData = async (userId, name, address, city, abn) => {
  try {
    await db.collection("users").doc(userId).update({
      name: name,
      address: address,
      city: city,
      abn: abn,
    });
  }
  catch (err) {
    console.error(err);
    alert(err.message)
  }
}

const uploadPhoto = async (file, user, setLoading) => {
  var storageRef = firebase.storage().ref();
  var fileRef = storageRef.child(user.uid + '.png');

  setLoading(true);
  fileRef.put(file).then((snapshot) => {
    console.log('File Uploaded')
  })
  const photoURL = await fileRef.getDownloadURL();
  console.log(photoURL);
  user.updateProfile({ photoURL: photoURL });
  setLoading(false);
  alert("File Uploaded");
}

const passwordUpdate = async (newPass) => {
  try {
    auth.currentUser.updatePassword(newPass);
  }
  catch (err) {
    console.error(err);
    alert(err.message)
  }
}

const sendPasswordResetEmail = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  auth.signOut();
};

export {
  auth,
  db,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordResetEmail,
  addService,
  uploadPhoto,
  updateData,
  passwordUpdate,
  logout,
};
