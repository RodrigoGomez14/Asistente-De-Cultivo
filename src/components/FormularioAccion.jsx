import React , {Component} from 'react'
import {Row,Col,Form,Accordion,Card,Button} from 'react-bootstrap'

class FormularioAccion extends Component{
    render(){
        return(
            <Row>
                <Col sm={{span:8,offset:2}}>
                    <Accordion defaultActiveKey="0">
                        <Card>
                            <button className='btn btn-link'>
                                <Accordion.Toggle as={Card.Header} className={this.props.cantidadDeAgua || this.props.aditivosUsados?'text-light overflow-auto flex-nowrap bg-success':'text-dark overflow-auto flex-nowrap'} eventKey="2">
                                    Cantidad de Agua y Aditivos
                                    <div className="row">
                                        <div className="col-auto mr-auto ml-auto">
                                            {this.props.cantidadDeAgua?
                                                this.props.cantidadDeAgua + ' L.'
                                                :
                                                null
                                            }
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        {this.props.aditivosUsados?
                                            <div className="col-auto">
                                                {Object.keys(this.props.aditivosUsados).map(aditivo=>(
                                                    <span className='badge badge-pill badge-light mr-2 p-2'>
                                                        {aditivo} {this.props.aditivosUsados[aditivo]}ml
                                                    </span>
                                                ))}
                                            </div>
                                            :
                                            null}
                                    </div>
                                </Accordion.Toggle>
                            </button>
                            <Accordion.Collapse eventKey="2">
                                <Form>
                                    <Form.Row sm={{span:4,offset:4}} className='justify-content-center align-items-center'>
                                        <Form.Group>
                                            <Form.Label htmlFor="inputLitos" className='text-dark'>Litros de Agua</Form.Label>
                                            <Form.Control type="number"
                                                onChange={e=>{
                                                    this.props.cambiarLitrosDeAgua(e.target.value)
                                                }} 
                                                value={this.props.cantidadDeAgua}
                                                id='inputLitros'/>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row className='justify-content-center align-items-center flex-column'>
                                        {this.props.aditivos?
                                            <>
                                                <div className="form-row">
                                                    <div className="col-auto">
                                                        <p className='text-dark'>Aditivos (ml)</p>
                                                    </div>
                                                </div>
                                                <div className="container">
                                                    <div className="form-row mt-4 justify-content-start w-80 flex-nowrap overflow-auto">
                                                        {this.props.aditivos.map((aditivo,i)=>(
                                                            <div className="form-group col-auto" key={'input'+i}>
                                                                <label className='text-dark'>{aditivo}</label>
                                                                <input type="number" 
                                                                    className='form-control' 
                                                                    onChange={e=>{
                                                                        if(e.target.value){
                                                                            this.props.cambiarAditivo([aditivo],e.target.value)
                                                                        }
                                                                        else{
                                                                            this.props.eliminarAditivo([aditivo])
                                                                        }
                                                                    }}
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </>
                                            :
                                            null
                                        }
                                    </Form.Row>
                                </Form>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </Col>
            </Row>
        )
    }
}
export default FormularioAccion