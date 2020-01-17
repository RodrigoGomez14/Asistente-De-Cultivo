import React , {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTint, faCut , faBug} from '@fortawesome/free-solid-svg-icons'
class DetalleAcciones extends Component{
    render(){
        return(
            <div className="row pt-2 pb-2 botonera justify-content-around ">
                <div className="col-auto align-self-center">
                    <div className="alertButton" onClick={e=>{
                        this.props.alertRiegos()
                    }}>
                        <FontAwesomeIcon icon={faTint} className='alert-icon mb-2' />
                        <small className='alert-icon-text text-white'>Riegos</small>
                    </div>
                </div>
                <div className="col-auto align-self-center">
                    <div className="alertButton" onClick={e=>{
                        this.props.alertPodas()
                    }}>
                        <FontAwesomeIcon icon={faCut} className='alert-icon mb-2' />
                        <small className='alert-icon-text text-white'>Podas</small>
                    </div>
                </div>
                <div className="col-auto align-self-center">
                    <div className="alertButton" onClick={e=>{
                        this.props.alertFumigaciones()
                    }}>
                        <FontAwesomeIcon icon={faBug} className='alert-icon mb-2' />
                        <small className='alert-icon-text text-white'>Fumigaciones</small>
                    </div>
                </div>
            </div>
        )
    }
}
export default DetalleAcciones