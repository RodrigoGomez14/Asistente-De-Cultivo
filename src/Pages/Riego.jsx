import React, {Component} from 'react'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import AlertConfirmarAccion from '../alerts/AlertConfirmarAccion'
import {connect} from 'react-redux'
import './styles/Accion.css'
import {database} from 'firebase'
import moment from 'moment'
import NavBarAccion from '../components/NavBarAccion'
import ElegirPlantaAccion from '../components/ElegirPlantaAccion';
import {ElegirTipoDeRiego} from '../components/ElegirTipoDeRiego';
import BotoneraConfirmacionAccion from '../components/BotoneraConfirmacionAccion';
import {FormularioAccion} from '../components/FormularioAccion';
import {Accordion} from 'react-bootstrap'
import {ResumenAccion} from '../components/ResumenAccion'

import {StepperAccion} from '../components/StepperAccion'
class Riego extends Component{
    state={
        tipoDeRiego:undefined,
        cantidadDeAgua:undefined,
        plantas: [],
        expanded:'panel1',
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
        this.regar()
        this.props.history.push('/')
    }
    regar=()=>{
        this.state.plantas.map(planta=>{
            if(planta.selected){
                this.guardarRiegoBD(planta.id,this.state.cantidadDeAgua,this.state.tipoDeRiego,this.state.aditivos)
            }
            return null
        })
    }
    guardarRiegoBD= async (idPlanta,agua,tipoDeRiego,fertilizantes)=>{
        let fertilizantesFinal = {}
        if(fertilizantes){
            Object.keys(fertilizantes).map(fertilizante=>{
                const dosis= fertilizantes[fertilizante]
                fertilizantesFinal={
                    ...fertilizantesFinal,
                    [fertilizante]:parseFloat(dosis.slice(0,dosis.indexOf(' '))*this.state.cantidadDeAgua).toFixed(2)
                }
                return null
            })
        }
        await database().ref().child(this.props.user).child('plantas').child(idPlanta).child('riegos').push({
            agua:agua,
            tipoDeRiego:tipoDeRiego,
            fecha:moment().format('LLL'),
            aditivos:fertilizantesFinal
        })
    }
    cambiarTipoDeRiego=(tipoDeRiego)=>{
        this.setState({
            tipoDeRiego:tipoDeRiego
        })
        
    }
    cambiarLitrosDeAgua=(litros)=>{
        this.setState({
            cantidadDeAgua:litros
        })
    }
    cambiarAditivo=(fertilizante,cantidad)=>{
        this.setState({
            aditivos:{...this.state.aditivos,[fertilizante]:cantidad}
        })
    }
    eliminarListaDeAditivos=()=>{
        this.setState({aditivos:undefined})
    }
    eliminarAditivo=(fertilizante)=>{
        let newAditivos = this.state.aditivos
        delete newAditivos[fertilizante]
        if(Object.keys(newAditivos).length){
            this.setState({aditivos:newAditivos})
        }
        else{
            this.setState({aditivos:null})
        }
    }
    setExpansionExpanded=(panel)=>{
        this.setState({expanded:panel})
    }
    render(){
        return(
            <div className="container-fluid accion">
                <NavBarAccion
                    title='Riego'
                />
                <StepperAccion 
                    step1='Plantas'
                    step2='Tipo De Riego'
                    step3='Cantidad de agua y aditivos'
                    cantidadDeAgua={this.state.cantidadDeAgua}
                    tipoDeRiego={this.state.tipoDeRiego}
                    confirmarAccion={this.confirmarAccion}
                    resumenAccion={<ResumenAccion plantas={this.state.plantas} tipoDeRiego={this.state.tipoDeRiego} cantidadDeAgua={this.state.cantidadDeAgua} aditivos={this.state.aditivos}/>}
                    tipoDeAccion='Riego'
                    steps={[
                            {
                            title:'Plantas',
                            content:(
                                <ElegirPlantaAccion
                                    seleccionarPlanta={this.seleccionarPlanta}
                                    plantas={this.state.plantas}
                                    setExpansionExpanded={this.setExpansionExpanded}
                                    expanded={this.state.expanded}
                                />
                            )},
                            {title:'Tipo De Riego',
                            content:(
                                <ElegirTipoDeRiego
                                    tipoDeRiego={this.state.tipoDeRiego}    
                                    cambiarTipoDeRiego={this.cambiarTipoDeRiego}
                                    setExpansionExpanded={this.setExpansionExpanded}
                                    expanded={this.state.expanded}
                                />
                            )},
                            {title:'Cantidad De Agua y Aditivos',
                            content:(
                                <FormularioAccion
                                        eliminarListaDeAditivos={this.eliminarListaDeAditivos}
                                        tipoDeRiego={this.state.tipoDeRiego}
                                        cambiarLitrosDeAgua={this.cambiarLitrosDeAgua}
                                        cantidadDeAgua={this.state.cantidadDeAgua}
                                        cambiarAditivo={this.cambiarAditivo}
                                        adivito='Fertlizante'
                                        aditivos={this.props.aditivos}
                                        aditivosUsados={this.state.aditivos}
                                        eliminarAditivo={this.eliminarAditivo}
                                        setExpansionExpanded={this.setExpansionExpanded}
                                        expanded={this.state.expanded}
                                    />
                            )},
                    ]}
                />
            </div>
        )
    }
}
const mapStateToProps = state=>{
    return{
        user:state.user,
        plantas:state.data.plantas,
        aditivos:state.data.fertilizantes
    }
}
export default connect(mapStateToProps,null)(Riego)