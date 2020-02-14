import React,{useState} from 'react'
import {Paper,Typography,Avatar,TextField,Grid,Button,makeStyles,Link} from '@material-ui/core'
import {LockOutlined} from '@material-ui/icons'
import {Link as LinkRouter} from 'react-router-dom'
import {PantallaDeCarga} from '../Pages/PantallaDeCarga'
import {auth,database} from 'firebase'

const useStyles = makeStyles(theme => ({
    paper: {
      margin: theme.spacing(0, 4),
      padding:theme.spacing(1),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText
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
    },
    root:{
        width:'100%',
    },
    title:{
      color:theme.palette.primary.contrastText
    }
  }));
export const FormLogin=({setloading,history})=>{
    const classes = useStyles()
    let [inputUser,setInputUser]=useState(undefined)
    let [inputNombre,setInputNombre]=useState(undefined)
    let [inputPassword,setInputPassword]=useState(undefined)
    let [userError,setUserError]=useState(undefined)
    let [nombreError,setNombreError]=useState(undefined)
    let [passwordError,setPasswordError]=useState(undefined)

    const signIn=async()=>{
      setloading(true)
      await auth().createUserWithEmailAndPassword(inputUser,inputPassword)
      .then(async e=>{
          e.user.updateProfile({
            displayName:inputNombre
          })
          await database().ref().child(e.user.uid).update({
              horaDeInicio:0,
              cicloLuminico:1,
              periodo:'Vegetativo'
          })
          history.push('/')
          setloading(false)
      })
      .catch(error=>{
        if(error.code==='auth/user-not-found'){
          setUserError(error)
        }
        else{
          setPasswordError(error)
        }
        setloading(false)
      })
  }
    return(
          <div className={classes.root}>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlined/>
                </Avatar>
                <Typography component="h1" variant="h5" className={classes.title}>
                    Registrate
                </Typography>
                <form className={classes.form} noValidate>
                <TextField
                    variant="filled"
                    margin="normal"
                    color='primary'
                    required
                    fullWidth
                    id="Nombre"
                    label="Nombre"
                    name="nombre"
                    value={inputNombre}
                    onChange={e=>{setInputNombre(e.target.value)}}
                    autoFocus
                />
                <TextField
                    variant="filled"
                    margin="normal"
                    color='primary'
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    value={inputUser}
                    onChange={e=>{setInputUser(e.target.value)}}
                />
                <TextField
                    variant="filled"
                    margin="normal"
                    color='secondary'
                    required
                    fullWidth
                    name="password"
                    value={inputPassword}
                    onChange={e=>{setInputPassword(e.target.value)}}
                    label="contraseña"
                    type="password"
                    id="password"
                />
                <Button
                  fullWidth
                  color='#fff'
                  variant="outlined"
                  className={classes.submit}
                  onClick={e=>{signIn()}}
                >
                Registrate!
                </Button>
                <Link variant="body2">
                      <LinkRouter to='/' className={classes.link}>
                        Ya tienes una cuenta? Ingresa!
                      </LinkRouter>
                  </Link>
            </form>
            </div>
          </div>
    )
}