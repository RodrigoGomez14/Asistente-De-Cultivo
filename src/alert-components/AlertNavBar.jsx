import React , {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faArrowLeft} from '@fortawesome/free-solid-svg-icons'
class AlertNavBar extends Component{
    render(){
        return(
            <div className="row">
                <div className="col text-left">
                    {this.props.alertPlanta?
                        <FontAwesomeIcon icon={faArrowLeft} onClick={e=>{
                            this.props.alertPlanta()
                        }} className='alert-icon'/>
                        :
                        null
                    }
                </div>
                <div className="col-auto text-center">
                    {this.props.title}
                </div>
                <div className="col text-right">
                    <FontAwesomeIcon icon={faTimes} className='alert-icon mr-4 alert-close-icon' onClick={e=>{
                        this.props.onClose()
                    }}/>
                </div>
            </div>
        )
    }
}
export default AlertNavBar