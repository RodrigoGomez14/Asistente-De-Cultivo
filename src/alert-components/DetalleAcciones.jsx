import React , {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTint, faCut , faBug} from '@fortawesome/free-solid-svg-icons'
import {Row,Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {Button,makeStyles,ButtonGroup} from '@material-ui/core'
import {BugReportOutlined,InvertColorsOutlined} from '@material-ui/icons'

const useStyles=makeStyles(theme=>({
    link:{
        color:theme.palette.secondary.contrastText,
        textDecoration:'none',
        outline:'none'
    }
}))

export const DetalleAcciones =(props)=>{
    const classes= useStyles()
    return(
        <div className="col text-center">
            {console.log(props.history.location.pathname)}
            <ButtonGroup>
                <Link
                className={classes.link} 
                to={{ 
                    pathname:props.history.location.pathname==='/Historial/Planta'?'/Historial/Planta/Riegos':'/Planta/Riegos',
                    props:{
                        ...props
                }}}>
                    <Button
                        variant="contained"
                        color="secondary"
                        endIcon={<InvertColorsOutlined/>}
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
                        color="secondary"
                        endIcon={<FontAwesomeIcon icon={faCut}/>}
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
                        color="secondary"
                        endIcon={<BugReportOutlined/>}
                    >
                        Fumigaciones
                    </Button>
                </Link>
            </ButtonGroup>
        </div>
    )
}