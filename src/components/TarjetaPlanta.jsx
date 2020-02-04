import React, {Component} from 'react'
import moment from 'moment'
import fotoPlanta from '../images/apple cookies.jpg'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './styles/alertPlanta.css'
import AlertPlanta from '../alerts/AlertPlanta'
import AlertPodas from '../alerts/AlertPodas'
import AlertRiego from '../alerts/AlertRiego'
import AlertEliminarPlanta from '../alerts/AlertEliminarPlanta'
import AlertCambiarCiclo from '../alerts/AlertCambiarCiclo';
import {database} from 'firebase'
import {Overlay,Img,Card} from './styles/TarjetaPlantaStyles'
import {Link} from 'react-router-dom'
import {Paper} from '@material-ui/core'
import {Grow} from '@material-ui/core' 
class TarjetaPlanta extends Component{
    state={
        edad:undefined
    }
    alertEliminarPlanta=()=>confirmAlert({
        customUI : ({onClose}) =>{
            return(
                <div className="custom-ui">
                    <AlertEliminarPlanta
                        user={this.props.user}
                        nombre={this.props.nombre}
                        eliminarPlanta={this.eliminarPlanta}
                        onClose={onClose}
                    />
                </div>
            )
        }
    })
    alertCambiarCiclo=()=>confirmAlert({
        customUI : ({onClose}) =>{
            return(
                <div className="custom-ui">
                    <AlertCambiarCiclo
                        user={this.props.user}
                        alertPlanta={this.alertPlanta}
                        onClose={onClose}
                        nombre={this.props.nombre}
                    />
                </div>
            )
        }
    })
    alertPlanta=()=>confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <div className='custom-ui submodalOut'>
                    <AlertPlanta
                        {...this.props}
                        onClose={onClose}
                        alertEliminarPlanta={this.alertEliminarPlanta}
                        alertCambiarCiclo={this.alertCambiarCiclo}
                        alertPodas={this.alertPodas}
                    />
                </div>
            );
        }
    })
    componentDidMount(){
        this.setState({
            edad:moment().diff(moment(this.props.nacimiento),'days')
        })
    }
    eliminarPlanta=async ()=>{
        await database().ref().child(this.props.user).child('plantas').child(this.props.id).remove()
    }
    render(){
        return(
            <div className="col-auto">
                <Grow in={true}
                    {...(true ? { timeout: 1500 } : {})}>
                    <Paper elevation={6}>
                        <Link className='text-white' to={{
                            pathname:'/Planta',
                            props:{
                                ...this.props,
                            }
                        }}>
                            <Card className="card bg-light" >
                                <Img src={fotoPlanta} className="card-img-top" alt="..."/>
                                <Overlay className="card-img-overlay d-flex flex-column justify-content-end pl-1 pb-1">
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col text-left">
                                                <h4 className="card-title">{this.props.nombre}</h4>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col text-left">
                                                <h6 className="card-subtitle mb-2 text-white">{this.state.edad} dias</h6>
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
}
export default TarjetaPlanta