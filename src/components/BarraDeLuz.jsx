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
        backgroundColor: theme.palette.primary.dark,
    },
    text:{
        color: theme.palette.primary.contrastText
    }
}));

export const BarraDeLuz=(props)=>{
    let [activo,setActivo]=useState(0)
    let [faltante,setFaltante]=useState(undefined)
    let [horaDeFinal,setHoraDeFinal]=useState(undefined)
    let [transcurrido,setTranscurrido]=useState(undefined)
    let [lamparaEncendida,setLampraEncendida]=useState(undefined)
    let [cicloLuminico,setCicloLuminico]=useState(undefined)
    let [intervalo,setIntervalo]=useState(undefined)

    const getMinutes=(moment)=>{
        const date = new Date()
        const minutes= date.getMinutes()+date.getHours()*60
        return minutes
    }
    const actualizarEstadoDeLampara=(minutes)=>{
        if(props.horaDeInicio*60+props.cicloLuminico*60> minutes){
            setLampraEncendida(true)
        }
        else{
            setLampraEncendida(false)
        }
    }
    const actualizarTranscurrido=minutes=>{
        if(lamparaEncendida){
            setTranscurrido(minutes-(props.horaDeInicio*60))
        }
        else{
            setTranscurrido(minutes-((props.horaDeInicio+props.cicloLuminico)*60))
        }
    }
    const actualizarFaltante=minutes=>{
        if(lamparaEncendida){
            const diferencia = ((props.horaDeInicio+props.cicloLuminico)*60)-minutes
            setFaltante(diferencia)
        }
        else{
            const diferencia = ((props.horaDeInicio+24)*60)-minutes
            setFaltante(diferencia)
        }
    }
    const actualizarBarraDeEstado=()=>{
        const barra = document.getElementById('barraLuz')
        if(lamparaEncendida){
            const porcentaje = (transcurrido*100)/(props.cicloLuminico*60)
            barra.style.width=porcentaje+'%'
        }
        else{
            const porcentaje = (faltante*100)/(props.cicloLuminico+props.horaDeInicio*60)
            console.log(porcentaje)
            barra.style.width=porcentaje+'%'
        }
    }
    useEffect(()=>{
        const minutes= getMinutes()
        actualizarEstadoDeLampara(minutes)
        actualizarTranscurrido(minutes)
        actualizarFaltante(minutes)
        actualizarBarraDeEstado()
    })
    const calcularHoraFinal=()=>{
        let horaDeFinal = parseInt(props.horaDeInicio)+parseInt(props.cicloLuminico)
        if(horaDeFinal>24){
            horaDeFinal=horaDeFinal-24
            if(horaDeFinal<10){
                horaDeFinal='0'+horaDeFinal
            }
            return `${horaDeFinal}:00 +1`
        }
        else{
            if(horaDeFinal<10){
                horaDeFinal='0'+horaDeFinal
            }
            return `${horaDeFinal}:00`
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
                                        <Typography className={classes.text}>Ciclo Luminico {props.cicloLuminico} Hs ({props.horaDeInicio}:00 - {calcularHoraFinal()})</Typography>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col text-center">
                                        <Typography className={classes.text}>
                                            Transcurrido {` ${parseInt(transcurrido/60)<10? '0'+parseInt(transcurrido/60):parseInt(transcurrido/60) } : ${parseInt(transcurrido%60)<10? '0'+parseInt(transcurrido%60):parseInt(transcurrido%60)}`}
                                        </Typography>
                                    </div>
                                    <div className="col text-center">
                                        <Typography className={classes.text}>
                                            Faltante (Hs)  {` ${parseInt(faltante/60)<10? '0'+parseInt(faltante/60):parseInt(faltante/60) } : ${parseInt(faltante%60)<10? '0'+parseInt(faltante%60):parseInt(faltante%60)}`}
                                        </Typography>
                                    </div>
                                </div>
                                <div className="row">
                                    {!lamparaEncendida?
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
                                            <div className={!lamparaEncendida?"progress-bar progress-bar-animated progress-bar-striped bg-dark": "progress-bar progress-bar-animated progress-bar-striped bg-success" } role="progressbar" id='barraLuz' aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
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