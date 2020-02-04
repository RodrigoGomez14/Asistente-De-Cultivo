import React , {Component} from 'react'
import AccionDetallada from '../alert-components/AccionDetallada'
import AlertNavBar from '../alert-components/AlertNavBar'
import BreadcrumbPlanta from '../alert-components/BreadcrumbPlanta'
import {Accordion} from 'react-bootstrap'
import { Redirect } from 'react-router'
import {Layout} from './Layout'
export const PlantaRiegos =(props)=>{
    return(
        props.location.props?
            <Layout history={props.history} page={props.location.props.nombrePlanta+'/Riegos'}>
                <div className="container-fluid overflow-auto pt-4">
                    <Accordion defaultActiveKey='0'>
                        {props.location.props.riegos?
                            Object.keys(props.location.props.riegos).reverse().map((id,i)=>(
                                <AccionDetallada user={props.location.props.user} index={i}  accion={props.location.props.riegos[id]} tipoDeAccion='riegos' idPlanta={props.location.props.idPlanta} id={id} key={id}/>
                                ))
                                :
                                <>
                                <div className="row justify-content-center mt-4">
                                    <div className="col-auto">
                                        <h2 className='text-white'>Esta Planta aun no ha sido regada!</h2>
                                    </div>
                                </div>
                                <div className="row justify-content-center mt-4">
                                    <div className="col-auto">
                                        <button type='button' className="btn btn-link" onClick={e=>{
                                            props.history.push('/Riego')
                                        }}>Riegala Ahora!</button>
                                    </div>
                                </div>
                            </>
                        }
                    </Accordion>
                </div>
            </Layout>
            :
            <Redirect to='/'/>
    )
}
