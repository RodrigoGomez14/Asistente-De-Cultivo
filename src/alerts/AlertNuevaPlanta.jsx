import React , {Component} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle} from '@fortawesome/free-solid-svg-icons'
class AlertNuevaPlanta extends Component{
    render(){
        return(
            <div className="container-fluid alert alertPlanta">
            <div className="row">
                <div className="col text-center">
                    <h1 className='text-white'>Agregar Una Nueva Planta al armario</h1>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-auto form-group">
                    <div className="form-group input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                Nombre
                            </span>
                        </div>
                        <input type="text" className='form-control' id='inputNombre' />
                    </div>
                    <div className="form-group input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                Genetica
                            </span>
                        </div>
                        <input type="text" className='form-control' id='inputGenetica'/>
                    </div>
                </div>
            </div>
            <div className="row justify-content-around">
                <div className="col-auto">
                    <FontAwesomeIcon 
                        icon={faCheckCircle} 
                        className="continueIcon alert-icon" 
                        onClick={e=>{
                            const nombre = document.getElementById('inputNombre').value
                            const genetica = document.getElementById('inputGenetica').value
                            this.props.guardarNuevaPlantaDB(nombre,genetica)
                            this.props.onClose()
                        }}/>
                </div>
                <div className="col-auto">
                    <FontAwesomeIcon 
                        icon={faTimesCircle} 
                        onClick={e=>{
                            this.props.onClose()
                        }}
                        className='cancelIcon alert-icon'/>
                </div>
            </div>
        </div>
        )
    }
}
export default AlertNuevaPlanta