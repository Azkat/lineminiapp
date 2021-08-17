import React from "react";
import { app, db } from "../base.js";
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';

async function getUsers(){
  const userRef = db.collection('user').doc('9yvOmyYlVzhpnnzLhvOl')
  const userDoc = await userRef.get()

  return userDoc.get('mail')
}

const useStyles = makeStyles({
  root: {
    marginBottom: 20,
  },
  Fab:{
    position: 'fixed',
    bottom: 20,
    right: 10,
  }
});

function Cart(props) {

  const classes = useStyles();

  const [mail, setMail] = React.useState('...');

  React.useEffect(() => {
    getUsers().then(result =>{
      setMail(result)
    })  
  });


  return (
    <div className="menu-wrapper">
      <div className="header-menu">
        カート
      </div>
    </div>
  );
}

export default Cart;