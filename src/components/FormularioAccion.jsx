import React , {Component,Fragment} from 'react'
import {Row,Col,Form,Accordion,Card,InputGroup} from 'react-bootstrap'
import {PopOver} from './Popover'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSortDown} from '@fortawesome/free-solid-svg-icons'
class FormularioAccion extends Component{
    render(){
        return(
            <Row>
                <Col sm={{span:8,offset:2}}>
                    <Card>
                        <Accordion.Toggle as={Card.Header} disabled className={this.props.cantidadDeAgua || this.props.aditivosUsados?'text-light overflow-auto flex-nowrap bg-success':'text-light overflow-auto flex-nowrap bg-dark'} eventKey="2">
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
                                        {Object.keys(this.props.aditivosUsados).map((aditivo,i)=>{
                                            const cantidad = this.props.aditivosUsados[aditivo]
                                            return(
                                                <span className='badge badge-pill badge-light mr-2 p-2' key={'aditivo'+i}>
                                                    {aditivo} {parseFloat(cantidad.slice(0,cantidad.indexOf(' '))*this.props.cantidadDeAgua).toFixed(2)} ml
                                                </span>
                                            )
                                        })}
                                    </div>
                                    :
                                    null}
                            </div>
                            <div className="row">
                                <div className="col-auto ml-auto mr-auto">
                                    <FontAwesomeIcon icon={faSortDown}/>
                                </div>
                            </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse id='collapseFormulario' eventKey="2">
                                <Form>  
                                    <Form.Row sm={{span:4,offset:4}} className='justify-content-center align-items-center'>
                                        <Form.Group>
                                            <Form.Label  className='text-dark'>Litros de Agua</Form.Label>
                                            <Form.Control type="number"
                                                onChange={e=>{
                                                    this.props.cambiarLitrosDeAgua(e.target.value)
                                                    if(!e.target.value){
                                                        this.props.eliminarListaDeAditivos()
                                                    }
                                                }} 
                                                value={this.props.cantidadDeAgua}
                                                id='inputLitros'/>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row className='justify-content-center align-items-center flex-column'>
                                        {this.props.aditivos&&this.props.cantidadDeAgua?
                                            <>
                                                <div className="form-row">
                                                    <div className="col-auto">
                                                        <p className='text-dark'>Aditivos (ml)</p>
                                                    </div>
                                                </div>
                                                <div className="container">
                                                    <div className="form-row mt-4 justify-content-start w-80`">
                                                        {this.props.aditivos.map((aditivo,i)=>(
                                                            aditivo.dosis[this.props.tipoDeRiego]?
                                                                <Fragment key={'input'+i}>  
                                                                    <div className="form-group col-4">
                                                                        <Form.Group>
                                                                            <Form.Label>
                                                                                <PopOver aditivo={aditivo} cantidadDeAgua={this.props.cantidadDeAgua}/>
                                                                            </Form.Label>
                                                                            <Form.Control as='select' type="number"
                                                                                onChange={e=>{
                                                                                    if(e.target.value){
                                                                                        this.props.cambiarAditivo([aditivo.nombre],e.target.value)
                                                                                    }
                                                                                    else{
                                                                                        this.props.eliminarAditivo([aditivo.nombre])
                                                                                    }
                                                                                }}
                                                                            >
                                                                                <option value="">-</option>
                                                                                    {Object.keys(aditivo.dosis[this.props.tipoDeRiego]).map(key=>(
                                                                                        <option value={aditivo.dosis[this.props.tipoDeRiego][key]}> {aditivo.dosis[this.props.tipoDeRiego][key]} {key}</option>
                                                                                    ))}
                                                                            </Form.Control>
                                                                        </Form.Group>
                                                                    </div>
                                                                </Fragment>
                                                                :
                                                                null
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
                </Col>
            </Row>
        )
    }
}
export default FormularioAccion