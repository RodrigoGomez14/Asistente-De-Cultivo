import React , {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTint, faCut , faBug} from '@fortawesome/free-solid-svg-icons'
import {Row,Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {Button,makeStyles} from '@material-ui/core'

const useStyles=makeStyles(theme=>({
    link:{
        color:theme.palette.secondary.contrastText,
        textDecoration:'none'
    }
}))

export const DetalleAcciones =(props)=>{
    const classes= useStyles()
    return(
        <div className="col">
            <Col xs={'auto'} className="align-self-center mt-1 mb-1 d-flex">
                <Link
                    className={classes.link} 
                    to={{ 
                    pathname:'/Planta/Riegos',
                    props:{
                        ...props
                    }}}>
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<FontAwesomeIcon icon={faTint}/>}
                        >Riegos
                        </Button>
                </Link>
            </Col>
            <Col xs={'auto'} className="align-self-center mt-1 mb-1 d-flex">
                <Link 
                    className={classes.link}                     
                    to={{ 
                    pathname:'/Planta/Podas',
                    props:{
                        ...props
                    }}}>
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<FontAwesomeIcon icon={faCut}/>}
                        >Podas
                        </Button>
                    </Link>
                </Col>
            <Col xs={"auto"}className="align-self-center mt-1 mb-1 d-flex">
                <Link 
                    className={classes.link}                 
                    to={{ 
                    pathname:'/Planta/Fumigaciones',
                    props:{
                        ...props
                    }}}>
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<FontAwesomeIcon icon={faBug}/>}
                        >Fumigaciones
                        </Button>
                </Link>
            </Col>
        </div>
    )
}