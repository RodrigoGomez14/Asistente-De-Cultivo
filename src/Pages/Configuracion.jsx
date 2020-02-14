import React, { useState } from 'react'
import {Layout} from './Layout'
import {connect} from 'react-redux'
import {ListConfig} from '../components/ListConfig'
import {database}from 'firebase'
import {makeStyles,Paper} from '@material-ui/core'
const useStyles=makeStyles(theme=>({
    root:{
        height:'100%',
        width:'100%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'space.around',
        backgroundColor:theme.palette.type==='dark'?theme.palette.secondary.main:theme.palette.primary.dark,
        borderRadius:'0'
    }
}))
const Configuracion=(props)=>{
    let [switchModoOscuro,setSwitchModoOscuro]= useState(localStorage.getItem('theme')==='dark'?true:false)
    const setSwitchValue=value=>{
        setSwitchModoOscuro(value)
        if(!value){
            props.setTheme('light')
            localStorage.setItem('theme','light')
        }
        else{
            props.setTheme('dark')
            localStorage.setItem('theme','dark')
        }
    }
    const cambiarHoraDeInicio=horaDeInicio=>{
        database().ref().child(props.user).update({
            horaDeInicio:horaDeInicio
        })
    }
    const cambiarPeriodo=periodo=>{
        database().ref().child(props.user).update({
            periodo:periodo
        })
    }
    const cambiarCicloLuminico=cicloLuminico=>{
        database().ref().child(props.user).update({
            cicloLuminico:cicloLuminico
        })
    }
    const classes = useStyles()
    return(
        <Layout history={props.history} page='Configuracion' user={props.user}>
            <Paper className={classes.root}>
                <ListConfig 
                    switchValue={switchModoOscuro} 
                    setSwitchValue={setSwitchValue} 
                    horaDeInicio={props.horaDeInicio} 
                    cambiarHoraDeInicio={cambiarHoraDeInicio}
                    periodo={props.periodo} 
                    cambiarPeriodo={cambiarPeriodo}
                    cicloLuminico={props.cicloLuminico}
                    cambiarCicloLuminico={cambiarCicloLuminico}
                />
            </Paper>
        </Layout>
    )
}
const mapStateToProps = state=>({
    user:state.user,
    periodo:state.data.periodo,
    horaDeInicio:state.data.horaDeInicio,
    cicloLuminico:state.data.cicloLuminico
})
export default connect(mapStateToProps,null)(Configuracion)