import React from "react";
import { app, db } from "../base.js";

async function getUsers(){
  const userRef = db.collection('user').doc('9yvOmyYlVzhpnnzLhvOl')
  const userDoc = await userRef.get()

  return userDoc.get('mail')
}

function Home(props) {

  const [mail, setMail] = React.useState('...');

  React.useEffect(() => {
    getUsers().then(result =>{
      setMail(result)
    })  
  });


  return (
    <div>
      <h2>Home Page {mail}</h2>
      
      <button onClick={() => app.auth().signOut()}>Sign out</button>
    </div>
  );
}

export default Home;