import React, { useContext } from "react";
import { withRouter } from "react-router";
import { AuthContext } from "./AuthProvider";
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import { app, db } from "../base.js";

function getServiveMessage(accessToken){
  axios.get(`https://sm-php01.herokuapp.com/?access_token=` + accessToken)
  .then(res => {
    window.alert('送りました') 
  })
}

const Login = (props, { history }) => {
  const { login } = useContext(AuthContext);

  // AuthContextからlogin関数を受け取る
  const handleSubmit = event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    login(email.value, password.value, history);
  };

  return (
    <div>
      log in
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Log in</button>
      </form>

      <div className="App">
            httpsでlocalhostにアクセスしています
          </div>
          <div className="App">
            UID : {props.uid}
          </div>
          <div className="App">
            <a href="/signup">sign up</a>
          </div>
          <div className="App">
            アクセストークン : {props.accessToken}
          </div>
          
          <a href="#" onClick={() => getServiveMessage(props.accessToken)}>サービスメッセージを送る</a>



          <button onClick={() => app.auth().signOut()}>Sign out</button>
    </div>
  );
};

export default withRouter(Login);