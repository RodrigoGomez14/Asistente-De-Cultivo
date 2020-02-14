import React from 'react'
import {Paper,Typography,Avatar,TextField,Grid,Button,makeStyles,Link,FormControlLabel,Checkbox} from '@material-ui/core'
import {LockOutlined} from '@material-ui/icons'
import {Link as LinkRouter} from 'react-router-dom'
import {PantallaDeCarga} from '../Pages/PantallaDeCarga'
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
export const FormSignIn = ({inputUser,setInputUser,inputPassword,setInputPassword,userError,passwordError,loading,logIn})=>{
    const classes = useStyles()
    return(
        <div className={classes.root}>
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
                helperText={userError?'Usuario No Encontrado':null}
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
                helperText={passwordError?'Contraseña incorrecta':null}
                error={passwordError}
                onChange={e=>{setInputPassword(e.target.value)}}
                label="contraseña"
                type="password"
                id="password"
                />
                <FormControlLabel
                className={classes.checkBox}
                control={<Checkbox value="remember"  />}
                label="Recuerdame"
                />
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
                    <Link href="#" variant="body2" className={classes.link}>
                        Olvidaste tu contraseña?
                    </Link>
                    <Link variant="body2">
                        <LinkRouter to='/Login' className={classes.link}>
                            {"No tienes una cuenta? Registrate!"}
                        </LinkRouter>
                    </Link>
                </div>
            </form>
            </div>
        </div>
    )
}