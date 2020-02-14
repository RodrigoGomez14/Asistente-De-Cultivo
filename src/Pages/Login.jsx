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
import {auth, database} from 'firebase'
import foto from '../images/background.png'
import {PantallaDeCarga} from './PantallaDeCarga'
import {Link as LinkRouter} from 'react-router-dom'
import {Layout} from './Layout'
import {FormLogin} from '../components/FormLogin'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    overflow:'auto'
  },
  image: {
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50]
  },
  img:{
    objectFit:'cover',
    width:"100%",
    height:"100%"
  },
  paper: {
    width:"100%",
    height:"100%",
    backgroundColor:theme.palette.type==='dark'?theme.palette.secondary.main:theme.palette.primary.main,
    borderRadius:'0',
    display:'flex',
    alignItems:'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    '& .MuiOutlinedInput-input':{
      color:theme.palette.primary.contrastText,
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':{
      borderColor: theme.palette.primary.contrastText
    },
    '& .MuiFormLabel-root.Mui-focused':{
      color:theme.palette.secondary.contrastText
    },
    '& .MuiOutlinedInput-notchedOutline':{
      borderColor: theme.palette.secondary.dark,
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color:theme.palette.primary.contrastText,
    '&.MuiButton-outlined':{
      border: `1px solid ${theme.palette.primary.contrastText}`
    },
  },
  background:{
    background:theme.palette.primary.main,
    color:theme.palette.primary.contrastText
  },
  link:{
    color:theme.palette.primary.contrastText
  }
}));


export const LogInPage=({history})=> {
    const classes = useStyles();
    let [loading,setloading]=useState(false)

    return (
      <Layout>
          <Grid container component="main" className={classes.root}>
              <Grid item xs={false} sm={4} md={7} className={classes.image}>
                <img src={foto} alt="" className={classes.img}/>
              </Grid>
              <Grid item xs={12} sm={8} md={5}>
                {!loading?
                  <Paper elevation={3} className={classes.paper}>
                    <FormLogin setloading={setloading} history={history}/>
                  </Paper>
                  :
                  <PantallaDeCarga/>
                }
            </Grid>
          </Grid>
      </Layout>
    );
}