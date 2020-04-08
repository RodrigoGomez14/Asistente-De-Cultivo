import React, {Component} from 'react'
import {Layout} from './Layout'
import {connect } from 'react-redux'
import {StepperAccion} from '../components/StepperAccion'
import {ElegirPlantaAccion} from '../components/ElegirPlantaAccion'
import {ElegirNuevaMaceta} from '../components/ElegirNuevaMaceta'
import {ResumenAccion} from '../components/ResumenAccion'
import {database} from 'firebase'
import moment from 'moment'
 class Transplante extends Component{
    state={
        tipoDeRiego:undefined,
        cantidadDeAgua:undefined,
        plantas: [],
        expanded:'panel1',
        nuevaMaceta:undefined,
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
        this.transplantar()
        this.props.history.push('/')
    }
    setExpansionExpanded=(panel)=>{
        this.setState({expanded:panel})
    }
    setNuevaMaceta=(nuevoVolumen)=>{
        this.setState({nuevaMaceta:nuevoVolumen})
    }
    transplantar=()=>{
        this.state.plantas.map(planta=>{
            if(planta.selected){
                this.guardarTransplanteDB(planta.id,this.state.nuevaMaceta)
            }
            return null
        })
    }
    guardarTransplanteDB= async (idPlanta,nuevoVolumen)=>{
        await database().ref().child(this.props.user.uid).child('plantas').child(idPlanta).child('transplantes').push({
            volumenMaceta:nuevoVolumen,
            fecha:this.translateMonth(moment().format('LLL')),
        })
        await database().ref().child(this.props.user.uid).child('plantas').child(idPlanta).update({
            volumenMaceta:nuevoVolumen,
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
        <Layout history={this.props.history} page='Transplante' user={this.props.user.uid} userVerification={this.props.user.emailVerified}>
            <div className="container-fluid overflow-auto h-100">
                <div className="row h-100">
                    <div className="col-12 px-0">
                        <StepperAccion 
                            step1='Plantas'
                            step2='Nuevo Volumen de tierra'
                            selectedPlants={selectedPlants}
                            confirmarAccion={this.confirmarAccion}
                            nuevaMaceta={this.state.nuevaMaceta}
                            resumenAccion={<ResumenAccion plantas={this.state.plantas} nuevaMaceta={this.state.nuevaMaceta}/>}
                            tipoDeAccion='Transplante'
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
                                    {
                                    title:'Nuevo Volumen de tierra',
                                    content:(
                                        <ElegirNuevaMaceta
                                            handleChange={this.setNuevaMaceta}
                                            nuevoVolumen={this.state.nuevaMaceta}
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
 const mapStateToProps=state=>({
     user:state.user,
     plantas:state.data.plantas,

 })
 export default connect(mapStateToProps,null)(Transplante)