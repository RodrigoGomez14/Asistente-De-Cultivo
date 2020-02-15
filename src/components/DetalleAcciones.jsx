import React , {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTint, faCut , faBug} from '@fortawesome/free-solid-svg-icons'
import {Row,Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {Button,makeStyles,Avatar,SvgIcon} from '@material-ui/core'
import {BugReportOutlined,InvertColorsOutlined} from '@material-ui/icons'
import {riegos} from '../images/riegos.svg'
import {transplante} from '../images/transplante.svg'

const useStyles=makeStyles(theme=>({
    root:{
        width:'100%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'start'
    },
    link:{
        textDecoration:'none',
        outline:'none',
        margin:theme.spacing(1)
    },
    button:{
        color:theme.palette.primary.contrastText
    },
    avatar:{
        width:theme.spacing(5),
        height:theme.spacing(5)
    }
}))

export const DetalleAcciones =(props)=>{
    const classes= useStyles()
    return(
            <div className={classes.root}>
                <Link
                className={classes.link} 
                to={{ 
                    pathname:props.history.location.pathname==='/Historial/Planta'?'/Historial/Planta/Riegos':'/Planta/Riegos',
                    props:{
                        ...props
                }}}>
                    <Button
                        variant="outlined"
                        color='primary'
                        className={classes.button}
                    >
                        Riegos
                    </Button>
                </Link>
                <Link 
                className={classes.link}
                to={{ 
                    pathname:props.history.location.pathname==='/Historial/Planta'?'/Historial/Planta/Podas':'/Planta/Podas',
                    props:{
                        ...props
                }}}>
                    <Button
                        variant="outlined"
                        color='primary'
                        className={classes.button}
                    >
                        Podas
                    </Button>
                </Link>
                <Link 
                className={classes.link}                 
                to={{ 
                pathname:props.history.location.pathname==='/Historial/Planta'?'/Historial/Planta/Fumigaciones':'/Planta/Fumigaciones',
                props:{
                    ...props
                }}}>
                    <Button
                        variant="outlined"
                        color='primary'
                        className={classes.button}
                    >
                        Fumigaciones
                    </Button>
                </Link>
                <Link 
                className={classes.link}                 
                to={{ 
                pathname:props.history.location.pathname==='/Historial/Planta'?'/Historial/Planta/Transplantes':'/Planta/Transplantes',
                props:{
                    ...props
                }}}>
                    <Button
                        variant="outlined"
                        color='primary'
                        className={classes.button}
                    >
                        Transplantes
                    </Button>
                </Link>
            </div>
    )
}