import React from 'react'
import {Table,Accordion, Card,Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortDown, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { confirmAlert } from 'react-confirm-alert';
import {AlertNuevoAditivo} from '../alerts/AlertNuevoAditivo'
import 'react-confirm-alert/src/react-confirm-alert.css';
import './styles/table.css'
import {database} from 'firebase'
export const TableAditivos = ({title,aditivos}) =>{

    const alertNuevoAditivo=()=>confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <div className='custom-ui'>
                    <AlertNuevoAditivo
                        aditivos={aditivos}
                        tipoDeAditivo={title}
                        onClose={onClose}
                    />
                </div>
            );
        }
    })
    const alertEditarAditivo=(aditivo)=>confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <div className='custom-ui'>
                    <AlertNuevoAditivo
                        aditivos={aditivos}
                        tipoDeAditivo={title}
                        onClose={onClose}
                        aditivo={aditivo}
                    />
                </div>
            );
        }
    })
    const eliminarAditivo=async (id)=>{
        let newAditivos = aditivos
        newAditivos.splice(id,1)
        switch (title) {
            case "Fertilizantes":
                await database().ref().update({
                   fertilizantes:newAditivos
                })
                break;
            case "Insecticidas":
                await database().ref().update({
                    insecticidas:newAditivos
                })
                break;
            default:
                break;
        }
    }
    return(
        <div className='overflow-auto'>
            <Table striped bordered hover variant='dark'>
                <tbody>
                    <tr>
                        <th className=' justify-content-center align-items-center'>
                            <FontAwesomeIcon icon={faPlusCircle} onClick={e=>{
                                alertNuevoAditivo()
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
                                                    <button type='button' className='btn btn-dark' onClick={e=>{
                                                        alertEditarAditivo(aditivo)
                                                    }}>
                                                        Editar aditivo
                                                    </button>
                                                </div>
                                                <div className="col-auto ml-auto mr-auto">
                                                    <button type='button' className='btn btn-outline-danger' onClick={e=>{
                                                        eliminarAditivo(i)
                                                    }}>
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