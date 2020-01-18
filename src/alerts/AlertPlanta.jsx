import React , {Component} from 'react'
import DetallePlanta from '../alert-components/DetallePlanta'
import DetalleAcciones from '../alert-components/DetalleAcciones'
import AlertNavBar from '../alert-components/AlertNavBar'
import BreadcrumbPlanta from '../alert-components/BreadcrumbPlanta'
import {storage} from 'firebase'
class AlertPlanta extends Component{
    subirArchivo= async ()=>{
        const ref = await storage().ref(this.props.id)
        const file = document.getElementById('input').files[0]
        //file.name=this.props.id+file.name.slice(file.name.indexOf('.'))
        ref.put(file).then(e=>{
            console.log('Archivo subido Correctamente')
        })
    }
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