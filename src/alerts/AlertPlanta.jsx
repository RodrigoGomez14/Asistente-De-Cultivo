import React , {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes} from '@fortawesome/free-solid-svg-icons'
import DetallePlanta from '../alert-components/DetallePlanta'
import DetalleAcciones from '../alert-components/DetalleAcciones'
import AlertNavBar from '../alert-components/AlertNavBar'
import BreadcrumbPlanta from '../alert-components/BreadcrumbPlanta'
class AlertPlanta extends Component{
    render(){
        return(
            <div className="container-fluid alert alertPlanta">
                <AlertNavBar 
                    alertPlanta={this.props.alertPlanta} 
                    onClose={this.props.onClose}
                    title={<BreadcrumbPlanta nombre={this.props.nombre}/>}
                />
                <DetallePlanta 
                    genetica={this.props.genetica}
                    edad={this.props.edad}
                    nacimiento={this.props.nacimiento}
                    inicioVegetativo={this.props.inicioVegetativo}
                    inicioFloracion={this.props.inicioFloracion}
                />
                <DetalleAcciones
                    alertRiegos={this.props.alertRiegos}
                    alertPodas={this.props.alertPodas}
                    alertFumigaciones={this.props.alertFumigaciones}
                />
                <div className="row mt-4 justify-content-center">
                    <div className="col-auto">
                        <div className="btn-group">
                            <button type='button' className='btn btn-danger mr-4'onClick={this.props.alertEliminarPlanta} >Eliminar Planta</button>
                            <button type='button' className='btn btn-outline-light'onClick={this.props.alertCambiarCiclo} >Cambiar Ciclo</button>                                
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default AlertPlanta