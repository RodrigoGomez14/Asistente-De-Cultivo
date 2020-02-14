import React , {useState} from 'react'
import {AccionDetallada} from '../alert-components/AccionDetallada'
import AlertNavBar from '../alert-components/AlertNavBar'
import BreadcrumbPlanta from '../alert-components/BreadcrumbPlanta'
import {Accordion} from 'react-bootstrap'
import { Redirect } from 'react-router'
import {Layout} from './Layout'
import {makeStyles,Paper} from '@material-ui/core'
const useStyles = makeStyles(theme=>({
    root:{
        height:'100%',
        width:'100%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-start',
        backgroundColor:theme.palette.type==='dark'?theme.palette.secondary.main:theme.palette.primary.dark,
        borderRadius:'0'
    }
}))
export const PlantaFumigaciones =(props)=>{
    let [expanded,setExpanded]= useState(false)

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const classes = useStyles()
    return(
        props.location.props?
            <Layout history={props.history} page={props.location.props.nombre+'/Fumigaciones'} planta={props.location.props} user={props.location.props.user}>
                <Paper elevation={3} className={classes.root}>
                    <div className="container-fluid overflow-auto pt-4">
                            {props.location.props.fumigaciones?
                                Object.keys(props.location.props.fumigaciones).reverse().map((id,i)=>(
                                    <AccionDetallada handleChange={handleChange} index={i} plantaDelHistorial={props.location.props.plantaDelHistorial} expanded={expanded} user={props.location.props.user}index={i} accion={props.location.props.fumigaciones[id]} tipoDeAccion='fumigaciones' idPlanta={props.location.props.id} id={id} key={id}/>
                                    ))
                                    :
                                    <>
                                    <div className="row justify-content-center mt-4">
                                        <div className="col-auto">
                                            <h2 className='text-white'>Esta Planta aun no ha sido fumigada!</h2>
                                        </div>
                                    </div>
                                    {!props.location.props.plantaDelHistorial &&
                                        <div className="row justify-content-center mt-4">
                                            <div className="col-auto">
                                            <button type='button' className="btn btn-link" onClick={e=>{
                                                    props.history.push('/Insecticida')
                                                }}>Fumigala Ahora!</button>
                                            </div>
                                        </div>
                                    }
                                </>
                            }
                    </div>
                </Paper>
            </Layout>
            :
            <Redirect to='/'/>
    )
}
