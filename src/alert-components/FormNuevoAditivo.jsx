import React from 'react'
import {Form,Row,Col} from 'react-bootstrap'
export const FormNuevoAditivo = () =>{
    return(
        <Row>
            <Col xs={12}>
                <Form className='d-flex align-items-center'>
                    <Col xs={6}>
                        <div className="row">
                            <div className="col-12 text-center">
                                <h4 className='text-white'>Caracteristicas</h4>
                            </div>
                        </div>
                        <Form.Group>
                            <Form.Label className='text-light'>
                                Nombre
                            </Form.Label>
                            <Form.Control type="text" id='nombre'/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className='text-light'>
                                Marca
                            </Form.Label>
                            <Form.Control type="text" id='marca'/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className='text-light'>
                                Descripcion
                            </Form.Label>
                            <Form.Control as='textarea' rows='2' id='descripcion'/>
                        </Form.Group>
                    </Col>
                    <Col xs={6}>
                        <div className="row">
                            <div className="col-12 text-center">
                                <h4 className='text-white'>Dosificacion</h4>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-5">
                                <Form.Label className='text-light'>
                                    Etapa
                                </Form.Label>
                                <Form.Control type='text' id='etapa1'/>
                            </div>
                            <div className="col-5">
                                <Form.Label className='text-light'>
                                    Cantidad
                                </Form.Label>
                                <Form.Control type='text' id='cantidad1'/>
                            </div>
                            <div className="col-auto ml-auto mr-auto">
                                <Form.Label className='text-light'>
                                    Foliar?
                                </Form.Label>
                                <Form.Control type='checkbox' id='checkbox1'/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-5">
                                <Form.Label className='text-light'>
                                    Etapa
                                </Form.Label>
                                <Form.Control type='text' id='etapa2'/>
                            </div>
                            <div className="col-5">
                                <Form.Label className='text-light'>
                                    Cantidad
                                </Form.Label>
                                <Form.Control type='text' id='cantidad2'/>
                            </div>
                            <div className="col-auto ml-auto mr-auto">
                                <Form.Label className='text-light'>
                                    Foliar?
                                </Form.Label>
                                <Form.Control type='checkbox' id='checkbox2'/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-5">
                                <Form.Label className='text-light'>
                                    Etapa
                                </Form.Label>
                                <Form.Control type='text' id='etapa3'/>
                            </div>
                            <div className="col-5">
                                <Form.Label className='text-light'>
                                    Cantidad
                                </Form.Label>
                                <Form.Control type='text' id='cantidad3'/>
                            </div>
                            <div className="col-auto ml-auto mr-auto">
                                <Form.Label className='text-light'>
                                    Foliar?
                                </Form.Label>
                                <Form.Control type='checkbox' id='checkbox3'/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-5">
                                <Form.Label className='text-light'>
                                    Etapa
                                </Form.Label>
                                <Form.Control type='text' id='etapa4'/>
                            </div>
                            <div className="col-5">
                                <Form.Label className='text-light'>
                                    Cantidad
                                </Form.Label>
                                <Form.Control type='text' id='cantidad4'/>
                            </div>
                            <div className="col-auto ml-auto mr-auto">
                                <Form.Label className='text-light'>
                                    Foliar?
                                </Form.Label>
                                <Form.Control type='checkbox' id='checkbox4'/>
                            </div>
                        </div>
                    </Col>
                </Form>
            </Col>
        </Row>
    )
}