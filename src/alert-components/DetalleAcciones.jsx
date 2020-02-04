import React , {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTint, faCut , faBug} from '@fortawesome/free-solid-svg-icons'
import {Row,Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'
class DetalleAcciones extends Component{
    render(){
        return(
            <Row className="pt-2 pb-2 botonera justify-content-center ">
                <Col xs={'auto'} className="align-self-center mt-1 mb-1 d-flex">
                <Link to={{ 
                        pathname:'/Planta/Riegos',
                        props:{
                            user:this.props.user,
                            idPlanta:this.props.idPlanta,
                            riegos:this.props.riegos,
                            nombrePlanta:this.props.nombrePlanta
                    }}}>
                        <FontAwesomeIcon icon={faTint} className='alert-icon mb-2' />
                        <small className='alert-icon-text text-white'>Riegos</small>
                    </Link>
                </Col>
                <Col xs={'auto'} className="align-self-center mt-1 mb-1 d-flex">
                <Link to={{ 
                        pathname:'/Planta/Podas',
                        props:{
                            user:this.props.user,
                            idPlanta:this.props.idPlanta,
                            podas:this.props.podas,
                            nombrePlanta:this.props.nombrePlanta
                    }}}>
                        <FontAwesomeIcon icon={faCut} className='alert-icon mb-2' />
                        <small className='alert-icon-text text-white'>Podas</small>
                    </Link>
                </Col>
                <Col xs={"auto"}className="align-self-center mt-1 mb-1 d-flex">
                    <Link to={{ 
                        pathname:'/Planta/Fumigaciones',
                        props:{
                            user:this.props.user,
                            idPlanta:this.props.idPlanta,
                            fumigaciones:this.props.fumigaciones,
                            nombrePlanta:this.props.nombrePlanta
                    }}}>
                        <FontAwesomeIcon icon={faBug} className='alert-icon mb-2' />
                        <small className='alert-icon-text text-white'>Fumigaciones</small>
                    </Link>
                </Col>
            </Row>
        )
    }
}
export default DetalleAcciones