import React, {Component} from 'react'
import {TarjetaPlanta} from './TarjetaPlanta'
import {connect} from 'react-redux'
import {confirmAlert} from 'react-confirm-alert'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import './styles/alertPlanta.css'
import '../Pages/styles/Accion.css'
import { faPlusCircle} from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import {database} from 'firebase'
import {Button,Typography,Grow,IconButton} from '@material-ui/core'
import {AddCircleOutline} from '@material-ui/icons'
import {Link} from 'react-router-dom'
class CarouselPlantas extends Component{
    render(){
        return(
            <div className="container h-100 mt-2 mb-2 justify-content-center d-flex flex-column ">
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
                            <TarjetaPlanta
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
                            <Link to='/Nueva-Planta'>
                                <Button variant="contained" color="primary">
                                    Agrega una! <FontAwesomeIcon icon={faPlusCircle} className='alert-icon ml-2'/>
                                </Button>
                            </Link>
                        </div>
                    }
                    <div className="col-auto">
                        <Grow in={true}
                        {...(true ? { timeout: 1500 } : {})}>
                            <Link to='/Nueva-Planta'>
                                <IconButton
                                    variant="contained"
                                    color="primary"
                                >
                                    <AddCircleOutline />
                                </IconButton>
                            </Link>
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