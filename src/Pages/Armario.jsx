import React , {Component} from 'react'
import CarouselPlantas from '../components/CarouselPlantas'
import {BarraDeLuz} from '../components/BarraDeLuz'
//import TemperaturaYHumedad from '../components/TemperaturaYHumedad'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../components/styles/alertPlanta.css'
import './styles/Accion.css'
import {connect} from 'react-redux'
import  {database} from 'firebase'
import {Layout} from './Layout'

class Armario extends Component{
    state={
        nuevoPeriodo:undefined,
        menuOpened:false,
        selectedTab:'recents'
    }
    cambioDePeriodo=async()=>{
        await database().ref().child(this.props.user).update({
            periodo:this.state.nuevoPeriodo
        })
    }
    cambiarHoraDeInicio=async ()=>{
        const horas = document.getElementById('inputHoras').value
        //const minutos = document.getElementById('inputMinutos').value
        await database().ref().child(this.props.user).update({
            horaDeInicio: parseInt(horas)
        })
    }
    cambiarHoraDeFinal=async ()=>{
        const horas = document.getElementById('inputHoras').value
        //const minutos = document.getElementById('inputMinutos').value
        await database().ref().child(this.props.user).update({
            horaDeFinal: parseInt(horas)
        })
    }
    render(){
        return(
            <Layout history={this.props.history} page="Armario" user={this.props.user}>
                <div className="container">
                    <div className="row">
                        <BarraDeLuz periodo={this.props.periodo} horaDeInicio={this.props.horaDeInicio} cicloLuminico={this.props.cicloLuminico}/>      
                    </div>
                </div>
                <CarouselPlantas history={this.props.history}/>
            </Layout>
        )
    }
}
const mapStateToProps = state =>{
    return{
        user:state.user,
        plantas:state.data.plantas,
        periodo:state.data.periodo,
        horaDeInicio:state.data.horaDeInicio,
        cicloLuminico:state.data.cicloLuminico,
    }
}
export default connect(mapStateToProps,null)(Armario)