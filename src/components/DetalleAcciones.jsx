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
        justifyContent:'center'
    },
    link:{
        textDecoration:'none',
        outline:'none',
        margin:theme.spacing(1)
    },
    button:{
        backgroundColor:theme.palette.primary.main
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
                        variant="contained"
                        className={classes.button}
                        endIcon={
                            <Avatar src={riegos} className={classes.avatar}/>
                        }
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
                        variant="contained"
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
                        variant="contained"
                        className={classes.button}
                        endIcon={
                            <Avatar src={riegos} className={classes.avatar}/>
                        }
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
                        variant="contained"
                        className={classes.button}
                        endIcon={
                            <Avatar src={transplante} className={classes.avatar}/>
                        }>
                        Transplantes
                    </Button>
                </Link>
            </div>
    )
}