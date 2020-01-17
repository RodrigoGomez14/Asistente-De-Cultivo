import React, {Component} from 'react'
import Planta from './TarjetaPlanta'
import {connect} from 'react-redux'
import {confirmAlert} from 'react-confirm-alert'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import './styles/alertPlanta.css'
import '../Pages/styles/Accion.css'
import { faPlusCircle} from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import * as firebase from 'firebase'
import AlertNuevaPlanta from '../alerts/AlertNuevaPlanta'
class CarouselPlantas extends Component{
    guardarNuevaPlantaDB= async (nombre,genetica)=>{
        await firebase.database().ref().child('plantas').push({
            nombre:nombre,
            genetica:genetica,
            nacimiento:moment().format('L')
        })
    }
    alertNuevaPlanta=()=>confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <div className='custom-ui submodalOut'>
                    <AlertNuevaPlanta
                        onClose={onClose}
                        guardarNuevaPlantaDB={this.guardarNuevaPlantaDB}
                    />
                </div>
            );
        }
    })
    render(){
        return(
            <div className="container">
                <div className="row align-items-center justify-content-center">
                    {this.props.plantas?
                        Object.keys(this.props.plantas).map(key=>(
                            <Planta 
                                nacimiento={this.props.plantas[key].nacimiento} 
                                genetica={this.props.plantas[key].genetica}
                                inicioVegetativo={this.props.plantas[key].inicioVegetativo} 
                                inicioFloracion={this.props.plantas[key].inicioFloracion} 
                                podas={this.props.plantas[key].podas} 
                                riegos={this.props.plantas[key].riegos}
                                fumigaciones={this.props.plantas[key].fumigaciones}
                                nombre={this.props.plantas[key].nombre}
                                id={key}
                                key={key}
                            />
                        ))
                        :
                        <>
                            <div className="col-12 text-center">
                                <h2 className='text-white'>Aun No hay plantas</h2>
                                <small>Agrega una!</small>
                            </div>
                        </>
                    }
                    <div className="col-3">
                        <FontAwesomeIcon icon={faPlusCircle} className='alert-icon' onClick={this.alertNuevaPlanta}/>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state =>{
    return{
        plantas:state.plantas,
    }
}
export default connect(mapStateToProps,null)(CarouselPlantas)