import React, {Component} from 'react'
import {connect} from 'react-redux'
import './styles/Accion.css'
import {database} from 'firebase'
import moment from 'moment'
import ElegirPlantaAccion from '../components/ElegirPlantaAccion'
import {ElegirTipoDeRiego} from '../components/ElegirTipoDeRiego';
import {FormularioAccion} from '../components/FormularioAccion'
import { StepperAccion } from '../components/StepperAccion';
import {ResumenAccion} from '../components/ResumenAccion'
import {Layout} from './Layout'

class Insecticida extends Component{
    state={
        tipoDeRiego:undefined,
        cantidadDeAgua:undefined,
        ph:undefined,
        plantas:[],
        expanded:'panel1'
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
        this.fumigar()
        this.props.history.push('/')
    }
    fumigar=()=>{
        this.state.plantas.map(planta=>{
            if(planta.selected){
                this.guardrarFumigacionDB(planta.id,this.state.cantidadDeAgua,this.state.cantidadDeAgua,this.state.aditivos,this.state.tipoDeRiego)
            }
            return null
        })
    }
    guardrarFumigacionDB= async (idPlanta,agua,cantidadDeAgua,insecticidas,tipoDeRiego)=>{
        let insecticidasFinal = {}
        if(insecticidas){
            Object.keys(insecticidas).map(insecticida=>{
                const dosis= insecticidas[insecticida]
                insecticidasFinal={
                    ...insecticidasFinal,
                    [insecticida]:parseFloat(dosis.slice(0,dosis.indexOf(' '))*this.state.cantidadDeAgua).toFixed(2)
                }
                return null
            })
        }
        await database().ref().child(this.props.user.uid).child('plantas').child(idPlanta).child('fumigaciones').push({
            agua:agua,
            cantidadDeAgua:cantidadDeAgua,
            ph:this.state.ph?this.state.ph:null,
            fecha:this.translateMonth(moment().format('LLL')),
            aditivos:insecticidasFinal,
            tipoDeRiego:tipoDeRiego
        })
    }
    translateMonth=date=>{
        const month = date.slice(0,date.indexOf(' '))
        const newDate = date.slice(date.indexOf(' ')+1)
        switch (month) {
            case 'January':
                return `Enero ${newDate}`
            case 'February':
                return `Febrero ${newDate}`
            case 'March':
                return `Marzo ${newDate}`
            case 'April':
                return `Abril ${newDate}`
            case 'May':
                return `Mayo ${newDate}`
            case 'June':
                return `Junio ${newDate}`
            case 'July':
                return `Julio ${newDate}`
            case 'August':
                return `Agosto ${newDate}`
            case 'September':
                return `Septiembre ${newDate}`
            case 'October':
                return `Octubre ${newDate}`
            case 'November':
                return `Noviembre ${newDate}`
            case 'December':
                return `Diciembre ${newDate}`
            default:
                return false
        }
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
    eliminarListaDeAditivos=()=>{
        this.setState({aditivos:undefined})
    }
    setExpansionExpanded=(panel)=>{
        this.setState({expanded:panel})
    }
    cambiarph=(ph)=>{
        this.setState({ph:ph})
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
            <Layout history={this.props.history} page='Fumigacion' userVerification={this.props.user.emailVerified} user={this.props.user.uid}>
                <div className="container-fluid overflow-auto h-100">
                    <div className="row h-100">
                        <div className="col-12 px-0">
                            <StepperAccion 
                                cantidadDeAgua={this.state.cantidadDeAgua}
                                tipoDeRiego={this.state.tipoDeRiego}
                                confirmarAccion={this.confirmarAccion}
                                selectedPlants={selectedPlants}
                                resumenAccion={<ResumenAccion plantas={this.state.plantas} ph={this.state.ph} tipoDeRiego={this.state.tipoDeRiego} cantidadDeAgua={this.state.cantidadDeAgua} aditivos={this.state.aditivos}/>}
                                tipoDeAccion='Fumigacion'
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
                                            cambiarph={this.cambiarph}
                                            aditivo='Insecticida'
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
                    </div>
                </div>
            </Layout>
        )
    }
}
const mapStateToProps = state=>{
    return{
        user:state.user,
        plantas:state.data.plantas,
        aditivos:state.data.insecticidas,
    }
}
export default connect(mapStateToProps,null)(Insecticida)