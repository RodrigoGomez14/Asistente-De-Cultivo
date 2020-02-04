import React from 'react'
import {Layout} from './Layout'
import {DetallePlanta} from '../alert-components/DetallePlanta'
import {DetalleAcciones} from '../alert-components/DetalleAcciones'
import {Redirect} from 'react-router-dom'
import {DeleteOutline} from '@material-ui/icons'
import {Button} from '@material-ui/core'
export const Planta =(props)=>{
    return(
        props.location.props?
            <Layout history={props.history} page={props.location.props.nombre}>
                <div className="container-fluid accion">
                    <div className="row">
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
                    </div>
                    <div className="row my-2 justify-content-center">
                        <div className="col-auto">
                            <div className="btn-group">
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    startIcon={<DeleteOutline/>}
                                    onClick={props.location.props.alertEliminarPlanta}
                                >Eliminar Planta
                                </Button>
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