import React,{useState} from 'react'
import {Form,Row,Col,Container, Accordion, Card,InputGroup} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
export const FormNuevoAditivo = ({updateState,aditivo}) =>{
    let [cantidadDeDosis,setCantidadDeDosis]=useState(1)
    const exaplmesForInput=['Periodo Vegetativo','Cualquier Momento','Post Germinacion']
    let dosisList = []
    if(aditivo){
        Object.keys(aditivo.dosis).map((tipoDeRiego,i)=>{
            setCantidadDeDosis(cantidadDeDosis+=1)
            if(tipoDeRiego==='Foliar'){
                Object.keys(aditivo.dosis[tipoDeRiego]).map((dosificacion,j)=>{
                    dosisList.push({
                        nombre:dosificacion,
                        cantidad:aditivo.dosis[tipoDeRiego][dosificacion]
                    })
                    return null
                })
            }
            else{
                Object.keys(aditivo.dosis[tipoDeRiego]).map((dosificacion,j)=>{
                    dosisList.push({
                        nombre:dosificacion,
                        cantidad:aditivo.dosis[tipoDeRiego][dosificacion],
                    })
                    return null
                })
            }
            return null
        })
    }
    return(
        <Form className='d-flex align-items-center mb-3'>
            {console.log(cantidadDeDosis)}
            <Container fluid>
                <Row>
                    <Col xs={12} md={{span:10, offset:1}} lg={{span:8,offset:2}}>
                        <Accordion defaultActiveKey='0'>
                            <Card>
                                <Accordion.Toggle as={Card.Header} className='bg-dark text-light' eventKey='0'>
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col-12 text-center">
                                                <h4 className='text-white'>Caracteristicas</h4>
                                            </div>
                                        </div>
                                    </div>
                                </Accordion.Toggle>
                                <Accordion.Collapse as={Card.Body} eventKey='0'>
                                    <div className="container">
                                        <div className="row mt-2">
                                            <div className="col-auto ml-auto mr-auto">
                                                <Form.Group>
                                                    <Form.Label className='text-dark'>
                                                        Nombre
                                                    </Form.Label>
                                                    <Form.Control type="text" id='nombre' onChange={e=>{
                                                        updateState(e.target.value,'nombre')
                                                    }}/>
                                                </Form.Group>
                                            </div>
                                            <div className="col-auto ml-auto mr-auto">
                                                <Form.Group>
                                                    <Form.Label className='text-dark'>
                                                        Marca
                                                    </Form.Label>
                                                    <Form.Control type="text" id='marca'  onChange={e=>{
                                                        updateState(e.target.value,'marca')
                                                    }}/>
                                                </Form.Group>
                                            </div>
                                            <div className="col-12">
                                                <Form.Group>
                                                    <Form.Label className='text-dark'>
                                                        Descripcion
                                                    </Form.Label>
                                                    <Form.Control as='textarea' rows='2' id='descripcion'  onChange={e=>{
                                                        updateState(e.target.value,'descripcion')
                                                    }}/>
                                                </Form.Group>
                                            </div>
                                        </div>
                                    </div>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Accordion.Toggle as={Card.Header} className='bg-dark text-light' eventKey='1'>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-12 text-center">
                                                <h4 className='text-white'>Dosificacion</h4>
                                            </div>
                                        </div>
                                    </div>
                                </Accordion.Toggle>
                                <Accordion.Collapse as={Card.Body} className='mt-2' eventKey='1'>
                                        <Form>
                                            <Container>
                                                <Row className='flex-nowrap overflow-auto'>
                                                {dosisList.length?
                                                    dosisList.map((vacio,i)=>(
                                                        <div className="col-auto">
                                                            <Form.Group >
                                                                <Form.Label className='text-dark'>
                                                                    Etapa
                                                                </Form.Label>
                                                                <Form.Control type='text' id={'etapa'+i} placeholder={exaplmesForInput[i]?exaplmesForInput[i]:null} defaultValue="formNuevoAditivo" onChange={e=>{
                                                                    updateState(e.target.value,'etapa','dosis'+i)
                                                                }}/>
                                                                <Form.Label className='text-dark'>
                                                                    Cantidad
                                                                </Form.Label>
                                                                <InputGroup>
                                                                    <Form.Control type='number' id={'cantidad'+i} onChange={e=>{
                                                                        updateState(parseFloat(e.target.value),'cantidad','dosis'+i)
                                                                    }}/>
                                                                    <InputGroup.Prepend>
                                                                        <Form.Control as='select' id={'tipoDeDosis'+i} onChange={e=>{
                                                                            updateState(e.target.value,'tipoDeDosis',"dosis"+i)
                                                                        }}>
                                                                            <option value='1' selected>ml/L</option>
                                                                            <option value="2">gr/L</option>
                                                                        </Form.Control>
                                                                    </InputGroup.Prepend>
                                                                </InputGroup>
                                                                <Form.Label className='text-dark'>
                                                                    Tipo de riego
                                                                </Form.Label>
                                                                <Form.Control as='select' id={'tipoDeRiego'+i} onChange={e=>{
                                                                    updateState(e.target.value,'tipoDeRiego','dosis'+i)
                                                                }}>
                                                                    <option>-</option>
                                                                    <option value='Foliar'>Foliar</option>
                                                                    <option value="Tierra">Tierra</option>
                                                                </Form.Control>
                                                            </Form.Group>
                                                        </div>
                                                    ))
                                                    :
                                                    new Array(cantidadDeDosis).fill(undefined).map((vacio,i)=>(
                                                        <div className="col-auto">
                                                            <Form.Group >
                                                                <Form.Label className='text-dark'>
                                                                    Etapa
                                                                </Form.Label>
                                                                <Form.Control type='text' id={'etapa'+i} placeholder={exaplmesForInput[i]?exaplmesForInput[i]:null} onChange={e=>{
                                                                    updateState(e.target.value,'etapa','dosis'+i)
                                                                }}/>
                                                                <Form.Label className='text-dark'>
                                                                    Cantidad
                                                                </Form.Label>
                                                                <InputGroup>
                                                                    <Form.Control type='number' id={'cantidad'+i} onChange={e=>{
                                                                        updateState(parseFloat(e.target.value),'cantidad','dosis'+i)
                                                                    }}/>
                                                                    <InputGroup.Prepend>
                                                                        <Form.Control as='select' id={'tipoDeDosis'+i} onChange={e=>{
                                                                            updateState(e.target.value,'tipoDeDosis',"dosis"+i)
                                                                        }}>
                                                                            <option value='1' selected>ml/L</option>
                                                                            <option value="2">gr/L</option>
                                                                        </Form.Control>
                                                                    </InputGroup.Prepend>
                                                                </InputGroup>
                                                                <Form.Label className='text-dark'>
                                                                    Tipo de riego
                                                                </Form.Label>
                                                                <Form.Control as='select' id={'tipoDeRiego'+i} onChange={e=>{
                                                                    updateState(e.target.value,'tipoDeRiego','dosis'+i)
                                                                }}>
                                                                    <option>-</option>
                                                                    <option value='Foliar'>Foliar</option>
                                                                    <option value="Tierra">Tierra</option>
                                                                </Form.Control>
                                                            </Form.Group>
                                                        </div>
                                                    ))
                                                }
                                                    <div className="col-auto align-self-center">
                                                        <FontAwesomeIcon icon={faPlusCircle} color='green' size="lg" onClick={e=>{
                                                            setCantidadDeDosis(cantidadDeDosis+=1)
                                                        }}/>
                                                    </div>
                                                </Row>
                                            </Container>
                                        </Form>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </Col>
                </Row>
            </Container>
        </Form>
    )
}