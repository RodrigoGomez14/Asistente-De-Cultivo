import React , {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes} from '@fortawesome/free-solid-svg-icons'
import * as firebase from 'firebase'
class AccionDetallada extends Component{
    eliminarAccion= async()=>{
        await firebase.database().ref().child('plantas').child(this.props.idPlanta).child(this.props.tipoDeAccion).child(this.props.id).remove()
        this.props.alert()
    }
    render(){
        return(
            <div className="container-fluid">
                <div className="row">
                    {this.props.tipoDeAccion==='podas'?
                        <div className="col-auto">
                            <h5 className='text-dark'>{this.props.accion.fecha}</h5>
                                {this.props.tipoDePoda?
                                <>
                                    <hr/>
                                    <h5 className='text-dark'>{this.props.tipoDePoda}</h5>
                                </>
                                :
                                null
                            }
                        </div>
                        :
                        <>
                            <div className="col-auto">
                                <h5 className='text-dark'>{this.props.accion.fecha}</h5>
                            </div>
                            <div className="col-auto">
                                <h5 className='text-dark'>{this.props.accion.agua} L de agua</h5>
                            </div>
                            <div className="col text-right">
                                <h5>
                                    <div className="badge badge-pill badge-dark">
                                        {this.props.accion.tipoDeRiego}
                                    </div>
                                </h5>
                            </div>
                        </>
                    }
                    <div className="col-auto ml-auto">
                        <FontAwesomeIcon icon={faTimes} onClick={e=>{this.eliminarAccion()}}/>
                    </div>
                </div>
                <div className="row">
                    {this.props.accion.aditivos?
                        Object.keys(this.props.accion.aditivos).map((aditivo,i)=>(
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
                        ))
                        :
                        null
                    }
                </div>
            </div>
        )
    }
}
export default AccionDetallada