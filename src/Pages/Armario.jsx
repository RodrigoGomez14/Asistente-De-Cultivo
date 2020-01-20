import React , {Component} from 'react'
import CarouselPlantas from '../components/CarouselPlantas'
import BarraDeLuz from '../components/BarraDeLuz'
import TemperaturaYHumedad from '../components/TemperaturaYHumedad'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAlignRight} from '@fortawesome/free-solid-svg-icons'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../components/styles/alertPlanta.css'
import './styles/Accion.css'
import {connect} from 'react-redux'
import  {database} from 'firebase'
import AlertConfiguracionArmario from '../alerts/AlertConfiguracionArmario'
import AlertCambiarFinal from '../alerts/AlertCambiarFinal'
import AlertCambiarInicio from '../alerts/AlertCambiarInicio'
import AlertCambiarPeriodo from '../alerts/AlertCambiarPeriodo'
import {MenuButton} from './styles/ArmarioStyle'
import Navbar from '../components/Navbar'
class Armario extends Component{
    state={
        nuevoPeriodo:undefined,
        menuOpened:false
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
        await database().ref().update({
            periodo:this.state.nuevoPeriodo
        })
    }
    cambiarHoraDeInicio=async ()=>{
        const horas = document.getElementById('inputHoras').value
        //const minutos = document.getElementById('inputMinutos').value
        await database().ref().update({
            horaDeInicio: parseInt(horas)
        })
    }
    cambiarHoraDeFinal=async ()=>{
        const horas = document.getElementById('inputHoras').value
        //const minutos = document.getElementById('inputMinutos').value
        await database().ref().update({
            horaDeFinal: parseInt(horas)
        })
    }
    changeStateOfNavbar =() =>{
        this.setState({menuOpened:!this.state.menuOpened})
    }
    render(){
        return(
            <div className="container-fluid d-flex flex-column justify-content-around h-100">
                {this.state.menuOpened?
                    <Navbar alertConfiguracion={this.alertConfiguracion}closeNavbar={this.changeStateOfNavbar}/>
                    :
                    <MenuButton onClick={e=>{
                        this.changeStateOfNavbar()
                    }}>
                        <FontAwesomeIcon icon={faAlignRight}/>
                    </MenuButton>
                }
                <div className='row'>
                    <div className='col'>
                        <BarraDeLuz/>            
                    </div>
                </div>
                <div className='row'>
                    <CarouselPlantas/>
                </div>
            </div>
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