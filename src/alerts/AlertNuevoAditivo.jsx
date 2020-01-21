import React from 'react'
import AlertNavBar from '../alert-components/AlertNavBar'
import {FormNuevoAditivo} from '../alert-components/FormNuevoAditivo'
import AlertBotoneraConfirmacion from '../alert-components/AlertBotoneraConfirmacion'
export const AlertNuevoAditivo = ({tipoDeAditivo,onClose}) =>{
    const agregarAditivo=()=>{
        const nombre = document.getElementById('nombre').value
        const marca = document.getElementById('marca').value
        const descripcion = document.getElementById('descripcion').value
        const etapa1 = document.getElementById('etapa1').value
        const cantidad1 = document.getElementById('cantidad1').value
        const etapa2 = document.getElementById('etapa2').value
        const cantidad2 = document.getElementById('cantidad2').value
        const etapa3 = document.getElementById('etapa3').value
        const cantidad3 = document.getElementById('cantidad3').value
        const etapa4 = document.getElementById('etapa4').value
        const cantidad4 = document.getElementById('cantidad4').value
        let foliar={

        }
        const checkboxes = [
            document.getElementById('checkbox1').value,
            document.getElementById('checkbox2').value,
            document.getElementById('checkbox3').value,
            document.getElementById('checkbox4').value,
        ]
        checkboxes.map((checkbox,i)=>{
            if(checkbox){
            }
        })
        const newAditivo= {
            nombre:nombre,
            marca:marca,
            descripcion:descripcion,
            dosis:{
                Riego:{
                    etapa1:cantidad1,
                    etapa2:cantidad2,
                    etapa3:cantidad3,
                    etapa4:cantidad4,
                }
            }
        }
        console.log(newAditivo)
    }
    return(
        <div className="container-fluid alert d-flex flex-column justify-content-between h-100">
            <AlertNavBar
                onClose={onClose}
                title={tipoDeAditivo}
            />
            <FormNuevoAditivo/>
            <AlertBotoneraConfirmacion cambiarHora={agregarAditivo} alertConfiguracion={onClose}/>
        </div>
    )
}