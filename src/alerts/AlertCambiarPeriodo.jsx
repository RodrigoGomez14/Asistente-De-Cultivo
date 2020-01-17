import React, {Component} from 'react'
import AlertNavBar from '../alert-components/AlertNavBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCheckCircle,faTimesCircle} from '@fortawesome/free-solid-svg-icons'
class AlertCambiarPeriodo extends Component{
    render(){
        return(
            <div className="container-fluid alert alertPlanta">
                <AlertNavBar
                    alertPlanta={this.props.alertConfiguracion}
                    onClose={this.props.onClose}
                    title='Cambiar Periodo del Armario'
                />
                <div className="row mt-4">
                    <div className="col text-center">
                        <button type='button' className={this.props.nuevoPeriodo==='Germinacion'?'btn btn-success':'btn btn-outline-success'} onClick={e=>{
                            this.props.cambiarStatePeriodo('Germinacion')
                        }}>Germinacion</button>
                    </div>
                    <div className="col text-center">
                        <button type='button' className={this.props.nuevoPeriodo==='Vegetativo'?'btn btn-success':'btn btn-outline-success'} onClick={e=>{
                            this.props.cambiarStatePeriodo('Vegetativo')
                        }}>Vegetativo</button>
                    </div>
                    <div className="col text-center">
                        <button type='button' className={this.props.nuevoPeriodo==='Floracion'?'btn btn-success':'btn btn-outline-success'} onClick={e=>{
                            this.props.cambiarStatePeriodo('Floracion')
                        }}>Floracion</button>
                    </div>
                </div>
                <div className="row justify-content-around">
                    <div className="col-auto">
                        <FontAwesomeIcon icon={faCheckCircle} className="alert-icon continueIcon" onClick={e=>{
                            this.props.cambioDePeriodo()
                            this.props.alertConfiguracion()
                        }}/>
                    </div>
                    <div className="col-auto">
                        <FontAwesomeIcon icon={faTimesCircle} className='alert-icon cancelIcon' onClick={e=>{
                            this.props.alertConfiguracion()
                        }} />
                    </div>
                </div>
            </div>
        )
    }
}
export default AlertCambiarPeriodo