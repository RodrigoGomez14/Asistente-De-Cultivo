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
import  {database,storage} from 'firebase'
import {Layout} from './Layout'
import {makeStyles,Paper,Input,Button, TextField} from '@material-ui/core'
import { Redirect } from 'react-router';
import moment from 'moment'


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
        await database().ref().child(props.user.uid).update({
            horaDeInicio: parseInt(horas)
        })
    }
    const cambiarHoraDeFinal=async ()=>{
        const horas = document.getElementById('inputHoras').value
        //const minutos = document.getElementById('inputMinutos').value
        await database().ref().child(props.user.uid).update({
            horaDeFinal: parseInt(horas)
        })
    }
    let [file,setFile]=useState(undefined)
    const subirImagen=(file)=>{

    } 
    
    if(!props.periodo||!props.horaDeInicio||!props.cicloLuminico){
        return(
            <Redirect to='/Configuracion'/>
        )
    }
    else{
        return(
            <Layout history={props.history} page="Armario" userVerification={props.user.emailVerified} user={props.user.uid}>
                <Paper className={classes.root}>
                    <BarraDeLuz periodo={props.periodo} horaDeInicio={props.horaDeInicio} cicloLuminico={props.cicloLuminico}/>
                    <CarouselPlantas history={props.history} periodo={props.periodo}/>
                </Paper>
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