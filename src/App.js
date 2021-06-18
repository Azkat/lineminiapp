import logo from './logo.svg';
import './App.css';
import liff from '@line/liff';
import React, { useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute";
import { AuthProvider } from "./auth/AuthProvider";
import { AuthContext } from "./auth/AuthProvider";
import Home from "./components/Home";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import ServiceMessage from "./ServiceMessage";
import axios from 'axios';
import { app, db } from "./base.js";
import firebase from "firebase/app";

const setuid = async () => {
  try {
    const userProfile = await liff.getProfile()
    const lineUid = await userProfile.userId

    const userRef = await db.collection("users").doc()
    await userRef.set({
      lineuid: lineUid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    window.alert('ログインしています。UID('+ lineUid +')を取得しました')
  } catch (error) {
    alert(error);
  } 
};

window.onload = function() {
  const defaultLiffId = process.env.REACT_APP_LIFF_ID;
  initializeLiff(defaultLiffId);
};

function initializeLiff(myLiffId) {
  liff
  .init({
      liffId: process.env.REACT_APP_LIFF_ID
  })
  .then(() => {
    if (liff.isLoggedIn()) {
      setuid()
    } else {
      window.alert('ログアウト')
      liff.login()
    }
  })
  .catch((err) => {
      window.alert('Something went wrong with LIFF initialization.');
  });
}

function getServiveMessage(accessToken){
  axios.get(`https://sm-php01.herokuapp.com/?access_token=` + accessToken)
  .then(res => {
    window.alert('送りました')
  })
}

function App() {

  const [uid, setUid] = React.useState('')
  const [accessToken, setAccessToken] = React.useState('')

  React.useEffect(() => {
    if (liff.isLoggedIn()) {
      const context = liff.getContext()
      const liffToken = liff.getAccessToken()
      setUid(context.userId)
      setAccessToken(liffToken)
    } 
  }, [])

  return (
    <AuthProvider>
      <Router>
        <div className="wrapper">
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/service_message" component={ServiceMessage} />
          <div className="App">
            httpsでlocalhostにアクセスしています
          </div>
          <div className="App">
            UID : {uid}
          </div>
          <div className="App">
            <a href="/signup">sign up</a>
          </div>
          <div className="App">
            アクセストークン : {accessToken}
          </div>
          
          <a href="#" onClick={() => getServiveMessage(accessToken)}>サービスメッセージを送る</a>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
