import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {auth} from 'firebase'
import foto from '../images/apple cookies.jpg'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50]
  },
  img:{
    width:"100%",
    height:"100%"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export const LoginPage=({history})=> {
    const classes = useStyles();
    let [inputUser,setInputUser]=useState(undefined)
    let [inputPassword,setInputPassword]=useState(undefined)

    const login=async()=>{
        await auth().signInWithEmailAndPassword(inputUser,inputPassword)
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image}>
              <img src={foto} alt="" className={classes.img}/>
            </Grid>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Inicia Sesion
            </Typography>
            <form className={classes.form} noValidate>
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                value={inputUser}
                onChange={e=>{setInputUser(e.target.value)}}
                autoFocus
                />
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                value={inputPassword}
                onChange={e=>{setInputPassword(e.target.value)}}
                label="Contrasenia"
                type="password"
                id="password"
                />
                <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Recuerdame"
                />
                <Button
                fullWidth
                variant="outlined"
                color="primary"
                className={classes.submit}
                onClick={e=>{login()}}
                >
                Ingresar!
                </Button>
                <Grid container>
                <Grid item xs>
                    <Link href="#" variant="body2">
                    Olvidaste tu contrasenia?
                    </Link>
                </Grid>
                <Grid item>
                    <Link href="#" variant="body2">
                    {"No tienes una cuenta? Registrate!"}
                    </Link>
                </Grid>
                </Grid>
                <Box mt={5}>
                </Box>
            </form>
            </div>
        </Grid>
        </Grid>
    );
}