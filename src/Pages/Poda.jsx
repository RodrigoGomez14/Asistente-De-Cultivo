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
import { StepperAccion } from '../components/StepperAccion';
import {ResumenAccion} from '../components/ResumenAccion'

class Poda extends Component{
    state={
        plantas:undefined,
        tipoDePoda:undefined,
        plantas:[],
    }
    seleccionarPlanta=(index)=>{
        let newSelectedPlants=this.state.plantas
        newSelectedPlants[index].selected=!newSelectedPlants[index].selected
        this.setState({
            plantas:newSelectedPlants
        })
    }
    componentDidMount(){
        let plantas=[]
        Object.keys(this.props.plantas).map(key=>(
            plantas.push(
                {
                selected:false,
                nombre:this.props.plantas[key].nombre,
                id:key
                }
            )
        ))
        this.setState({
            plantas:plantas
        })
    }
    confirmarAccion=()=>{
        this.podar()
        this.props.history.push('/')
    }
    podar=()=>{
        this.state.plantas.map(planta=>{
            if(planta.selected){
                console.log(planta)
                this.guardarPodaBD(planta.id)
            }
            return null
        })
    }
    guardarPodaBD= async (idPlanta)=>{
        await database().ref().child(this.props.user).child('plantas').child(idPlanta).child('podas').push({
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
                <StepperAccion 
                    cantidadDeAgua={this.state.cantidadDeAgua}
                    tipoDePoda={this.state.tipoDePoda}
                    confirmarAccion={this.confirmarAccion}
                    selectedPlants={this.state.plantas}
                    resumenAccion={<ResumenAccion plantas={this.state.plantas} tipoDePoda={this.state.tipoDePoda}/>}
                    tipoDeAccion='Poda'
                    steps={[
                    {
                        title:'Plantas',
                        content:(
                            <ElegirPlantaAccion
                                seleccionarPlanta={this.seleccionarPlanta}
                                plantas={this.state.plantas}
                            />
                        )},
                    {
                        title:'Tipo De Poda',
                        content:(
                            <ElegirTipoDePoda
                                handleChange={(nuevoTipoDePoda=>{
                                    this.cambiarTipoDePoda(nuevoTipoDePoda)
                                })}
                                tipoDePoda={this.state.tipoDePoda}
                            />
                    )}]
                    }
                />
            </div>
        )
    }
}
const mapStateToProps = state=>{
    return{
        user:state.user,
        plantas:state.data.plantas,
    }
}
export default connect(mapStateToProps,null)(Poda)