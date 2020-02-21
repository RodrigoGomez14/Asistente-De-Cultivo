import React, {useEffect,useState} from 'react'
import moment from 'moment'
import {connect} from 'react-redux'
import {FechaYHora} from '../components/FechaYHora'
import './styles/table.css'
import {Paper,Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import {Grow}from '@material-ui/core'
import {TarjetaArmario} from '../components/TarjetaArmario'

const useStyles = makeStyles(theme => ({
    root:{
        width:'100%',
        padding:theme.spacing(2),  
    },
    text:{
        color: theme.palette.primary.contrastText
    },
    list:{
        justifyContent:'center',
        flexWrap:'nowrap',
        overflow:'auto'
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
        let minutoDeInicio = props.horaDeInicio*60
        let minutoFinal = minutoDeInicio+(props.cicloLuminico*60)
        if(minutoFinal>1440){
            if(minutes<minutoDeInicio){
                minutoFinal=minutoFinal-1440
                if(minutes<minutoFinal){
                    setLampraEncendida(true)
                }
                else{
                    setLampraEncendida(false)
                }
            }
            else{
                setLampraEncendida(true)
            }
        }
        else{
            if(minutoDeInicio < minutes && minutoFinal > minutes){
                setLampraEncendida(true)
            }
            else{
                setLampraEncendida(false)
            }
        }
    }
    const actualizarTranscurrido=minutes=>{

        let minutoDeInicio = props.horaDeInicio*60
        let minutoFinal = minutoDeInicio+(props.cicloLuminico*60)
        if(minutoFinal>1440){
            if(minutes<minutoDeInicio){
                minutoFinal=minutoFinal-1440
                if(minutes<minutoFinal){
                    console.log(minutes+(1440-minutoDeInicio))
                }
                else{
                    console.log(minutes-minutoFinal)
                }
            }
            else{
                console.log(minutes-minutoDeInicio)
            }
        }
        else{
            if(minutoDeInicio < minutes && minutoFinal > minutes){
                console.log(minutes-minutoDeInicio)
            }
            else{
                console.log(minutoFinal-minutes)
            }
        }


        if(lamparaEncendida){
            setTranscurrido(minutes-(props.horaDeInicio*60))
            console.log(minutes-(props.horaDeInicio*60))
        }
        else{
            if(props.horaDeInicio+props.cicloLuminico>24){
                setTranscurrido(minutes-((props.horaDeInicio+props.cicloLuminico-24)*60))
            }
            else{

            }
        }
    }
    const actualizarFaltante=minutes=>{
        if(lamparaEncendida){
            const diferencia = ((props.horaDeInicio+props.cicloLuminico)*60)-minutes
            setFaltante(diferencia)
        }
        else{
            if(props.horaDeInicio+props.cicloLuminico>24){
                const diferencia = ((props.horaDeInicio)*60)-minutes
                setFaltante(diferencia)
            }
            else{

            }
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
        <Grow in={true}
        {...(true ? { timeout: 1500 } : {})}>
            <div className={classes.root}>
                <div className="container">
                    <div className="row">
                        <div className="col-auto ml-auto mr-auto">
                            <FechaYHora/>
                        </div>
                    </div>
                    <div className="row">
                        {!lamparaEncendida?
                            <div className="col text-center">
                                <Typography variant='h6' className={classes.text}>
                                    Descansando...
                                </Typography>
                            </div>
                            :
                            <div className="col text-center">
                                <Typography variant ='h6' className={classes.text}>
                                    Creciendo...
                                </Typography>
                            </div>
                        }
                    </div>
                    <div className="row mt-4">
                        <div className="col-12">
                            <div className="progress">
                                <div className={!lamparaEncendida?"progress-bar progress-bar-animated progress-bar-striped bg-dark": "progress-bar progress-bar-animated progress-bar-striped bg-success" } role="progressbar" id='barraLuz' aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                    </div>
                    <div className="row flex-nowrap overflow-auto">
                        <TarjetaArmario periodo={props.periodo} horaDeInicio={props.horaDeInicio} cicloLuminico={props.cicloLuminico} />
                    </div>
                </div>
            </div>
        </Grow>
    )
}