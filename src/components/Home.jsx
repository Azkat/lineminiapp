import React from "react";
import { app, db } from "../base.js";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

async function getUsers(){
  const userRef = db.collection('user').doc('9yvOmyYlVzhpnnzLhvOl')
  const userDoc = await userRef.get()

  return userDoc.get('mail')
}

const useStyles = makeStyles({
  root: {
    marginBottom: 20,
  }
});

function Home(props) {

  const classes = useStyles();

  const [mail, setMail] = React.useState('...');

  React.useEffect(() => {
    getUsers().then(result =>{
      setMail(result)
    })  
  });


  return (
    <div>
      <div className="header-logo">
        <img src="/logo.png"/>
      </div>
      
      <Button variant="contained" color="primary" fullWidth="true" 
        classes={{
          root: classes.root
        }}
      >
        メニューをみる
      </Button>

      <Button variant="outlined" color="primary" fullWidth="true" >
        ログイン
      </Button>

      <button onClick={() => app.auth().signOut()}>Sign out</button>
    </div>
  );
}

export default Home;