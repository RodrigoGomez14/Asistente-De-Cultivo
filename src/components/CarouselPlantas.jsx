import React, {Component} from 'react'
import {TarjetaPlanta} from './TarjetaPlanta'
import {connect} from 'react-redux'
import {confirmAlert} from 'react-confirm-alert'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import './styles/alertPlanta.css'
import '../Pages/styles/Accion.css'
import { faPlusCircle} from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import {database} from 'firebase'
import {Button,Typography,Grow,IconButton,makeStyles} from '@material-ui/core'
import {AddCircleOutline} from '@material-ui/icons'
import {Link} from 'react-router-dom'
const useStyles = makeStyles(theme=>({
    carousel:{
        display:'flex',
        flexWrap:'nowrap',
        overflow:'auto'
    },
    textLight:{
        color:theme.palette.primary.contrastText
    },
    icon:{
        color: theme.palette.primary.contrastText
    }
}))
const CarouselPlantas=(props)=>{
    const classes = useStyles()
    return(
        <div className="container">
            {props.plantas?
                <>
                    <div className="row">
                        <div className="col-12 text-center">
                            <Grow in={true}
                                {...(true ? { timeout: 1500 } : {})}>
                                <Typography variant='subtitle1' className={classes.textLight}>
                                    Plantas Dentro Del Armario
                                </Typography>
                            </Grow>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className={classes.carousel}>
                            {Object.keys(props.plantas).map(key=>(
                                <TarjetaPlanta
                                    user={props.user}
                                    id={key}
                                    key={key}
                                    history={props.history}
                                    nombre={props.plantas[key].nombre}
                                    inicioVegetativo={props.plantas[key].inicioVegetativo}
                                    periodo={props.periodo}
                                />
                            ))}
                            <div className="col-auto align-self-center">
                                <Grow in={true}
                                {...(true ? { timeout: 1500 } : {})}>
                                    <Link to='/Nueva-Planta'>
                                        <IconButton
                                        >
                                            <AddCircleOutline className={classes.icon} />
                                        </IconButton>
                                    </Link>
                                </Grow>
                            </div>
                        </div>
                    </div>
                </>
                :
                <div className="row mb-3">
                    <Grow in={true}
                        {...(true ? { timeout: 1500 } : {})}>
                        <div className="col-12 text-center">
                            <Typography  variant='h6' className={classes.textLight}>No hay plantas</Typography>
                            <Link to='/Nueva-Planta'>
                                <Button variant="contained" color="primary" endIcon={<AddCircleOutline/>}>
                                    Agrega una!
                                </Button>
                            </Link>
                        </div>
                    </Grow>
                </div>
            }
        </div>
    )
}
const mapStateToProps = state =>{
    return{
        user:state.user.uid,
        plantas:state.data.plantas,
    }
}
export default connect(mapStateToProps,null)(CarouselPlantas)