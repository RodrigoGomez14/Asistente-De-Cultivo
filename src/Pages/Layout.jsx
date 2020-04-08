import React , {useState} from 'react'
import {Paper} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import {NavBar} from '../components/Navbar'
import {MenuDrawer} from '../components/MenuDrawer'
import foto from '../images/sea of green.png'
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
        maxHeight:'100vh',
        display: 'flex',
        textAlign: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'start',
        fontSize: 'calc(10px + 2vmin)',
        color: 'white',
    }
}));


export const Layout=({page,children,history,plantaId,user,plantaDelHistorial,userVerification})=>{
    const classes = useStyles();
    let [menuOpened,setMenuOpened]=useState(false)
    return(
        <Paper className={classes.app}>
            {user && userVerification &&
            <>
                <NavBar page={page} plantaId={plantaId} plantaDelHistorial={plantaDelHistorial} history={history} setMenuOpened={setMenuOpened}/>
                <Paper elevation={6}>
                    <MenuDrawer menuOpened={menuOpened} setMenuOpened={setMenuOpened} image={foto} history={history}/>
                </Paper>
            </>
            }
            {children}
        </Paper>
    )
}