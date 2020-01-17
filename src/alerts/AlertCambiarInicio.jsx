import React , {Component} from 'react'
import AlertNavBar from '../alert-components/AlertNavBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import AlertBotoneraConfirmacion from '../alert-components/AlertBotoneraConfirmacion'
import InputCambiarHorario from '../alert-components/InputCambiarHorario'
class AlertCambiarFinal extends Component{
    render(){
        return(
            <div className="container-fluid alert alertPlanta">
                <AlertNavBar
                    alertPlanta={this.props.alertConfiguracion}
                    onClose={this.props.onClose}
                    title='Cambiar Hora de Final Del Ciclo'
                />
                <InputCambiarHorario/>
                <AlertBotoneraConfirmacion
                    cambiarHora={this.props.cambiarHoraDeInicio}
                    alertConfiguracion={this.props.alertConfiguracion}
                />
            </div>
        )
    }
}
export default AlertCambiarFinal