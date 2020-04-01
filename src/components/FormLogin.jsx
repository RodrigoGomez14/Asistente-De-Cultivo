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
export const FormLogin=({history})=>{
    const classes = useStyles()
    let [inputUser,setInputUser]=useState(undefined)
    let [inputNombre,setInputNombre]=useState(undefined)
    let [inputPassword,setInputPassword]=useState(undefined)
    let [userError,setUserError]=useState(undefined)
    let [passwordError,setPasswordError]=useState(undefined)
    let [loading,setloading]=useState(false)

    const signIn=()=>{
      setUserError(null)
      setPasswordError(null)
      if(inputUser && inputPassword){
        setloading(true)
        auth().languageCode='es'
        auth().createUserWithEmailAndPassword(inputUser,inputPassword)
        .then(async e=>{
          e.user.updateProfile({
            displayName:inputNombre
          })
          database().ref().child(e.user.uid).update({
            horaDeInicio:'',
            cicloLuminico:'',
            periodo:''
          })
          e.user.sendEmailVerification().then(()=>{
            setloading(false)
            history.replace('/')
          })
        })
        .catch(error=>{
          setloading(false)
          switch (error.code) {
            case "auth/weak-password":
              console.log('set error')
              setPasswordError('La clave debe tener al menos 6 caracteres')
              break;
            case "auth/email-already-in-use":
              setUserError('La direccion de correo ya esta siendo utilizada')
              break;
          }
        })
      }
      else{
        if(!inputPassword){
          setPasswordError('Debes ingresar una clave')
        }
        if(!inputUser){
          setUserError('Debes ingresar una direccion de correo')
        }
      }
    }
    return(
          <div className={classes.root}>
            {loading?
              <PantallaDeCarga/>
              :
              <div className={classes.paper}>
                  <Avatar className={classes.avatar}>
                      <LockOutlined/>
                  </Avatar>
                  <Typography component="h1" variant="h5" className={classes.title}>
                      Registrate
                  </Typography>
                  <form className={classes.form} noValidate>
                    {console.log(passwordError)}
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
                      error={userError}
                      helperText={userError?userError:null}
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
                      error={passwordError}
                      helperText={passwordError?passwordError:null}
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
            }
          </div>
    )
}