import React , {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faSortDown} from '@fortawesome/free-solid-svg-icons'
import * as firebase from 'firebase'
import {Accordion,Card} from 'react-bootstrap'
class AccionDetallada extends Component{
    eliminarAccion= async()=>{
        await firebase.database().ref().child('plantas').child(this.props.idPlanta).child(this.props.tipoDeAccion).child(this.props.id).remove()
        this.props.alert()
    }
    render(){
        return(
            <Card>
                <Accordion.Toggle as={Card.Header} className='bg-dark text-light' eventKey={this.props.index}>
                    <div className="container-fluid">
                        <div className="row">
                            {this.props.tipoDeAccion==='podas'?
                            <div className='container-fluid'>
                                <div className="row">
                                    <div className="col-auto">
                                        <h5 className='text-light'>{this.props.accion.fecha}</h5>
                                    </div>
                                    <div className="col-auto ml-auto">
                                        <FontAwesomeIcon icon={faTimes} onClick={e=>{this.eliminarAccion()}}/>
                                    </div>
                                </div>
                                <div className="row">
                                    {this.props.tipoDePoda?
                                        <div className='col'>
                                            <hr/>
                                            <h5 className='text-light'>{this.props.tipoDePoda}</h5>
                                        </div>
                                        :
                                        null
                                    }
                                </div>
                            </div>
                                :
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-auto">
                                            <h5 className='text-light'>{this.props.accion.fecha}</h5>
                                        </div>
                                        <div className="col-auto ml-auto">
                                            <FontAwesomeIcon icon={faTimes} onClick={e=>{this.eliminarAccion()}}/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-auto">
                                            <h5 className='text-light'>{this.props.accion.agua} L de agua</h5>
                                        </div>
                                        <div className="col-auto">
                                            <h5>
                                                <div className="badge badge-pill badge-light">
                                                    {this.props.accion.tipoDeRiego}
                                                </div>
                                            </h5>
                                        </div>
                                    </div>
                                    {this.props.accion.aditivos?
                                        <div className="row">
                                            <div className="col-auto ml-auto mr-auto">
                                                <FontAwesomeIcon icon={faSortDown}/>
                                            </div>
                                        </div>
                                        :
                                        null
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </Accordion.Toggle>
                    {this.props.accion.aditivos?
                        <Accordion.Collapse eventKey={this.props.index}>
                            <Card.Body>
                                <div className="container-fluid">
                                    <div className="row">
                                            {Object.keys(this.props.accion.aditivos).map((aditivo,i)=>(
                                                <div className="col-auto" key={aditivo+i}>
                                                    <span className='badge badge-pill badge-dark'>
                                                        <div className="col-auto">
                                                            {aditivo}
                                                        </div>
                                                        <div className="col-auto">
                                                            {this.props.accion.aditivos[aditivo]} ml
                                                        </div>
                                                    </span>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </Card.Body>
                        </Accordion.Collapse>
                        :
                        null
                    }
                </Card>
        )
    }
}
export default AccionDetallada