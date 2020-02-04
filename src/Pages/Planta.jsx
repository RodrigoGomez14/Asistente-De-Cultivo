import React from 'react'
import {Layout} from './Layout'
import {DetallePlanta} from '../alert-components/DetallePlanta'
import {DetalleAcciones} from '../alert-components/DetalleAcciones'
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
                        {...props.location.props}
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