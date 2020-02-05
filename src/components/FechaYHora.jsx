import React, {useEffect, useState} from 'react'
import moment from 'moment'
import {Typography,makeStyles} from '@material-ui/core'

const useStyles=makeStyles(theme=>({
    text:{
        color:theme.palette.primary.contrastText
    }
}))
export const  FechaYHora=()=>{
    const classes = useStyles()
    let [fecha,setFecha] = useState(`${moment().format('DD/MM/YYYY')} ${moment().format('LT')}`)
    useEffect(() => {
        setInterval(() => {
            setFecha(`${moment().format('DD/MM/YYYY')} ${moment().format('LT')}`)
        }, 1000);
    });
    return(
        <Typography variant='h4' className={classes.text}>{fecha}</Typography>
    )
}