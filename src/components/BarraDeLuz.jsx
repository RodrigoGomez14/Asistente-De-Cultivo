import React, {useEffect,useState} from 'react'
import moment from 'moment'
import {connect} from 'react-redux'
import {FechaYHora} from '../components/FechaYHora'
import './styles/table.css'
import {Paper,Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import {Grow}from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop:theme.spacing(3),
        padding:theme.spacing(2),
        backgroundColor: theme.palette.primary.main,
    },
    text:{
        color: theme.palette.primary.contrastText
    }
}));

export const BarraDeLuz=(props)=>{
    let [activo,setActivo]=useState(0)
    let [faltante,setFaltante]=useState(undefined)
    let [transcurrido,setTranscurrido]=useState(undefined)
    let [lamparaEncendida,setLampraEncendida]=useState(undefined)
    let [descanso,setDesanso]=useState(undefined)
    let [cicloLuminico,setCicloLuminico]=useState(undefined)
    let [intervalo,setIntervalo]=useState(undefined)
    
    const actualizarEstado =(lamparaEncendida)=>{
        let transcurrido = calcularTranscurrido(lamparaEncendida)
        if(props.horaDeInicio>=props.horaDeFinal){
            //console.log(moment(props.horaDeInicio,'h').diff(moment(),'h'))
        }
        else{
            //console.log(-moment(props.horaDeInicio,'h').diff(moment(),'h'))
        }
        const cicloLuminico = actualizarCicloLuminico()
        if(transcurrido.slice(0,2)>cicloLuminico){
            transcurrido = transcurrido.slice(0,2)-cicloLuminico+transcurrido.slice(2)
            setDesanso(true)
        }
        else{
            setDesanso(false)
        }
        setTranscurrido(transcurrido)
        setFaltante(calcularFaltante())
        setCicloLuminico(cicloLuminico)
        return [transcurrido,cicloLuminico]
    }
    const actualizarBarraDeProgreso=()=>{
        const elements=actualizarEstado(calcularEstadoDeLampara())
        const barra = document.getElementById('barraLuz')
        barra.style.width=`${calcularEstadoDeBarra(elements[0],elements[1])}%`
    }
    const calcularEstadoDeLampara=()=>{
        const hour = moment().format('LT').slice(0,2)
        if(hour>=props.horaDeInicio && hour < props.horaDeFinal){
            return true
        }
        else{
            return false
        }
    }
   /* useEffect(()=>{
        actualizarBarraDeProgreso()
        const interval = setInterval(() => {
            actualizarBarraDeProgreso()
        }, 1000);
        setIntervalo(interval)
    })
    useEffect(()=>{
        clearInterval(intervalo)
    })*/
    const actualizarCicloLuminico=()=>{
        if(props.horaDeFinal<=props.horaDeInicio){
            return moment(props.horaDeFinal,'h').add(1,'days').diff(moment(props.horaDeInicio,'h'),'h')
            
        }
        else{
            return moment(props.horaDeFinal,'h').diff(moment(props.horaDeInicio,'h'),'h')
        }
    } 
    const calcularFaltante=()=>{
        if(props.horaDeFinal<=props.horaDeInicio){
            //const dif = props.horaDeInicio-props.horaDeFinal
            let time = undefined
            descanso?
                time = moment().diff(moment(props.horaDeInicio,'h'),'m')
                :
                time = moment().diff(moment(props.horaDeFinal,'h').add(1,'days'),'m')
            const hours = parseInt(-time/60)
            const minutes = -time%60
            //console.log(`faltante ${hours<10? '0'+hours:hours}:${minutes<10? '0'+minutes:minutes}`)
            return `${hours<10? '0'+hours:hours}:${minutes<10? '0'+minutes:minutes}`
        }
        else{
            //const dif = props.horaDeInicio-props.horaDeFinal
            let time = undefined
            descanso?
                time = -moment().diff(moment(props.horaDeInicio,'h'),'m')
                :
                time = moment().diff(moment(props.horaDeFinal,'h'),'m')
            const hours = parseInt(-time/60)
            const minutes = -time%60
            //console.log(` faltante ${hours<10? '0'+hours:hours}:${minutes<10? '0'+minutes:minutes}`)
            return `${hours<10? '0'+hours:hours}:${minutes<10? '0'+minutes:minutes} `
        }
    }
    const calcularTranscurrido=(lamparaEncendida)=>{
        if(props.horaDeFinal<=props.horaDeInicio){
            let time = undefined
            descanso?
                time = moment().diff(moment(props.hora,'h'),'m')
                :
                time = -moment().diff(moment(props.horaDeFinal,'h'),'m')
            const hours = parseInt(-time/60)
            const minutes = -time%60
            //console.log(`transcurrido ${hours<10? '0'+hours:hours}:${minutes<10? '0'+minutes:minutes}`)
            return `${hours<10? '0'+hours:hours}:${minutes<10? '0'+minutes:minutes}`
        }
        else{
            let time = undefined
            descanso?
                time = moment().diff(moment(props.horaDeInicio,'h').add(1,'days'),'m')
                :
                time = moment().diff(moment(props.horaDeFinal,'h').add(1,'days'),'m')
            const hours = parseInt(-time/60)
            const minutes = -time%60
            //console.log(` trasncurrido ${hours<10? '0'+hours:hours}:${minutes<10? '0'+minutes:minutes}`)
            return `${hours<10? '0'+hours:hours}:${minutes<10? '0'+minutes:minutes} `
    }
}
    const cambiarEstadoDeLampara=()=>{
        setLampraEncendida(!lamparaEncendida)
    }
    const calcularEstadoDeBarra=(transcurrido, cicloLuminico)=>{
        if(props.horaDeFinal<=props.horaDeInicio){
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
    const classes = useStyles()
    return(
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-8 offset-md-2">
                    <Grow in={true}
                    {...(true ? { timeout: 1500 } : {})}>
                        <Paper elevation={3} className={classes.paper}>
                            <div className="container">
                                <div className="row">
                                    <div className="col-auto ml-auto mr-auto">
                                        <FechaYHora/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col text-center">
                                        <Typography className={classes.text}>Periodo {props.periodo}</Typography>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col text-center">
                                        <Typography className={classes.text}>Ciclo Luminico {cicloLuminico} Hs ({props.horaDeInicio}:00 - {props.horaDeFinal}:00)</Typography>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col text-center">
                                        <Typography className={classes.text}>
                                            Transcurrido (Hs) {transcurrido}
                                        </Typography>
                                    </div>
                                    <div className="col text-center">
                                        <Typography className={classes.text}>
                                            Faltante (Hs) {faltante}
                                        </Typography>
                                    </div>
                                </div>
                                <div className="row">
                                    {descanso?
                                        <div className="col text-center">
                                            <span className='badge badge-pill p-3 badge-dark'>
                                                <Typography>
                                                    Descansando...
                                                </Typography>
                                            </span>
                                        </div>
                                        :
                                        <div className="col text-center">
                                            <span className='badge badge-pill p-3 badge-success'>
                                                <Typography>
                                                    Creciendo...
                                                </Typography>
                                            </span>
                                        </div>
                                    }
                                </div>
                                <div className="row mt-4">
                                    <div className="col-10 offset-1">
                                        <div className="progress">
                                            <div className={descanso?"progress-bar progress-bar-animated progress-bar-striped bg-dark": "progress-bar progress-bar-animated progress-bar-striped bg-success" } role="progressbar" id='barraLuz' aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Paper>
                    </Grow>
                </div>
            </div>
        </div>
    )
}