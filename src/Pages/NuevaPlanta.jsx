import React,{Component} from 'react'
import {Layout} from './Layout'
import { connect } from 'react-redux'
import {database} from 'firebase'
import moment from 'moment'
import {FormNuevaPlanta} from '../components/FormNuevaPlanta'
import addFile from '../images/addFile.svg'
import {makeStyles, Paper} from '@material-ui/core'
const useStyles = makeStyles(theme=>({
    root:{
        height:'100%',
        width:'100%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-around',
        backgroundColor:theme.palette.type==='dark'?theme.palette.secondary.main:theme.palette.primary.dark,
        borderRadius:'0'
    }
}))

const  NuevaPlanta=(props)=>{
    const classes = useStyles()
    const guardarNuevaPlantaDB= async (nombre,genetica,inicioGerminacion,inicioVegetativo,inicioFloracion,volumenMaceta)=>{
        await database().ref().child(props.user).child('plantas').push({
            nombre:nombre,
            genetica:genetica?genetica:'Desconocida',
            volumenMaceta:volumenMaceta?volumenMaceta:null,
            nacimiento:inicioGerminacion?inicioGerminacion:null,
            inicioVegetativo:inicioVegetativo?inicioVegetativo:null,
            inicioFloracion:inicioFloracion?inicioFloracion:null
        })
        props.history.replace('/')
    }
    return(
        <Layout page='Nueva Planta' user={props.user} history={props.history}>
            <Paper elevation={3} className={classes.root}>
                <FormNuevaPlanta guardarNuevaPlantaDB={guardarNuevaPlantaDB} periodoArmario={props.periodo}/>
            </Paper>
        </Layout>
    )
}
const mapStateToProps=state=>({
    user:state.user.uid,
    periodo:state.data.periodo
})
export default connect(mapStateToProps,null)(NuevaPlanta)