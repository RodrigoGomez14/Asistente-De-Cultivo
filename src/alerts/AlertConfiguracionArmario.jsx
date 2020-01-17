import React , {Component} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faTimes} from '@fortawesome/free-solid-svg-icons'
import AlertNavBar from '../alert-components/AlertNavBar'
class AlertConfiguracionArmario extends Component{
    render(){
        return(
            <div className="container-fluid alert alertPlanta">
                <AlertNavBar
                    onClose={this.props.onClose}
                    title={'Configuracion Del Armario'}
                />
                <div className="row mt-2">
                    <div className="col-6 offset-3">
                    <table className="table">
                            <tbody>
                                <tr>
                                    <td className='text-white'>Periodo</td>
                                    <td className='text-right text-white'>
                                        <select name="" id="">
                                            <option value="">
                                                {this.props.periodo}
                                            </option>
                                            <option value="">
                                                Germinacion
                                            </option>
                                            <option value="">
                                                Floracion
                                            </option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='text-white'>Hora de Inicio del Ciclo</td>
                                    <td className='text-right text-white'>{this.props.horaDeInicio} Hs</td>
                                </tr>
                                <tr>
                                    <td className='text-white'>Hora del Final Del Ciclo</td>
                                    <td className='text-right text-white'>{this.props.horaDeFinal} Hs</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-auto">
                        <button type='button' className='btn btn-success' onClick={e=>{
                            this.props.alertCambiarPeriodo()
                        }}>Cambiar Periodo</button>
                    </div>
                    <div className="col-auto">
                        <button type='button' className='btn btn-success' onClick={e=>{
                            this.props.alertCambiarInicio()
                        }}>Cambiar Hora de Inicio</button>
                    </div>
                    <div className="col-auto">
                        <button type='button' className='btn btn-success' onClick={e=>{
                            this.props.alertCambiarFinal()
                        }}>Cambiar Hora de Final</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default AlertConfiguracionArmario