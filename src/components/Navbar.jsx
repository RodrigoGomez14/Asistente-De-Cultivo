import React from 'react'
import {makeStyles} from '@material-ui/core'
import {AppBar,Toolbar,IconButton,Typography} from '@material-ui/core'
import {Menu as MenuIcon,ArrowBackRounded} from '@material-ui/icons'
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
    },
    avatar:{
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.dark,
    },
    danger:{
        color:theme.palette.error.main
    }
}))

export const NavBar = ({page,plantaId,history,plantaDelHistorial,setMenuOpened}) =>{
    const classes = useStyles()
    return(
        <AppBar className={classes.appBar} position="static" >
            <Toolbar>
            {page!=='Armario'&&
                <IconButton edge="end" className={classes.menuButton} onClick={e=>{
                    if(plantaId){
                        if(plantaDelHistorial){
                            if(history.location.pathname==='/Historial/Planta'){
                                history.replace('/Historial')
                            }
                            else{
                                history.replace({
                                    pathname:'/Historial/Planta',
                                    props:{
                                        id:plantaId
                                    }
                                })
                            }
                        }
                        else{
                            if(history.location.pathname==='/Planta'){
                                history.replace('/')
                            }
                            else{
                                history.replace({
                                    pathname:'/Planta',
                                    props:{
                                        id:plantaId
                                    }
                                })
                            }
                        }
                    }
                    else{
                        history.goBack()
                    }
                }} color="inherit" aria-label="menu">
                    <ArrowBackRounded />
                </IconButton>
            }
            <Typography variant="h6" className={classes.title} >
                {page}
            </Typography>
            <IconButton edge="end" className={classes.menuButton} onClick={e=>{
                setMenuOpened(true)
            }} color="inherit" aria-label="menu">
                <MenuIcon />
            </IconButton>
            </Toolbar>
        </AppBar>
    )
}