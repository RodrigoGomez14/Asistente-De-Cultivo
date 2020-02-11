import React , {useState,useEffect} from 'react'
import {AccionDetallada} from '../alert-components/AccionDetallada'
import AlertNavBar from '../alert-components/AlertNavBar'
import BreadcrumbPlanta from '../alert-components/BreadcrumbPlanta'
import {Accordion} from 'react-bootstrap'
import { Redirect } from 'react-router'
import {makeStyles} from '@material-ui/core';
import {Layout} from './Layout'

export const PlantaRiegos =(props)=>{
    let [expanded,setExpanded]= useState(false)

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    return(
        props.location.props?
            <Layout history={props.history} page={props.location.props.nombre+'/Riegos'} planta={props.location.props} user={props.location.props.user}>
                <div className="container-fluid overflow-auto pt-4">
                        {props.location.props.riegos?
                            Object.keys(props.location.props.riegos).reverse().map((id,i)=>(
                                <AccionDetallada handleChange={handleChange} index={i} expanded={expanded} plantaDelHistorial={props.location.props.plantaDelHistorial} user={props.location.props.user} accion={props.location.props.riegos[id]} tipoDeAccion='riegos' idPlanta={props.location.props.id} id={id} key={id}/>
                            ))
                            :
                            <>
                                <div className="row justify-content-center mt-4">
                                    <div className="col-auto">
                                        <h2 className='text-white'>Esta Planta no ha sido regada!</h2>
                                    </div>
                                </div>
                                {!props.location.props.plantaDelHistorial &&
                                    <div className="row justify-content-center mt-4">
                                        <div className="col-auto">
                                            <button type='button' className="btn btn-link" onClick={e=>{
                                                props.history.push('/Riego')
                                            }}>Riegala Ahora!</button>
                                        </div>
                                    </div>
                                }
                            </>
                        }
                </div>
            </Layout>
            :
            <Redirect to='/'/>
    )
}
