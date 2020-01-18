import React, {Component} from 'react'
import moment from 'moment'
import fotoPlanta from '../images/apple cookies.jpg'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './styles/alertPlanta.css'
import AlertPlanta from '../alerts/AlertPlanta'
import AlertPodas from '../alerts/AlertPodas'
import AlertRiego from '../alerts/AlertRiego'
import AlertFumigaciones from '../alerts/AlertFumigaciones'
import AlertEliminarPlanta from '../alerts/AlertEliminarPlanta'
import AlertCambiarCiclo from '../alerts/AlertCambiarCiclo';
import {database} from 'firebase'
class TarjetaPlanta extends Component{
    state={
        edad:undefined
    }
    alertEliminarPlanta=()=>confirmAlert({
        customUI : ({onClose}) =>{
            return(
                <div className="custom-ui">
                    <AlertEliminarPlanta
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
                        alertRiegos={this.alertRiegos}
                        alertPodas={this.alertPodas}
                        alertFumigaciones={this.alertFumigaciones}
                    />
                </div>
            );
        }
    })
    alertRiegos=()=>confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <div className='custom-ui scroll'>
                    <AlertRiego
                        idPlanta={this.props.id}
                        alert={this.alertRiegos}
                        onClose={onClose}
                        alertPlanta={this.alertPlanta}
                        nombre={this.props.nombre}
                        riegos={this.props.riegos}
                    />
                </div>
            );
        }
    })
    alertPodas=()=>confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <div className='custom-ui scroll'>
                    <AlertPodas
                        idPlanta={this.props.id}
                        alert={this.alertPodas}
                        onClose={onClose}
                        alertPlanta={this.alertPlanta}
                        nombre={this.props.nombre}
                        podas={this.props.podas}
                    />
                </div>
            );
        }
    })
    alertFumigaciones=()=>confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <div className='custom-ui scroll'>
                    <AlertFumigaciones
                        idPlanta={this.props.id}
                        alert={this.alertFumigaciones}
                        onClose={onClose}
                        alertPlanta={this.alertPlanta}
                        nombre={this.props.nombre}
                        fumigaciones={this.props.fumigaciones}
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
        await database().ref().child('plantas').child(this.props.id).remove()
    }
    render(){
        return(
            <div className="col-3">
                <div className="card bg-success" >
                    <img src={fotoPlanta} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title text-dark">{this.props.nombre}</h5>
                        <h6 className="card-subtitle mb-2 text-dark">{this.state.edad} dias</h6>
                        <button type='button' className='btn btn-outline-light card-link' onClick={this.alertPlanta}>Mas Info</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default TarjetaPlanta