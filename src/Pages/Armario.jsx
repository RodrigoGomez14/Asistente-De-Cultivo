import React , {Component} from 'react'
import CarouselPlantas from '../components/CarouselPlantas'
import BarraDeLuz from '../components/BarraDeLuz'
import FechaYHora from '../components/FechaYHora'
import AccionesRapidas from '../components/AccionesRapidas'
import TemperaturaYHumedad from '../components/TemperaturaYHumedad'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCogs, faArrowLeft, faTimes, faExclamationCircle, faCheck, faCheckCircle, faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../components/styles/alertPlanta.css'
import './styles/Accion.css'
import {connect} from 'react-redux'
import * as firebase from 'firebase'
import AlertConfiguracionArmario from '../alerts/AlertConfiguracionArmario'
import AlertCambiarFinal from '../alerts/AlertCambiarFinal'
import AlertCambiarInicio from '../alerts/AlertCambiarInicio'
import AlertCambiarPeriodo from '../alerts/AlertCambiarPeriodo'
class Armario extends Component{
    state={
        nuevoPeriodo:undefined
    }
    alertCambiarPeriodo=()=>confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <div className='custom-ui'>
                    <AlertCambiarPeriodo
                        onClose={onClose}
                        alertConfiguracion={this.alertConfiguracion}
                        nuevoPeriodo={this.state.nuevoPeriodo}
                        cambiarStatePeriodo={nuevoPeriodo=>{
                            this.setState({
                                nuevoPeriodo:nuevoPeriodo
                            })
                        }}
                        cambioDePeriodo={this.cambioDePeriodo}
                    />
                </div>
            );
        }
    })
    alertCambiarInicio=()=>confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <div className='custom-ui'>
                    <AlertCambiarInicio
                        onClose={onClose}
                        alertConfiguracion={this.alertConfiguracion}
                        cambiarHoraDeInicio={this.cambiarHoraDeInicio}
                    />
                </div>
            );
        }
    })
    alertCambiarFinal=()=>confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <div className='custom-ui'>
                    <AlertCambiarFinal
                        onClose={onClose}
                        alertConfiguracion={this.alertConfiguracion}
                        cambiarHoraDeFinal={this.cambiarHoraDeFinal}
                    />
                </div>
            );
        }
    })
    alertConfiguracion=()=>confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <div className='custom-ui'>
                    <AlertConfiguracionArmario
                        periodo={this.props.periodo}
                        horaDeFinal={this.props.horaDeFinal}
                        horaDeInicio={this.props.horaDeInicio}
                        onClose={onClose}
                        alertCambiarFinal={this.alertCambiarFinal}
                        alertCambiarInicio={this.alertCambiarInicio}
                        alertCambiarPeriodo={this.alertCambiarPeriodo}
                    />
                </div>
            );
        }
    })
    cambioDePeriodo=async()=>{
        await firebase.database().ref().update({
            periodo:this.state.nuevoPeriodo
        })
    }
    cambiarHoraDeInicio=async ()=>{
        const horas = document.getElementById('inputHoras').value
        const minutos = document.getElementById('inputMinutos').value
        await firebase.database().ref().update({
            horaDeInicio: parseInt(horas)
        })
    }
    cambiarHoraDeFinal=async ()=>{
        const horas = document.getElementById('inputHoras').value
        const minutos = document.getElementById('inputMinutos').value
        await firebase.database().ref().update({
            horaDeFinal: parseInt(horas)
        })
    }
    render(){
        return(
            <>
                <div className="container-fluid">
                    <div className="row mt-3">
                        <div className="col-10 text-right">
                            <FontAwesomeIcon icon={faCogs} className='alert-icon' onClick={this.alertConfiguracion}/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12 form-group'>
                            <FechaYHora/>
                        </div>
                        <div className='col-6 offset-3'>
                            <TemperaturaYHumedad/>
                        </div>
                    </div>
                    <div className='row mb-2'>
                        <div className='col'>
                            <BarraDeLuz/>            
                        </div>
                    </div>
                    {this.props.plantas?
                        <AccionesRapidas/>
                        :
                        null
                    }
                    <div className='row mt-4'>
                        <CarouselPlantas/>
                    </div>
                </div>
            </>
        )
    }
}
const mapStateToProps = state =>{
    return{
        plantas:state.plantas,
        periodo:state.periodo,
        horaDeInicio:state.horaDeInicio,
        horaDeFinal:state.horaDeFinal,
    }
}
export default connect(mapStateToProps,null)(Armario)