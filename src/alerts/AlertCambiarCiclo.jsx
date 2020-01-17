import React , {Component} from 'react'
import AlertNavBar from '../alert-components/AlertNavBar'

class AlertCambiarCiclo extends Component{
    render(){
        return(
            <div className="container-fluid alert alertPlanta">
                <AlertNavBar 
                    alertPlanta={this.props.alertPlanta} 
                    onClose={this.props.onclose} 
                />
                <div className="row">
                    <div className="col text-center">
                        <h2 className="text-white">Esta seguro que desea eliminar {this.props.nombre} del armario?</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col text-center">
                        <button tpe="button" className='btn btn-danger' onClick={e=>{
                        }}>Si, Eliminar</button>
                    </div>
                    <div className="col text-center">
                        <button type="button" className="btn btn-secondary" onClick={this.props.onClose}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
export default AlertCambiarCiclo