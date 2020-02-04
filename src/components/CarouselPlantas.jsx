import React, {Component} from 'react'
import Planta from './TarjetaPlanta'
import {connect} from 'react-redux'
import {confirmAlert} from 'react-confirm-alert'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import './styles/alertPlanta.css'
import '../Pages/styles/Accion.css'
import { faPlusCircle} from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import {database} from 'firebase'
import AlertNuevaPlanta from '../alerts/AlertNuevaPlanta'
import {Button,Typography,Grow} from '@material-ui/core'
class CarouselPlantas extends Component{
    guardarNuevaPlantaDB= async (nombre,genetica)=>{
        await database().ref().child(this.props.user).child('plantas').push({
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
            <div className="container h-100 justify-content-center d-flex flex-column ">
                <div className="row mb-3">
                    <div className="col-auto ml-auto mr-auto">
                        <Grow in={true}
                            {...(true ? { timeout: 1500 } : {})}>
                            <Typography>
                                Plantas Dentro Del Armario
                            </Typography>
                        </Grow>
                    </div>
                </div>
                <div className="row align-items-center justify-content-start flex-nowrap overflow-auto">
                    {this.props.plantas?
                        Object.keys(this.props.plantas).map(key=>(
                            <Planta
                                user={this.props.user}
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
                                history={this.props.history}
                            />
                        ))
                        :
                        <div className="col-12 text-center">
                            <h2 className='text-white'>Aun No hay plantas</h2>
                            <Button variant="contained" color="primary" onClick={this.alertNuevaPlanta}>
                                Agrega una! <FontAwesomeIcon icon={faPlusCircle} className='alert-icon ml-2'/>
                            </Button>
                        </div>
                    }
                    <div className="col-3">
                        <Grow in={true}
                        {...(true ? { timeout: 1500 } : {})}>
                            <FontAwesomeIcon icon={faPlusCircle} className='alert-icon' onClick={this.alertNuevaPlanta}/>
                        </Grow>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state =>{
    return{
        user:state.user,
        plantas:state.data.plantas,
    }
}
export default connect(mapStateToProps,null)(CarouselPlantas)