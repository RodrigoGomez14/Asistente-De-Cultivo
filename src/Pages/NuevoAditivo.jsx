import React,{useState} from 'react'
import {Layout} from './Layout'
import { connect } from 'react-redux'
import {database} from 'firebase'
import { FormNuevoAditivoCaracteristicas } from '../components/FormNuevoAditivoCaracteristicas'
import { FormNuevoAditivoDosificaciones } from '../components/FormNuevoAditivoDosificaciones'
import {Redirect} from 'react-router-dom'
import {StepperAccion} from '../components/StepperAccion'


const NuevoAditivo=(props)=>{
    const [inputs,setInputs] = useState({})
    const [dosis,setDosis] = useState({})
    const agregarAditivo= async ()=>{
        const {Riego,Foliar}=ClasificarDosis()
        const newAditivo= {
            nombre:inputs.nombre,
            marca:inputs.marca?inputs.marca:null,
            descripcion:inputs.descripcion?inputs.descripcion:null,
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
                await database().ref().child(props.user.uid).update({
                    fertilizantes:newAditivos
                })
                props.history.goBack()
                break;
            case 'Insecticidas':
                await database().ref().child(props.user.uid).update({
                    insecticidas:newAditivos
                })
                props.history.goBack()
                break;
            default:
                break;
        }
    }
    const updateState=(valor,nombre,indexDosis)=>{
        setInputs({
            ...inputs,
            [nombre]:valor
        })
    }
    const ClasificarDosis = ()=>{
        let Riego={}
        let Foliar={}
        Object.keys(dosis).map(newDosis=>{
            if (dosis[newDosis].etapa && dosis[newDosis].cantidad && dosis[newDosis].tipoDeRiego && dosis[newDosis].tipoDeDosis){
                let tipoDeDosis= dosis[newDosis].tipoDeDosis===1?'gr/L':'ml/L'
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
            }
            return null
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
            <Layout page='Nuevo Aditivo' user={props.user.uid} userVerification={props.user.emailVerified} history={props.history}>
                <StepperAccion
                confirmarAccion={agregarAditivo}
                tipoDeAccion='Nuevo Aditivo'
                inputsAditivo={inputs}
                dosisAditivo={dosis}
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
                                dosis={dosis}
                                setDosis={setDosis}
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
    user:state.user,
    fertilizantes:state.data.fertilizantes,
    insecticidas:state.data.insecticidas
})
export default connect(mapStateToProps,null)(NuevoAditivo)