import React , {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTint, faCut , faBug} from '@fortawesome/free-solid-svg-icons'
import {Row,Col} from 'react-bootstrap'
class DetalleAcciones extends Component{
    render(){
        return(
            <Row className="pt-2 pb-2 botonera justify-content-start ">
                <Col xs={'auto'} className="align-self-center form-group d-flex justify-content-center">
                    <div className="alertButton" onClick={e=>{
                        this.props.alertRiegos()
                    }}>
                        <FontAwesomeIcon icon={faTint} className='alert-icon mb-2' />
                        <small className='alert-icon-text text-white'>Riegos</small>
                    </div>
                </Col>
                <Col xs={'auto'} className="align-self-center form-group d-flex justify-content-center">
                    <div className="alertButton" onClick={e=>{
                        this.props.alertPodas()
                    }}>
                        <FontAwesomeIcon icon={faCut} className='alert-icon mb-2' />
                        <small className='alert-icon-text text-white'>Podas</small>
                    </div>
                </Col>
                <Col xs={"auto"}className="align-self-center form-group d-flex justify-content-center">
                    <div className="alertButton" onClick={e=>{
                        this.props.alertFumigaciones()
                    }}>
                        <FontAwesomeIcon icon={faBug} className='alert-icon mb-2' />
                        <small className='alert-icon-text text-white'>Fumigaciones</small>
                    </div>
                </Col>
            </Row>
        )
    }
}
export default DetalleAcciones