import React, {Component} from 'react'
import moment from 'moment'
import {connect} from 'react-redux'
import * as firebase from 'firebase'


class BarraDeLuz extends Component{
    
    state={
        activo:0,
        faltante:undefined,
        transcurrido:undefined,
        lamparaEncendida:undefined
    }
    componentDidMount(){
        const interval = setInterval(() => {
            const cicloLuminico = this.actualizarCicloLuminico()
                const transcurrido = this.calcularTranscurrido()
                this.setState({
                    cicloLuminico:cicloLuminico,
                    transcurrido:transcurrido,
                    faltante:this.calcularFaltante()
                })
                const barra = document.getElementById('barraLuz')
                barra.style.width=`${this.calcularEstadoDeBarra(transcurrido,cicloLuminico)}%`
        }, 1000);
        this.setState({
            interval: interval
        })
    }
    componentWillUnmount(){
        clearInterval(this.state.interval)
    }
    actualizarCicloLuminico(){
        if(this.props.horaDeFinal<=this.props.horaDeInicio){
            return moment(this.props.horaDeFinal,'h').add(1,'days').diff(moment(this.props.horaDeInicio,'h'),'h')
            
        }
        else{
            return moment(this.props.horaDeFinal,'h').diff(moment(this.props.horaDeInicio,'h'),'h')
        }
    } 
    calcularFaltante=()=>{
        if(this.props.horaDeFinal<=this.props.horaDeInicio){
            const time = moment(this.props.horaDeFinal,'h').add(1,'days').diff(moment(),'m')
            const hours = parseInt(time/60)
            const minutes = time%60
            return `${hours<10? '0'+hours:hours}:${minutes<10? '0'+minutes:minutes}`
        }
        else{
            const time = moment(this.props.horaDeFinal,'h').diff(moment(),'m')
            const hours = parseInt(time/60)
            const minutes = time%60
            return `${hours<10? '0'+hours:hours}:${minutes<10? '0'+minutes:minutes} `
        }
    }
    calcularTranscurrido=()=>{
        if(this.props.horaDeFinal<=this.props.horaDeInicio){
            const time = moment().diff(moment(this.props.horaDeInicio,'h'),'m')
            const hours = parseInt(time/60)
            const minutes = time%60
            return `${hours<10? '0'+hours:hours}:${minutes<10? '0'+minutes:minutes}`
        }
        else{
            const time = moment().diff(moment(this.props.horaDeInicio,'h'),'m')
            const hours = parseInt(time/60)
            const minutes = time%60
            return `${hours<10? '0'+hours:hours}:${minutes<10? '0'+minutes:minutes}`
        }
    }
    cambiarEstadoDeLampara=()=>{
        this.setState({
            lamparaEncendida:!this.state.lamparaEncendida
        })
    }
    calcularEstadoDeBarra=(transcurrido, cicloLuminico)=>{
        if(this.props.horaDeFinal<=this.props.horaDeInicio){
            const horas = parseInt(transcurrido.slice(0,transcurrido.indexOf(':')))
            const minutos = horas*60 + parseInt(transcurrido.slice(transcurrido.indexOf(':')+1))
            return minutos/(cicloLuminico*60)*100
            
        }
        else{
            const horas = parseInt(transcurrido.slice(0,transcurrido.indexOf(':')))
            const minutos = horas*60 + parseInt(transcurrido.slice(transcurrido.indexOf(':')+1))
            return minutos/(cicloLuminico*60)*100
        }
    }
    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">
                        <h3>Periodo {this.props.periodo}</h3>
                    </div>
                    <div className="col-12 text-center">
                        <h3>Ciclo Luminico {this.state.cicloLuminico} Hs ({this.props.horaDeInicio}:00 - {this.props.horaDeFinal}:00)</h3>
                    </div>
                    <div className="col text-center">
                        Transcurrido (Hs) {this.state.transcurrido}
                    </div>
                    <div className="col text-center">
                        Faltante (Hs) {this.state.faltante}
                    </div>
                </div>
                <div className="row mt-2 mb-2">
                    <div className="col">
                        <div className="progress">
                            <div className="progress-bar bg-success progress-bar-animated progress-bar-striped" role="progressbar" id='barraLuz' aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps=state=>{
    return{
        periodo:state.periodo,
        horaDeInicio:state.horaDeInicio,
        horaDeFinal:state.horaDeFinal,
    }
}
export default connect(mapStateToProps,null)(BarraDeLuz)