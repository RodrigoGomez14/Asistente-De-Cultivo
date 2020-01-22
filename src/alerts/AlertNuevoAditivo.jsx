import React ,{useState}from 'react'
import AlertNavBar from '../alert-components/AlertNavBar'
import {FormNuevoAditivo} from '../alert-components/FormNuevoAditivo'
import AlertBotoneraConfirmacion from '../alert-components/AlertBotoneraConfirmacion'
import {database} from 'firebase'
export const AlertNuevoAditivo = ({tipoDeAditivo,onClose,aditivos=[]}) =>{
    const [inputs,setInputs] = useState({})
    const ClasificarDosis = ()=>{
        const dosisArr = [inputs.dosis1,inputs.dosis2,inputs.dosis3,inputs.dosis4]
        let Riego={}
        let Foliar={}
        dosisArr.map(dosis=>{
            if(dosis){
                if(dosis.check){
                    Foliar={
                        ...Foliar,
                        [dosis.etapa]:dosis.cantidad
                    }
                }
                else{
                    Riego={
                        ...Riego,
                        [dosis.etapa]:dosis.cantidad
                    }
                }
            }
        })
        return{Riego,Foliar}
    }
    const agregarAditivo= async ()=>{
        const {Riego,Foliar}=ClasificarDosis()
        console.log(Riego,Foliar)
        const newAditivo= {
            nombre:inputs.nombre,
            marca:inputs.marca,
            descripcion:inputs.descripcion,
            dosis:{
                Riego:Riego,
                Foliar:Foliar
            }
        }
        const newAditivos=aditivos
        newAditivos.push(newAditivo)
        switch (tipoDeAditivo) {
            case 'Fertilizantes':
                await database().ref().update({
                    fertilizantes:newAditivos
                })
                break;
            case 'Insecticidas':
                await database().ref().update({
                    insecticidas:newAditivos
                })
                break;
            default:
                break;
        }
    }
    const updateState=(valor,nombre,dosis)=>{
        if(dosis){
            setInputs({
                ...inputs,
                [dosis]:{
                    ...inputs[dosis],
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
    return(
        <div className="container-fluid alert d-flex flex-column justify-content-between h-100">
            <AlertNavBar
                onClose={onClose}
                title={tipoDeAditivo}
            />
            <FormNuevoAditivo updateState={(valor,nombre,dosis)=>{
                updateState(valor,nombre,dosis)
            }}/>
            <AlertBotoneraConfirmacion cambiarHora={agregarAditivo} alertConfiguracion={onClose} />
        </div>
    )
}