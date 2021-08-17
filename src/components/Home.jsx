import React from "react";
import { app, db } from "../base.js";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Link } from "react-router-dom";

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
    <div className="menu-wrapper">
      <div className="header-logo">
        <img src="/logo.png"/>
      </div>

      <Box color="text.primary" clone className="header-image">
        <img src="/cafe.jpg"/>
      </Box>

      <a href="https://liff.line.me/1655962227-ZNgwPXKE">
        リンク①
      </a>

      <a href="https://liff.line.me/1655976024-YbEzZbBX">
        リンク②
      </a>
      
      <Button
        variant="contained"
        color="primary"
        fullWidth="true"
        classes={{
          root: classes.root
        }}
        href="/menu"
      >
        メニューをみる
      </Button>

      <Button variant="outlined" color="primary" fullWidth="true" >
        店舗ログイン
      </Button>
    </div>
  );
}

export default Home;