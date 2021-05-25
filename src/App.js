import logo from './logo.svg';
import './App.css';
import liff from '@line/liff';
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute";
import { AuthProvider } from "./auth/AuthProvider";
import Home from "./components/Home";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import axios from 'axios';

window.onload = function() {
  const defaultLiffId = "1655993509-yMrwxY9M";
  initializeLiff(defaultLiffId);
};

function initializeLiff(myLiffId) {
  liff
  .init({
      liffId: "1655993509-yMrwxY9M"
  })
  .then(() => {
    if (liff.isLoggedIn()) {
      window.alert('ログインしています')
    } else {
      window.alert('ログアウト')
      liff.login()
    }
  })
  .catch((err) => {
      window.alert('Something went wrong with LIFF initialization.');
  });
}

function getServiveMessage(){
  axios.get(`https://sm-php01.herokuapp.com/`)
  .then(res => {
    window.alert('送りました')
  })
}

function App() {

  const [uid, setUid] = React.useState('')
  const [accessToken, setAccessToken] = React.useState('トークン')

  React.useEffect(()=>{
    if (liff.isLoggedIn()) {
      const context = liff.getContext()
      const liffToken = liff.getAccessToken()
      setUid(context.userId)
      setAccessToken(liffToken)
      console.log(liffToken)
    } 
  }, [])

  return (
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
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
          
          <a href="#" onClick={getServiveMessage}>サービスメッセージを送る</a>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
