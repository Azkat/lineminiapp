import React from "react";
import { app, db } from "../base.js";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';

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

function Menu(props) {

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
        メニュー
      </div>

      <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image="coffee.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            ブレンドコーヒー
          </Typography>
          <Typography gutterBottom variant="h6" component="h2">
            ¥500
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            オリジナルブレンドのコーヒー。ブラジル産とエチオピア産の豆をじっくり焙煎してみました。
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
        カートに入れる
        </Button>
      </CardActions>
    </Card>

      <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image="burger.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            ハンバーガー
          </Typography>
          <Typography gutterBottom variant="h6" component="h2">
            ¥900
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            新鮮野菜と牛肉のハンバーガーです。
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          カートに入れる
        </Button>
      </CardActions>
    </Card>

      <Fab variant="extended" className={classes.Fab}>
          カートをみる
      </Fab>
    </div>
  );
}

export default Menu;