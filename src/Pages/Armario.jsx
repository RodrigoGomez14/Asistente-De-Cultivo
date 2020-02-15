import React , {Component,useState} from 'react'
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
import {makeStyles,Paper} from '@material-ui/core'
import { Redirect } from 'react-router';

const useStyles=makeStyles(theme=>({
    root:{
        height:'100%',
        width:'100%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-start',
        backgroundColor:theme.palette.type==='dark'?theme.palette.secondary.main:theme.palette.primary.dark,
        borderRadius:'0',
        overflow:'auto',
        paddingBottom:theme.spacing(2)
    }
}))
const Armario=(props)=>{
    const classes = useStyles()
    const cambiarHoraDeInicio=async ()=>{
        const horas = document.getElementById('inputHoras').value
        //const minutos = document.getElementById('inputMinutos').value
        await database().ref().child(props.user).update({
            horaDeInicio: parseInt(horas)
        })
    }
    const cambiarHoraDeFinal=async ()=>{
        const horas = document.getElementById('inputHoras').value
        //const minutos = document.getElementById('inputMinutos').value
        await database().ref().child(props.user).update({
            horaDeFinal: parseInt(horas)
        })
    }
    if(!props.periodo||!props.horaDeInicio||!props.cicloLuminico){
        return(
            <Redirect to='/Configuracion'/>
        )
    }
    else{
        return(
            <Layout history={props.history} page="Armario" user={props.user}>
                <Paper className={classes.root}>
                    <BarraDeLuz periodo={props.periodo} horaDeInicio={props.horaDeInicio} cicloLuminico={props.cicloLuminico}/>
                    <CarouselPlantas history={props.history}/>
                </Paper>
            </Layout>
        )   
    }
}
const mapStateToProps = state =>{
    return{
        user:state.user.uid,
        plantas:state.data.plantas,
        periodo:state.data.periodo,
        horaDeInicio:state.data.horaDeInicio,
        cicloLuminico:state.data.cicloLuminico,
    }
}
export default connect(mapStateToProps,null)(Armario)