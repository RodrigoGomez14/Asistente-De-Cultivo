import React, {Component} from 'react'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {connect} from 'react-redux'
import './styles/Accion.css'
import {database} from 'firebase'
import moment from 'moment'
import ElegirPlantaAccion from '../components/ElegirPlantaAccion';
import BotoneraConfirmacionAccion from '../components/BotoneraConfirmacionAccion';
import {ElegirTipoDePoda} from '../components/ElegirTipoDePoda';
import { StepperAccion } from '../components/StepperAccion';
import {ResumenAccion} from '../components/ResumenAccion'
import {Layout} from './Layout'


class Poda extends Component{
    state={
        plantas:undefined,
        tipoDePoda:undefined,
        descripcion:undefined,
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
        await database().ref().child(this.props.user.uid).child('plantas').child(idPlanta).child('podas').push({
            fecha:this.translateMonth(moment().format('LLL')),
            tipoDePoda:this.state.tipoDePoda,
            descripcion:this.state.descripcion
        })
    }
    cambiarTipoDePoda=(nuevoTipoDePoda)=>{
        this.setState({
            tipoDePoda:nuevoTipoDePoda
        })
    }
    cambiarDescripcion=(descripcion)=>{
        this.setState({
            descripcion:descripcion
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
            <Layout history={this.props.history} page='Poda' user={this.props.user.uid} userVerification={this.props.user.emailVerified}>
                <div className="container-fluid overflow-auto h-100 ">
                    <div className="row h-100">
                        <div className="col-12 px-0">
                            <StepperAccion 
                                cantidadDeAgua={this.state.cantidadDeAgua}
                                tipoDePoda={this.state.tipoDePoda}
                                confirmarAccion={this.confirmarAccion}
                                selectedPlants={selectedPlants}
                                resumenAccion={<ResumenAccion plantas={this.state.plantas} tipoDePoda={this.state.tipoDePoda} descripcion={this.state.descripcion}/>}
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
                                            handleChangeDescripcion={descripcion=>{
                                                this.cambiarDescripcion(descripcion)
                                            }}
                                            tipoDePoda={this.state.tipoDePoda}
                                        />
                                )}]
                                }
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
    }
}
export default connect(mapStateToProps,null)(Poda)