import React, {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCheck,faTimes} from '@fortawesome/free-solid-svg-icons'
import {Button} from 'react-bootstrap'
class BotoneraConfirmacionAccion extends Component {
    render(){
        return(
            <div className="row mb-2">
                <div className="col-auto ml-auto mr-auto">
                    <Button variant='success' onClick={
                        e=>{
                            this.props.confirmarAccion(this.props.accion)
                        }
                    }>
                        <FontAwesomeIcon icon={faCheck} size='lg' className='mr-2'/>
                        Finalizar {this.props.accion}
                    </Button>
                </div>
            </div>
        )
    }
}
export default BotoneraConfirmacionAccion