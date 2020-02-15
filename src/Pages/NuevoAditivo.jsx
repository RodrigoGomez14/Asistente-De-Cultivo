import React,{useState} from 'react'
import {Layout} from './Layout'
import { connect } from 'react-redux'
import {database} from 'firebase'
import moment from 'moment'
import addFile from '../images/addFile.svg'
import { FormNuevoAditivoCaracteristicas } from '../components/FormNuevoAditivoCaracteristicas'
import { FormNuevoAditivoDosificaciones } from '../components/FormNuevoAditivoDosificaciones'
import {Redirect} from 'react-router-dom'
import {makeStyles,Paper} from '@material-ui/core'
import {StepperAccion} from '../components/StepperAccion'
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


const NuevoAditivo=(props)=>{
    const [inputs,setInputs] = useState({})
    const [dosis,setDosis] = useState({})
    const classes = useStyles()
    const agregarAditivo= async ()=>{
        const {Riego,Foliar}=ClasificarDosis()
        const newAditivo= {
            nombre:inputs.nombre,
            marca:inputs.marca,
            descripcion:inputs.descripcion,
            dosis:{
                Tierra:Riego,
                Foliar:Foliar
            }
        }
        let newAditivos =[]
        if(props.location.props.tipoDeAditivo==='Fertilizantes'){
            if(props.fertilizantes){
                newAditivos=props.fertilizantes
            } 
        }
        else{
            if(props.insecticidas){
                newAditivos=props.insecticidas
            }
        }
        newAditivos.push(newAditivo)
        switch (props.location.props.tipoDeAditivo) {
            case 'Fertilizantes':
                await database().ref().child(props.user).update({
                    fertilizantes:newAditivos
                })
                props.history.goBack()
                break;
            case 'Insecticidas':
                await database().ref().child(props.user).update({
                    insecticidas:newAditivos
                })
                props.history.goBack()
                break;
            default:
                break;
        }
    }
    const updateState=(valor,nombre,indexDosis)=>{
        if(indexDosis){
            setDosis({
                ...dosis,
                [indexDosis]:{
                    ...dosis[indexDosis],
                    [nombre]:valor
                }
            })
        }
        else{
            setInputs({
                ...inputs,
                [nombre]:valor
            })
        }
    }
    const ClasificarDosis = ()=>{
        let Riego={}
        let Foliar={}
        Object.keys(dosis).map(newDosis=>{
            let tipoDeDosis= dosis[newDosis].tipoDeDosis?'gr/L':'ml/L'
            if(dosis[newDosis].tipoDeRiego==='Foliar'){
                Foliar={
                    ...Foliar,
                    [dosis[newDosis].etapa]:`${dosis[newDosis].cantidad} ${tipoDeDosis}`
                }
            }
            else{
                Riego={
                    ...Riego,
                    [dosis[newDosis].etapa]:`${dosis[newDosis].cantidad} ${tipoDeDosis}`
                }
            }
        })
        return{Riego,Foliar}
    }

    if(!props.location.props){
        return(
            <Redirect to='Aplicables'/>
        )
    }
    else{
        return(
            <Layout page='Nuevo Aditivo' user={props.user} history={props.history}>
                <StepperAccion
                confirmarAccion={agregarAditivo}
                tipoDeAccion='Nuevo Aditivo'
                steps={[
                    {
                        title:'Caracteristicas',
                        content:(
                            <FormNuevoAditivoCaracteristicas
                                updateState={updateState}
                            />
                        )
                    },
                    {
                        title:'Dosificaciones',
                        content:(
                            <FormNuevoAditivoDosificaciones
                                updateState={updateState} 
                            />
                        )
                    },
                    ]}
                />
            </Layout>
        )
    }
}
const mapStateToProps=state=>({
    user:state.user.uid,
    fertilizantes:state.data.fertilizantes,
    insecticidas:state.data.insecticidas
})
export default connect(mapStateToProps,null)(NuevoAditivo)