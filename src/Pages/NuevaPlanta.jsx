import React,{useState} from 'react'
import {Layout} from './Layout'
import { connect } from 'react-redux'
import {database} from 'firebase'
import {FormCaracteristicasNuevaPlanta} from '../components/FormCaracteristicasNuevaPlanta'
import {FormEtapaNuevaPlanta} from '../components/FormEtapaNuevaPlanta'
import {StepperAccion} from '../components/StepperAccion'

const getFullDate=()=>{
    const date = new Date()
    const year = date.getFullYear()
    let month = date.getMonth()+1
    month = month<10?month=`0${month}`:month
    const days = date.getDate()
    return`${days>=10?days:`0${days}`}/${month}/${year}`
}
const convertirFecha=fecha=>{
    const year = fecha.slice(0,fecha.indexOf('-'))
    const month=fecha.slice(fecha.indexOf('-')+1,fecha.lastIndexOf('-'))
    const day=fecha.slice(fecha.lastIndexOf('-')+1)
    return `${day}/${month}/${year}`
}
const  NuevaPlanta=(props)=>{
    let [nombre,setNombre]=useState(undefined)
    let [genetica,setGenetica]=useState(undefined)
    let [etapa,setEtapa]=useState(undefined)
    let [volumenMaceta,setVolumenMaceta]= useState(undefined)
    let [inicioGerminacion,setInicioGerminacion]= useState(getFullDate())
    let [inicioVegetativo,setInicioVegetativo]= useState(undefined)
    let [inicioFloracion,setInicioFloracion]= useState(undefined)
    
    const guardarNuevaPlantaDB= async ()=>{
        console.log(props.periodo==='Floracion'?'fecha':'nofecha')
        await database().ref().child(props.user.uid).child('plantas').push({
            nombre:nombre,
            genetica:genetica?genetica:'Desconocida',
            volumenMaceta:volumenMaceta?volumenMaceta:null,
            nacimiento:inicioGerminacion?convertirFecha(inicioGerminacion):null,
            inicioVegetativo:inicioVegetativo?convertirFecha(inicioVegetativo):null,
            inicioFloracion:inicioFloracion?convertirFecha(inicioFloracion):props.periodo==='Floracion'? getFullDate():null,
            inicioRevegetacion: props.periodo ==='Vegetativo' && etapa === 'Floracion' && getFullDate()
        })
        props.history.replace('/')
    }
    return(
        <Layout history={props.history} page='Nueva Planta' user={props.user.uid} userVerification={props.user.emailVerified}>
            <StepperAccion
                tipoDeAccion='Nueva Planta'
                confirmarAccion={guardarNuevaPlantaDB}
                nombre={nombre}
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
    user:state.user,
    periodo:state.data.periodo
})
export default connect(mapStateToProps,null)(NuevaPlanta)