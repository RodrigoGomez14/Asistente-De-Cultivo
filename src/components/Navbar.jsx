import React from 'react'
import {makeStyles, Hidden} from '@material-ui/core'
import {AppBar,Toolbar,IconButton,Typography,Card,CardMedia,Paper,Switch,FormControlLabel} from '@material-ui/core'
import {Menu as MenuIcon,ArrowBackRounded,AccountCircle,HomeOutlined,NatureOutlined} from '@material-ui/icons'
const useStyles = makeStyles( theme=>({
    appBar:{
        backgroundColor:theme.palette.primary.main,
        color:theme.palette.primary.contrastText
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    }
}))

export const NavBar = ({page,planta,history,switchTheme,setSwitchTheme,setRedirect,theme,setTheme,setMenuOpened}) =>{
    const classes = useStyles()
    return(
        <AppBar className={classes.appBar} position="static" >
            <Toolbar>
            {page!=='Armario'?
                <IconButton edge="end" className={classes.menuButton} onClick={e=>{
                    if(!planta){
                        if(history.location.pathname==='/Planta'){
                            history.replace('/')
                        }
                        else{
                            history.goBack()
                        }
                    }
                    else{
                        setRedirect(true)
                    }
                }} color="inherit" aria-label="menu">
                    <ArrowBackRounded />
                </IconButton>
                :
                <IconButton edge="end" className={classes.menuButton} onClick={e=>{
                    
                }} color="inherit" aria-label="menu">
                    <AccountCircle />
                </IconButton>
            }
            <Typography variant="h6" className={classes.title} >
                {page}
            </Typography>
            <Hidden
                xsDown
            >
                <FormControlLabel 
                    control={
                        <Switch
                            checked={switchTheme}
                            onChange={e=>{
                                setSwitchTheme(e.target.checked)
                                localStorage.setItem('theme',theme==='dark'?'light':'dark')
                                setTheme(theme==='dark'?'light':'dark')
                            }}
                            value="theme"
                        />
                    }
                    label='Modo Oscuro'
                />
            </Hidden>
            <IconButton edge="end" className={classes.menuButton} onClick={e=>{
                setMenuOpened(true)
            }} color="inherit" aria-label="menu" size='large'>
                <MenuIcon />
            </IconButton>
            </Toolbar>
        </AppBar>
    )
}