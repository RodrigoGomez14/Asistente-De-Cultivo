import React , {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCannabis} from '@fortawesome/free-solid-svg-icons'
import {Paper,makeStyles,Typography} from '@material-ui/core'
import './styles/loading.css'

const useStyles=makeStyles(theme=>({
    root:{
        display:'flex',
        justifyContent:'center',
        flexDirection:'column',
        alignItems:'center',
        height:'100%'
    },
    title:{
        color:theme.palette.type==='dark'?theme.palette.primary.contrastText:theme.palette.secondary.contrastText,
    }
}))
export const PantallaDeCarga =()=>{
    const classes = useStyles()
    return(
        <div className={classes.root}>
            <div className='row'>
                <div className='col-12 text-center'>
                    <Typography variant='h2'className={classes.title}>Cargando</Typography>
                </div>
            </div>
            <div className="row justify-content-center mt-4">
                <div className="col-auto">
                    <h2>
                        <FontAwesomeIcon icon={faCannabis} className='loading-icon' id='loading-icon1'/>
                    </h2>
                </div>
                <div className="col-auto">
                    <h2>
                        <FontAwesomeIcon icon={faCannabis} className='loading-icon' id='loading-icon2'/>
                    </h2>
                </div>
                <div className="col-auto">
                    <h2>
                        <FontAwesomeIcon icon={faCannabis} className='loading-icon' id='loading-icon3'/>
                    </h2>
                </div>
            </div>
        </div>
    )
}