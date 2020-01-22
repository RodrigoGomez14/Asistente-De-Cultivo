import React , {Component} from 'react'
import CheckboxPlanta from './CheckboxPlanta'
import {Row,Col,Accordion,Card,Button} from 'react-bootstrap'

class ElegirTipoDePoda extends Component{
    render(){
        return(
            <Row>
                <Col sm={{span:8,offset:2}}>
                    <Card>
                        <button className='btn btn-link'>
                            <Accordion.Toggle as={Card.Header} className={this.props.tipoDePoda?'text-light bg-success':'text-dark'} eventKey="1" role='button'>
                                Ingresa el Tipo de Poda
                                    {this.props.tipoDePoda?
                                    <strong className="col-auto">({this.props.tipoDePoda})</strong>
                                    :
                                    null
                                    }
                            </Accordion.Toggle>
                        </button>
                        <Accordion.Collapse eventKey="1">
                            <div className="row my-2 justify-content-center">
                                <div className="col-4">
                                    <input type="text" className='form-control'placeholder='Ej: Apical' onChange={e=>{
                                        this.props.handleChange(e.target.value)
                                    }} />
                                </div>
                            </div>
                        </Accordion.Collapse>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default ElegirTipoDePoda