import React , {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faArrowLeft} from '@fortawesome/free-solid-svg-icons'
class AlertNavBar extends Component{
    render(){
        return(
            <div className="row align-items-center mb-2">
                <div className="col-auto mr-auto">
                    {this.props.alertPlanta?
                        <FontAwesomeIcon icon={faArrowLeft} onClick={e=>{
                            this.props.alertPlanta()
                        }} className='alert-icon'/>
                        :
                        null
                    }
                </div>
                <div className="col-auto text-center text-light">
                    {this.props.title}
                </div>
                <div className="col-auto ml-auto">
                    <FontAwesomeIcon icon={faTimes} className='alert-icon mr-4 alert-close-icon' onClick={e=>{
                        this.props.onClose()
                    }}/>
                </div>
            </div>
        )
    }
}
export default AlertNavBar