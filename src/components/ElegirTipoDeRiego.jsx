import React, {Component} from 'react'
import {Row,Col,Accordion,Card} from 'react-bootstrap'
import './styles/accion-card.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSortDown} from '@fortawesome/free-solid-svg-icons'

class ElegirTipoDeRiego extends Component{
    render(){
        return(
            <Row>
                <Col sm={{span:8,offset:2}}>
                    <Card>
                        <Accordion.Toggle as={Card.Header} className={this.props.tipoDeRiego?'text-white bg-success ':'text-light bg-dark'} eventKey="1">
                            <div className="row">
                                <div className="col-auto ml-auto mr-auto">
                                    Elige El tipo de Riego
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-auto ml-auto mr-auto">
                                    {this.props.tipoDeRiego?<strong>({this.props.tipoDeRiego})</strong>:null}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 text-centet">
                                    <FontAwesomeIcon icon={faSortDown}/>
                                </div>
                            </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1" id='collapseTipoDeRiego'>
                            <div className="row my-2">
                                <div className="col text-center">
                                    <button type='button' className={this.props.tipoDeRiego==='Tierra'?'btn btn-success':'btn btn-outline-dark'} onClick={e=>{this.props.cambiarTipoDeRiego('Tierra')}}>
                                        Tierra
                                    </button>
                                </div>
                                <div className="col text-center">
                                    <button type='button' className={this.props.tipoDeRiego==='Foliar'?'btn btn-success':'btn btn-outline-dark'} onClick={e=>{this.props.cambiarTipoDeRiego('Foliar')}}>
                                        Foliar
                                    </button>
                                </div>
                            </div>
                        </Accordion.Collapse>
                    </Card>
                </Col>
            </Row>
        )
    }
}
export default ElegirTipoDeRiego