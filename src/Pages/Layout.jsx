import React , {useState,useEffect} from 'react'
import {Paper} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import {Redirect} from 'react-router-dom'
import { createMuiTheme,ThemeProvider } from '@material-ui/core/styles';
import {NavBar} from '../components/NavBar'
import {MenuDrawer} from '../components/MenuDrawer'
const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    drawer:{
        maxWidth:'300px',
        height:'100%',
    },
    icon:{
        color:theme.palette.primary.contrastText
    },
    text:{
        color:theme.palette.primary.contrastText
    },
    app:{
        minHeight: '100vh',
        height: '100vh',
        display: 'flex',
        textAlign: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'start',
        fontSize: 'calc(10px + 2vmin)',
        color: 'white',
    }
}));


export const Layout=({page,children,history,planta,user})=>{
    const classes = useStyles();
    let [menuOpened,setMenuOpened]=useState(false)
    let [selectedTabs,setSelectedTabs]=useState('recents')
    let [redirect,setRedirect]=useState(false)
    let [theme,setTheme]=useState()
    let [switchTheme,setSwitchTheme]=useState(false)
    const themeProvider = createMuiTheme({
        palette: {
            white:'#fff',
            primary: {
            light: '#48a999',
            main: '#00796b',
            dark: '#004c40',
            contrastText: '#fff',
            },
            secondary: {
            light: '#519657',
            main: '#81c784',
            dark: '#b2fab4',
            contrastText: '#000',
            },
            danger:'#c62828',
            type:theme
        },
    });
    useEffect(()=>{
        const theme = localStorage.getItem('theme')
        if(theme){
            setTheme(theme)
            setSwitchTheme(theme==='light'?false:true)
        }
        else{
            setTheme('light')
            localStorage.setItem('theme','light')
            setSwitchTheme(theme==='light'?false:true)
        }
    },)
    if(redirect){
        return(
            <Redirect to={{
                pathname:'/Planta',
                props:{...planta}
            }}/>
        )
    }
    return(
        <ThemeProvider theme={themeProvider}>
            <Paper className={classes.app}>
                {user &&
                <>
                    <NavBar page={page} planta={planta} history={history} switchTheme={switchTheme} setSwitchTheme={setSwitchTheme} theme={theme} setTheme={setTheme} setRedirect={setRedirect} setMenuOpened={setMenuOpened}/>
                    <MenuDrawer menuOpened={menuOpened} setMenuOpened={setMenuOpened}/>
                </>
                }
                {children}
            </Paper>
        </ThemeProvider>
    )
}