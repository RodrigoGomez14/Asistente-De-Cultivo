import React from 'react'
import {Layout} from './Layout'
import DetallePlanta from '../alert-components/DetallePlanta'
import DetalleAcciones from '../alert-components/DetalleAcciones'
import {Redirect} from 'react-router-dom'
export const Planta =(props)=>{
    return(
        props.location.props?
            <Layout history={props.history} page={props.location.props.nombre}>
                <div className="container-fluid accion">
                    <DetallePlanta 
                        genetica={props.location.props.genetica}
                        edad={props.location.props.edad}
                        nacimiento={props.location.props.nacimiento}
                        inicioVegetativo={props.location.props.inicioVegetativo}
                        inicioFloracion={props.location.props.inicioFloracion}
                    />
                    <DetalleAcciones
                        user={props.location.props.user}
                        nombrePlanta={props.location.props.nombre}
                        riegos={props.location.props.riegos}
                        podas={props.location.props.podas}
                        fumigaciones={props.location.props.fumigaciones}
                        alertRiegos={props.location.props.alertRiegos}
                        alertPodas={props.location.props.alertPodas}
                        alertFumigaciones={props.location.props.alertFumigaciones}
                    />
                    <div className="row mt-4 justify-content-center">
                        <div className="col-auto">
                            <div className="btn-group">
                                <button type='button' className='btn btn-danger mr-4'onClick={props.location.props.alertEliminarPlanta} >Eliminar Planta</button>
                                <button type='button' className='btn btn-outline-light'onClick={props.location.props.alertCambiarCiclo} >Cambiar Ciclo</button>                                
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
            :
            <Redirect to='/'/>
    )
}