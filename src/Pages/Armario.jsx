import React , {Component} from 'react'
import CarouselPlantas from '../components/CarouselPlantas'
import BarraDeLuz from '../components/BarraDeLuz'
//import TemperaturaYHumedad from '../components/TemperaturaYHumedad'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
import { faTint, faCut , faBug , faCogs, faAlignRight, faTimes} from '@fortawesome/free-solid-svg-icons'
import {Layout} from './Layout'
import {Paper }from '@material-ui/core'

class Armario extends Component{
    state={
        nuevoPeriodo:undefined,
        menuOpened:false,
        selectedTab:'recents'
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
        await database().ref().child(this.props.user).update({
            periodo:this.state.nuevoPeriodo
        })
    }
    cambiarHoraDeInicio=async ()=>{
        const horas = document.getElementById('inputHoras').value
        //const minutos = document.getElementById('inputMinutos').value
        await database().ref().child(this.props.user).update({
            horaDeInicio: parseInt(horas)
        })
    }
    cambiarHoraDeFinal=async ()=>{
        const horas = document.getElementById('inputHoras').value
        //const minutos = document.getElementById('inputMinutos').value
        await database().ref().child(this.props.user).update({
            horaDeFinal: parseInt(horas)
        })
    }
    render(){
        return(
            <Layout history={this.props.history} page="Armario">
                <div className="container-fluid overflow-auto">
                    <div className="row">
                        <BarraDeLuz/>       
                    </div>
                    <div className="row">
                        <CarouselPlantas history={this.props.history}/>
                    </div>
                </div>
            </Layout>
        )
    }
}
const mapStateToProps = state =>{
    return{
        user:state.user,
        plantas:state.data.plantas,
        periodo:state.data.periodo,
        horaDeInicio:state.data.hora,
        horaDeFinal:state.data.horaDeFinal,
    }
}
export default connect(mapStateToProps,null)(Armario)