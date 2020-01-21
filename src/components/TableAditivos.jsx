import React from 'react'
import {Table,Accordion, Card,Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortDown, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { confirmAlert } from 'react-confirm-alert';
import {AlertNuevoAditivo} from '../alerts/AlertNuevoAditivo'
import 'react-confirm-alert/src/react-confirm-alert.css';
import './styles/table.css'
export const TableAditivos = ({title,aditivos}) =>{

    const alertNuevoAditivo=(tipoDeAditivo)=>confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <div className='custom-ui'>
                    <AlertNuevoAditivo
                        tipoDeAditivo={tipoDeAditivo}
                        onClose={onClose}
                    />
                </div>
            );
        }
    })
    return(
        <div className='overflow-auto'>
            <Table striped bordered hover variant='dark'>
                <tbody>
                    <tr>
                        <th className=' justify-content-center align-items-center'>
                            <FontAwesomeIcon icon={faPlusCircle} onClick={e=>{
                                alertNuevoAditivo(title)
                            }}/>
                        </th>
                    </tr>
                    {aditivos?
                        aditivos.map((aditivo,i)=>(
                        <Accordion>
                            <Card>
                                <Accordion.Toggle as={Card.Header} className='d-flex bg-dark justify-content-between px-4 hover' eventKey="1">
                                    <div>
                                        {aditivo.nombre} <span className='badge badge-pill badge-light'>{aditivo.marca}</span>
                                    </div>
                                    <FontAwesomeIcon icon={faSortDown}/>
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="1">
                                    <Card.Body className='text-dark'>
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-12 text-center">
                                                    <strong>
                                                        Descripcion
                                                    </strong>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col text-left">
                                                    <small>
                                                        {aditivo.descripcion}
                                                    </small>
                                                </div>
                                            </div>
                                            <hr/>
                                            <div className="row">
                                                <div className="col-12 text-center">
                                                    <strong>
                                                        Dosificacion
                                                    </strong>
                                                </div>
                                            </div>
                                            {Object.keys(aditivo.dosis).map(tipoDeAplicacion=>(
                                                <>
                                                    <div className="row mb-2 mt-2">
                                                        <div className="col-auto mr-auto">
                                                            <span className='badge badge-pill badge-dark'>
                                                                {tipoDeAplicacion}
                                                            </span>
                                                        </div>
                                                    <hr/>
                                                    </div>
                                                    {Object.keys(aditivo.dosis[tipoDeAplicacion]).map(aplicacion=>(
                                                        <div className="row">
                                                            <div className="col-auto mr-auto">
                                                                {aplicacion}
                                                            </div>
                                                            <div className="col-auto ml-auto">
                                                                {aditivo.dosis[tipoDeAplicacion][aplicacion]}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </>
                                            ))}
                                            <div className="row mt-4">
                                                <div className="col-auto ml-auto mr-auto">
                                                    <button type='button' className='btn btn-dark'>
                                                        Editar aditivo
                                                    </button>
                                                </div>
                                                <div className="col-auto ml-auto mr-auto">
                                                    <button type='button' className='btn btn-outline-danger'>
                                                        Eliminar aditivo
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    ))
                    :
                    <h1>Agrega {title}</h1>
                    }
                </tbody>
            </Table>
        </div>
    )
}