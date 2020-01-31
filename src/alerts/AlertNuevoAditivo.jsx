import React ,{useState}from 'react'
import AlertNavBar from '../alert-components/AlertNavBar'
import {FormNuevoAditivo} from '../alert-components/FormNuevoAditivo'
import AlertBotoneraConfirmacion from '../alert-components/AlertBotoneraConfirmacion'
import {database} from 'firebase'
export const AlertNuevoAditivo = ({tipoDeAditivo,onClose,aditivos=[],aditivo}) =>{
    const [inputs,setInputs] = useState({})
    const [dosis,setDosis] = useState({})
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
        let newAditivos=aditivos
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
    const updateState=(valor,nombre,indexDosis)=>{
        console.log(valor)
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
    return(
        <div className="container-fluid alert d-flex flex-column justify-content-between h-100 overflow-auto">
            <AlertNavBar
                onClose={onClose}
                title={tipoDeAditivo}
            />
            <FormNuevoAditivo aditivo={aditivo} updateState={(valor,nombre,dosis)=>{
                updateState(valor,nombre,dosis)
            }}/>
            <AlertBotoneraConfirmacion cambiarHora={agregarAditivo} alertConfiguracion={onClose} />
        </div>
    )
}