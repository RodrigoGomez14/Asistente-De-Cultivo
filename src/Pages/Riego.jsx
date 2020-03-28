import React, {Component} from 'react'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {connect} from 'react-redux'
import './styles/Accion.css'
import {database} from 'firebase'
import moment from 'moment'
import ElegirPlantaAccion from '../components/ElegirPlantaAccion';
import {ElegirTipoDeRiego} from '../components/ElegirTipoDeRiego';
import BotoneraConfirmacionAccion from '../components/BotoneraConfirmacionAccion';
import {FormularioAccion} from '../components/FormularioAccion';
import {Accordion} from 'react-bootstrap'
import {Layout} from './Layout'
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
        if(this.props.plantas){
            Object.keys(this.props.plantas).map(key=>(
                plantas.push(
                    {
                    selected:false,
                    nombre:this.props.plantas[key].nombre,
                    id:key
                    }
                )
            ))
        }
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
        await database().ref().child(this.props.user.uid).child('plantas').child(idPlanta).child('riegos').push({
            agua:agua,
            tipoDeRiego:tipoDeRiego,
            fecha:this.translateMonth(moment().format('LLL')),
            aditivos:fertilizantesFinal
        })
    }
    translateMonth=date=>{
        const month = date.slice(0,date.indexOf(' '))
        const newDate = date.slice(date.indexOf(' ')+1)
        switch (month) {
            case 'January':
                return `Enero ${newDate}`
                break;
            case 'February':
                return `Febrero ${newDate}`
                break;
            case 'March':
                return `Marzo ${newDate}`
                break;
            case 'April':
                return `Abril ${newDate}`
                break;
            case 'May':
                return `Mayo ${newDate}`
                break;
            case 'June':
                return `Junio ${newDate}`
                break;
            case 'July':
                return `Julio ${newDate}`
                break;
            case 'August':
                return `Agosto ${newDate}`
                break;
            case 'September':
                return `Septiembre ${newDate}`
                break;
            case 'October':
                return `Octubre ${newDate}`
                break;
            case 'November':
                return `Noviembre ${newDate}`
                break;
            case 'December':
                return `Diciembre ${newDate}`
                break;
            default:
            break;
        }
        return date
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
        let selectedPlants=[]
        if(this.state.plantas){
            this.state.plantas.map(planta=>(
                planta.selected?
                    selectedPlants.push(planta.nombre)
                    :
                    null
            ))
        }
        return(
        <Layout history={this.props.history} page='Riego' user={this.props.user.uid} userVerification={this.props.user.emailVerified}>
            <StepperAccion 
                step1='Plantas'
                step2='Tipo De Riego'
                step3='Cantidad de agua y aditivos'
                selectedPlants={selectedPlants}
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
        </Layout>
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