import React, {useState,useEffect} from 'react'
import moment from 'moment'
import fotoPlanta from '../images/apple cookies.jpg'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import AlertPodas from '../alerts/AlertPodas'
import AlertRiego from '../alerts/AlertRiego'
import AlertEliminarPlanta from '../alerts/AlertEliminarPlanta'
import AlertCambiarCiclo from '../alerts/AlertCambiarCiclo';
import {database} from 'firebase'
import {Overlay,Img,Card} from './styles/TarjetaPlantaStyles'
import {Link} from 'react-router-dom'
import {Paper} from '@material-ui/core'
import {Grow} from '@material-ui/core' 
import {makeStyles} from '@material-ui/core'


const useStyles = makeStyles(theme => ({
    paper: {
      backgroundColor:theme.palette.primary.main,
      padding:theme.spacing(1)
    },
  }));

export const TarjetaPlanta=(props)=>{
    let [edad,setEdad]=useState(undefined)
    const alertEliminarPlanta=()=>confirmAlert({
        customUI : ({onClose}) =>{
            return(
                <div className="custom-ui">
                    <AlertEliminarPlanta
                        user={props.user}
                        nombre={props.nombre}
                        eliminarPlanta={eliminarPlanta}
                        onClose={onClose}
                    />
                </div>
            )
        }
    })
    const alertCambiarCiclo=()=>confirmAlert({
        customUI : ({onClose}) =>{
            return(
                <div className="custom-ui">
                    <AlertCambiarCiclo
                        user={props.user}
                        onClose={onClose}
                        nombre={props.nombre}
                    />
                </div>
            )
        }
    })
    useEffect(()=>{
        setEdad(moment().diff(moment(props.nacimiento),'days'))
    })
    const eliminarPlanta=async ()=>{
        await database().ref().child(props.user).child('plantas').child(props.id).remove()
    }
    const classes = useStyles()
    return(
        <div className="col-auto">
            <Grow in={true}
                {...(true ? { timeout: 1500 } : {})}>
                <Paper elevation={6} className={classes.paper}>
                    <Link className='text-white' to={{
                        pathname:'/Planta',
                        props:{
                            ...props,
                        }
                    }}>
                        <Card className="card" >
                            <Img src={fotoPlanta} className="card-img-top" alt="..."/>
                            <Overlay className="card-img-overlay d-flex flex-column justify-content-end pl-1 pb-1">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col text-left">
                                            <h4 className="card-title">{props.nombre}</h4>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col text-left">
                                            <h6 className="card-subtitle mb-2 text-white">{edad} dias</h6>
                                        </div>
                                    </div>
                                </div>
                            </Overlay>
                        </Card>
                    </Link>
                </Paper>
            </Grow>
        </div>
    )
}