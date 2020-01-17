import React, {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCheck,faTimes} from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'
class BotoneraConfirmacionAccion extends Component {
    render(){
        return(
            <div className="row mb-2">
                <div className="col text-center">
                    <FontAwesomeIcon icon={faCheck} className='icon continueIcon' onClick={
                        e=>{
                            this.props.confirmarAccion('Riego')
                        }
                    }/>
                </div>
                <div className="col text-center">
                    <Link to='/'>
                        <FontAwesomeIcon icon={faTimes} className='icon cancelIcon'/>
                    </Link>
                </div>
            </div>
        )
    }
}
export default BotoneraConfirmacionAccion