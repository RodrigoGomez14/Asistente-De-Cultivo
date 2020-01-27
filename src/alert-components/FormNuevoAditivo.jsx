import React from 'react'
import {Form,Row,Col,Container} from 'react-bootstrap'
export const FormNuevoAditivo = ({updateState,aditivo}) =>{
    let dosisList =[]
    if(aditivo){
        Object.keys(aditivo.dosis).map((tipoDeRiego,i)=>{
            if(tipoDeRiego==='Foliar'){
                Object.keys(aditivo.dosis[tipoDeRiego]).map((dosificacion,j)=>{
                    dosisList.push({
                        nombre:dosificacion,
                        cantidad:aditivo.dosis[tipoDeRiego][dosificacion],
                        check:true
                    })
                    return null
                })
            }
            else{
                Object.keys(aditivo.dosis[tipoDeRiego]).map((dosificacion,j)=>{
                    dosisList.push({
                        nombre:dosificacion,
                        cantidad:aditivo.dosis[tipoDeRiego][dosificacion],
                        check:false
                    })
                    return null
                })
            }
            return null
        })
    }
    return(
        <Form className='d-flex align-items-center mb-3'>
            <Container fluid>
                <Row>
                    <Col xs={{span:10,offset:1}} lg={{span:6,offset:0}}>
                        <div className="row">
                            <div className="col-12 text-center">
                                <h4 className='text-white'>Caracteristicas</h4>
                            </div>
                        </div>
                        <Form.Group>
                            <Form.Label className='text-light'>
                                Nombre
                            </Form.Label>
                            <Form.Control type="text" id='nombre' onChange={e=>{
                                updateState(e.target.value,'nombre')
                            }}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className='text-light'>
                                Marca
                            </Form.Label>
                            <Form.Control type="text" id='marca'  onChange={e=>{
                                updateState(e.target.value,'marca')
                            }}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className='text-light'>
                                Descripcion
                            </Form.Label>
                            <Form.Control as='textarea' rows='2' id='descripcion'  onChange={e=>{
                                updateState(e.target.value,'descripcion')
                            }}/>
                        </Form.Group>
                    </Col>
                    <Col xs={{span:12}} lg={{span:6,offset:0}}>
                            <div className="row">
                                <div className="col-12 text-center">
                                    <h4 className='text-white'>Dosificacion</h4>
                                </div>
                            </div>
                            <div className="row justify-content-center form-group">
                                <div className="col-5">
                                    <Form.Label className='text-light'>
                                        Etapa
                                    </Form.Label>
                                    <Form.Control type='text' id='etapa1' onChange={e=>{
                                    updateState(e.target.value,'etapa','dosis1')
                                }}/>
                                </div>
                                <div className="col-5">
                                    <Form.Label className='text-light'>
                                        Cantidad
                                    </Form.Label>
                                    <Form.Control type='text' id='cantidad1'onChange={e=>{
                                    updateState(e.target.value,'cantidad','dosis1')
                                }}/>
                                </div>
                                <div className="col-auto">
                                    <Form.Label className='text-light'>
                                        Foliar?
                                    </Form.Label>
                                    <Form.Control type='checkbox' id='checkbox1'
                                    onChange={e=>{
                                        updateState(e.target.value,'check','dosis1')
                                    }}/>
                                </div>
                            </div>
                            <div className="row justify-content-center form-group">
                                <div className="col-5">
                                    <Form.Label className='text-light'>
                                        Etapa
                                    </Form.Label>
                                    <Form.Control type='text' id='etapa2'onChange={e=>{
                                        updateState(e.target.value,'etapa','dosis2')
                                    }}/>
                                </div>
                                <div className="col-5">
                                    <Form.Label className='text-light'>
                                        Cantidad
                                    </Form.Label>
                                    <Form.Control type='text' id='cantidad2' onChange={e=>{
                                        updateState(e.target.value,'cantidad','dosis2')
                                    }}/>
                                </div>
                                <div className="col-auto">
                                    <Form.Label className='text-light'>
                                        Foliar?
                                    </Form.Label>
                                    <Form.Control type='checkbox' id='checkbox2' onChange={e=>{
                                        updateState(e.target.value,'check','dosis2')
                                    }}/>
                                </div>
                            </div>
                            <div className="row justify-content-center form-group">
                                <div className="col-5">
                                    <Form.Label className='text-light'>
                                        Etapa
                                    </Form.Label>
                                    <Form.Control type='text' id='etapa3' onChange={e=>{
                                        updateState(e.target.value,'etapa','dosis3')
                                    }}/>
                                </div>
                                <div className="col-5">
                                    <Form.Label className='text-light'>
                                        Cantidad
                                    </Form.Label>
                                    <Form.Control type='text' id='cantidad3' onChange={e=>{
                                        updateState(e.target.value,'cantidad','dosis3')
                                    }}/>
                                </div>
                                <div className="col-auto">
                                    <Form.Label className='text-light'>
                                        Foliar?
                                    </Form.Label>
                                    <Form.Control type='checkbox' id='checkbox3' onChange={e=>{
                                        updateState(e.target.value,'check','dosis3')
                                    }}/>
                                </div>
                            </div>
                            <div className="row justify-content-center form-group">
                                <div className="col-5">
                                    <Form.Label className='text-light'>
                                        Etapa
                                    </Form.Label>
                                    <Form.Control type='text' id='etapa4' onChange={e=>{
                                        updateState(e.target.value,'etapa','dosis4')
                                    }}/>
                                </div>
                                <div className="col-5">
                                    <Form.Label className='text-light'>
                                        Cantidad
                                    </Form.Label>
                                    <Form.Control type='text' id='cantidad4' onChange={e=>{
                                        updateState(e.target.value,'cantidad','dosis4')
                                    }}/>
                                </div>
                                <div className="col-auto">
                                    <Form.Label className='text-light'>
                                        Foliar?
                                    </Form.Label>
                                    <Form.Control type='checkbox' id='checkbox4' onChange={e=>{
                                        updateState(e.target.value,'check','dosis4')
                                    }}/>
                                </div>
                            </div>
                        </Col>
                </Row>
            </Container>
        </Form>
    )
}