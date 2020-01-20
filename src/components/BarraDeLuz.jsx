import React, {Component} from 'react'
import moment from 'moment'
import {connect} from 'react-redux'
import FechaYHora from '../components/FechaYHora'



class BarraDeLuz extends Component{
    
    state={
        activo:0,
        faltante:undefined,
        transcurrido:undefined,
        lamparaEncendida:undefined,
        descanso:false
    }
    actualizarEstado =()=>{
        let transcurrido = this.calcularTranscurrido()
        const cicloLuminico = this.actualizarCicloLuminico()
        if(transcurrido.slice(0,2)>cicloLuminico){
            transcurrido = transcurrido.slice(0,2)-cicloLuminico+transcurrido.slice(2)
            this.setState({
                descanso:true
            })
        }
        else{
            this.setState({
                descanso:false
            })
        }
        this.setState({
            cicloLuminico: cicloLuminico,
            transcurrido: transcurrido,
            faltante:this.calcularFaltante()
        })
        return [transcurrido,cicloLuminico]
    }
    actualizarBarraDeProgreso=()=>{
        const elements=this.actualizarEstado()
        const barra = document.getElementById('barraLuz')
        barra.style.width=`${this.calcularEstadoDeBarra(elements[0],elements[1])}%`
    }
    componentDidMount(){
        const interval = setInterval(() => {
            this.actualizarBarraDeProgreso()
        }, 1000);
        this.actualizarBarraDeProgreso()
        this.actualizarEstado()
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
            const dif = this.props.horaDeInicio-this.props.horaDeFinal
            let time = undefined
            console.log(dif)
            dif<9?
                this.state.descanso?
                    time = moment().diff(moment(this.props.horaDeInicio,'h').add(1,'days'),'m')
                    :
                    time = moment().diff(moment(this.props.horaDeFinal,'h').add(1,'days'),'m')
                :
                this.state.descanso?
                    time = moment().diff(moment(this.props.horaDeInicio,'h'),'m')
                    :
                    time = moment().diff(moment(this.props.horaDeFinal,'h'),'m')
            const hours = parseInt(-time/60)
            const minutes = -time%60
            return `${hours<10? '0'+hours:hours}:${minutes<10? '0'+minutes:minutes}`
        }
        else{
            const dif = this.props.horaDeInicio-this.props.horaDeFinal
            let time = undefined
            console.log(dif)
            dif<9?
                this.state.descanso?
                    time = moment().diff(moment(this.props.horaDeInicio,'h').add(1,'days'),'m')
                    :
                    time = moment().diff(moment(this.props.horaDeFinal,'h'),'m')
                :
                this.state.descanso?
                    time = moment().diff(moment(this.props.horaDeInicio,'h'),'m')
                    :
                    time = moment().diff(moment(this.props.horaDeFinal,'h'),'m')
                    
                moment().diff(moment(this.props.horaDeInicio,'h').add(1,'days'),'m')
            const hours = parseInt(-time/60)
            const minutes = -time%60
            return `${hours<10? '0'+hours:hours}:${minutes<10? '0'+minutes:minutes} `
        }
    }
    calcularTranscurrido=()=>{
        if(this.props.horaDeFinal<=this.props.horaDeInicio){
            const time = moment(this.props.horaDeInicio,'h').diff(moment().add(1,'days'),'m')
            const hours = parseInt(-time/60)
            const minutes = -time%60
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
            <div className="container-fluid">
                <div className="row">
                    <div className="col-auto ml-auto mr-auto">
                        <FechaYHora/>
                    </div>
                </div>
                <div className="row mt-4 mb-4">
                    <div className="col text-center">
                        <h3>Periodo {this.props.periodo}</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col text-center">
                        <h3>Ciclo Luminico {this.state.cicloLuminico} Hs ({this.props.horaDeInicio}:00 - {this.props.horaDeFinal}:00)</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col text-center">
                        Transcurrido (Hs) {this.state.transcurrido}
                    </div>
                    <div className="col text-center">
                        Faltante (Hs) {this.state.faltante}
                    </div>
                </div>
                <div className="row">
                    {this.state.descanso?
                        <div className="col text-center">
                            <span className='badge badge-pill p-3 badge-dark'>
                                Descansando...
                            </span>
                        </div>
                        :
                        <div className="col text-center">
                            <span className='badge badge-pill p-3 badge-success'>
                                Creciendo...
                            </span>
                        </div>
                    }
                </div>
                <div className="row mt-4">
                    <div className="col-10 offset-1">
                        <div className="progress">
                            <div className={this.state.descanso?"progress-bar progress-bar-animated progress-bar-striped bg-dark": "progress-bar progress-bar-animated progress-bar-striped bg-success" } role="progressbar" id='barraLuz' aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
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