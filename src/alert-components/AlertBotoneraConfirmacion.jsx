import React , {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle} from '@fortawesome/free-solid-svg-icons'
class AlertBotoneraConfirmacion extends Component{
    render(){
        return(
            <div className="row justify-content-around">
                <div className="col-auto">
                    <FontAwesomeIcon icon={faCheckCircle} className="alert-icon continueIcon" onClick={e=>{
                        this.props.cambiarHora()
                        this.props.alertConfiguracion()
                    }}/>
                </div>
                <div className="col-auto">
                    <FontAwesomeIcon icon={faTimesCircle} className='alert-icon cancelIcon' onClick={e=>{
                        this.props.alertConfiguracion()
                    }} />
                </div>
            </div>
        )
    }
}
export default AlertBotoneraConfirmacion