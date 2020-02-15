import React,{useState} from 'react'
import {Layout} from './Layout'
import { connect } from 'react-redux'
import {database} from 'firebase'
import moment from 'moment'
import {FormCaracteristicasNuevaPlanta} from '../components/FormCaracteristicasNuevaPlanta'
import {FormEtapaNuevaPlanta} from '../components/FormEtapaNuevaPlanta'
import addFile from '../images/addFile.svg'
import {makeStyles, Paper} from '@material-ui/core'
import {StepperAccion} from '../components/StepperAccion'
import {ResumenNuevaPlanta} from '../components/ResumenNuevaPlanta'
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
const getFullDate=()=>{
    const date = new Date
    const year = date.getFullYear()
    let month = date.getMonth()+1
    month = month<10?month=`0${month}`:month
    const days = date.getDate()
    return`${days}/${month}/${year}`
}
const  NuevaPlanta=(props)=>{
    const classes = useStyles()
    let [nombre,setNombre]=useState(undefined)
    let [genetica,setGenetica]=useState(undefined)
    let [etapa,setEtapa]=useState(undefined)
    let [volumenMaceta,setVolumenMaceta]= useState(undefined)
    let [inicioGerminacion,setInicioGerminacion]= useState(getFullDate())
    let [inicioVegetativo,setInicioVegetativo]= useState(undefined)
    let [inicioFloracion,setInicioFloracion]= useState(undefined)
    const guardarNuevaPlantaDB= async ()=>{
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
        <Layout history={props.history} page='Nueva Planta' user={props.user}>
            <StepperAccion
                tipoDeAccion='Nueva Planta'
                confirmarAccion={guardarNuevaPlantaDB}
                etapa={etapa}
                steps={[
                    {
                        title:'Caracteristicas',
                        content:(
                            <FormCaracteristicasNuevaPlanta 
                                nombre={nombre} 
                                genetica={genetica} 
                                etapa={etapa}
                                setNombre={setNombre}
                                setGenetica={setGenetica} 
                                setEtapa={setEtapa}
                                volumenMaceta={volumenMaceta}
                                setVolumenMaceta={setVolumenMaceta}
                                periodoArmario={props.periodo}
                                getFullDate={getFullDate}
                                setInicioGerminacion={setInicioGerminacion}
                            />
                        )
                    },
                    {
                        title:'Inicio de Etapas',
                        content:(
                            <FormEtapaNuevaPlanta
                                inicioGerminacion={inicioGerminacion}
                                inicioVegetativo={inicioVegetativo}
                                inicioFloracion={inicioFloracion}
                                setInicioGerminacion={setInicioGerminacion}
                                setInicioVegetativo={setInicioVegetativo}
                                setInicioFloracion={setInicioFloracion}
                                etapa={etapa}
                                getFullDate={getFullDate}
                                periodoArmario={props.periodo}
                            />
                        )
                    },
                ]}
            />
        </Layout>
    )
}
const mapStateToProps=state=>({
    user:state.user.uid,
    periodo:state.data.periodo
})
export default connect(mapStateToProps,null)(NuevaPlanta)