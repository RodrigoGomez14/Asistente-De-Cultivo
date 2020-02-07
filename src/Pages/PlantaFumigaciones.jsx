import React , {useState} from 'react'
import {AccionDetallada} from '../alert-components/AccionDetallada'
import AlertNavBar from '../alert-components/AlertNavBar'
import BreadcrumbPlanta from '../alert-components/BreadcrumbPlanta'
import {Accordion} from 'react-bootstrap'
import { Redirect } from 'react-router'
import {Layout} from './Layout'
export const PlantaFumigaciones =(props)=>{
    let [expanded,setExpanded]= useState(false)

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    return(
        props.location.props?
            <Layout history={props.history} page={props.location.props.nombre+'/Fumigaciones'} planta={props.location.props}>
                <div className="container-fluid overflow-auto pt-4">
                        {props.location.props.fumigaciones?
                            Object.keys(props.location.props.fumigaciones).reverse().map((id,i)=>(
                                <AccionDetallada handleChange={handleChange} index={i} expanded={expanded} user={props.location.props.user}index={i} accion={props.location.props.fumigaciones[id]} tipoDeAccion='fumigaciones' idPlanta={props.location.props.id} id={id} key={id}/>
                                ))
                                :
                                <>
                                <div className="row justify-content-center mt-4">
                                    <div className="col-auto">
                                        <h2 className='text-white'>Esta Planta aun no ha sido fumigada!</h2>
                                    </div>
                                </div>
                                <div className="row justify-content-center mt-4">
                                    <div className="col-auto">
                                    <button type='button' className="btn btn-link" onClick={e=>{
                                            props.history.push('/Insecticida')
                                        }}>Fumigala Ahora!</button>
                                    </div>
                                </div>
                            </>
                        }
                </div>
            </Layout>
            :
            <Redirect to='/'/>
    )
}
