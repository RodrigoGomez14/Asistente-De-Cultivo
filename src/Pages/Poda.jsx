import React, {Component} from 'react'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {connect} from 'react-redux'
import AlertConfirmarAccion from '../alerts/AlertConfirmarAccion'
import './styles/Accion.css'
import {database} from 'firebase'
import moment from 'moment'
import NavBarAccion from '../components/NavBarAccion'
import ElegirPlantaAccion from '../components/ElegirPlantaAccion';
import BotoneraConfirmacionAccion from '../components/BotoneraConfirmacionAccion';
import ElegirTipoDePoda from '../components/ElegirTipoDePoda';
import { Accordion } from 'react-bootstrap';

class Poda extends Component{
    state={
        plantas:undefined,
        tipoDePoda:undefined,
    }
    seleccionarPlanta=(id)=>{
        this.setState({
            plantas:{
                ...this.state.plantas,
                [id]:{
                    ...this.state.plantas[id],
                    selected:!this.state.plantas[id].selected,
                }
            }
        })
    }
    componentDidMount(){
        let plantas={}
        Object.keys(this.props.plantas).map(key=>(
            plantas={
                ...plantas,
                [key]:{
                    selected:false,
                    nombre:this.props.plantas[key].nombre
                },
            }
        ))
        this.setState({
            plantas:plantas
        })
    }
    confirmarAccion=(accion)=>confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <div className='custom-ui'>
                    <AlertConfirmarAccion
                        history={this.props.history}
                        onClose={onClose}
                        accion={accion}
                        accionfn={this.podar}
                    />
                </div>
            );
        }
    })
    podar=()=>{
        Object.keys(this.state.plantas).map(planta=>{
            if(this.state.plantas[planta].selected){
                this.guardarPodaBD(planta)
            }
            return null
        })
    }
    guardarPodaBD= async (idPlanta)=>{
        await database().ref().child('plantas').child(idPlanta).child('podas').push({
            fecha:moment().format('LLL'),
            tipoDePoda:this.state.tipoDePoda
        })
    }
    cambiarTipoDePoda=(nuevoTipoDePoda)=>{
        this.setState({
            tipoDePoda:nuevoTipoDePoda
        })
    }
    render(){
        return(
            <div className="container-fluid accion">
                <NavBarAccion
                    title='Poda'
                />
                <div className="container-fluid d-flex flex-column justify-content-start h-100">
                    <Accordion defaultActiveKey='0'>
                        <ElegirPlantaAccion
                            seleccionarPlanta={this.seleccionarPlanta}
                            plantas={this.state.plantas}
                        />
                        <ElegirTipoDePoda
                            handleChange={(nuevoTipoDePoda=>{
                                this.cambiarTipoDePoda(nuevoTipoDePoda)
                            })}
                            tipoDePoda={this.state.tipoDePoda}
                        />
                    </Accordion>
                </div>
                <BotoneraConfirmacionAccion
                    accion='Poda'
                    confirmarAccion={this.confirmarAccion}
                />
            </div>
        )
    }
}
const mapStateToProps = state=>{
    return{
        plantas:state.plantas,
    }
}
export default connect(mapStateToProps,null)(Poda)