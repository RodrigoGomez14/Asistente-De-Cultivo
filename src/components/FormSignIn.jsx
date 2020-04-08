import React, {useState} from 'react'
import {Typography,Avatar,TextField,Button,makeStyles,Link,Grow} from '@material-ui/core'
import {Alert,AlertTitle} from '@material-ui/lab'
import {LockOutlined} from '@material-ui/icons'
import {Link as LinkRouter} from 'react-router-dom'
import {PantallaDeCarga} from '../Pages/PantallaDeCarga'
import {auth} from 'firebase'
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
      color:theme.palette.primary.contrastText,
      '& .MuiLink-underlineHover':{
        textDecoration:'none',
        color:theme.palette.primary.contrastText,
      }
    },
    root:{
        width:'100%',
    },
    title:{
        color:theme.palette.primary.contrastText
    },
    checkBox:{
        color: theme.palette.primary.contrastText,
        '& .MuiIconButton-label':{
            color: theme.palette.primary.contrastText,
        }
    },
    linkButtons:{
        display:'flex',
        flexDirection:'column'
    }
}));



export const FormSignIn = ({history})=>{
  const classes = useStyles()
    let [inputUser,setInputUser]=useState(undefined)
    let [loading,setloading]=useState(false)
    let [emailSended,setEmailSended]=useState(false)
    let [resetConfirmation,setResetConfirmation]=useState(false)
    let [inputPassword,setInputPassword]=useState(undefined)
    let [userError,setUserError]=useState(undefined)
    let [passwordError,setPasswordError]=useState(undefined)
    

    const logIn=async()=>{
      setUserError(null)
      setPasswordError(null)
      if(inputUser && inputPassword){
          setloading(true)
          await auth().signInWithEmailAndPassword(inputUser,inputPassword)
          .then(()=>{
            setloading(false)
          })
          .catch(error=>{
            setloading(false)
            switch (error.code) {
              case 'auth/user-not-found':
                setUserError('Usuario No Encontrado')
                break;
              case 'auth/wrong-password':
                setPasswordError('La clave es incorrecta')
                break;
              default:
                break;
            }
          })
        }
        else{
          if(!inputUser){
            setUserError('Ingresa el Usuario')
          }
          if(!inputPassword){
            setPasswordError('Ingresa la clave')
          }
        }
    }
    const sendPasswordReset=()=>{
      if(!inputUser){
        setEmailSended(false)
        setUserError('Ingrese el correo para recuperar la clave')
      }
      else{
        setResetConfirmation(true)
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
                    Inicia Sesion
                </Typography>
                <form className={classes.form} noValidate>
                <TextField
                variant="filled"
                margin="normal"
                color='primary'
                required
                fullWidth
                id="email"
                label="Email"
                error={userError}
                helperText={userError?userError:null}
                name="email"
                value={inputUser}
                onChange={e=>{setInputUser(e.target.value)}}
                autoFocus
                />
                <TextField
                variant="filled"
                color='primary'
                margin="normal"
                required
                fullWidth
                name="password"
                value={inputPassword}
                helperText={passwordError?passwordError:null}
                error={passwordError}
                onChange={e=>{setInputPassword(e.target.value)}}
                label="contraseña"
                type="password"
                id="password"
                />
                {resetConfirmation?
                  <Grow in={true}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      onClick={e=>{
                        auth().languageCode='es'
                        auth().sendPasswordResetEmail(inputUser).then(()=>{
                            setResetConfirmation(false)
                            setEmailSended(true)
                        })
                        .catch(()=>{

                        })
                      }}
                    >
                    Enviar mail de recuperacion!
                    </Button>
                  </Grow>
                  :
                  null
                }
                {emailSended?
                  <Grow in={true}>
                    <Alert variant="outlined" severity="success">
                      <AlertTitle>Listo!</AlertTitle>
                        Revisa tu casilla de correo para generar una nueva clave
                      </Alert>
                  </Grow>
                  :
                  null
                }
                <Button
                fullWidth
                variant="outlined"
                color="primary"
                className={classes.submit}
                onClick={e=>{logIn()}}
                >
                Ingresar!
                </Button>
                <div className={classes.linkButtons}>
                    <Button variant="outlined" className={classes.link} onClick={()=>{
                      sendPasswordReset()
                    }}>
                        Olvidaste tu contraseña?
                    </Button>
                    <Link variant="body2">
                        <LinkRouter to='/Login' className={classes.link}>
                            {"No tienes una cuenta? Registrate!"}
                        </LinkRouter>
                    </Link>
                </div>
            </form>
            </div>
          }
        </div>
    )
}