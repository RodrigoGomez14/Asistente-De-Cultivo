import React , {useState} from 'react'
import {AccionDetallada} from '../components/AccionDetallada'
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
        borderRadius:'0',
        overflow:'auto'
    }
}))
export const PlantaPodas =(props)=>{
    let [expanded,setExpanded]= useState(false)

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const classes = useStyles()
    return(
        props.location.props?
            <Layout history={props.history} page={props.location.props.nombre+'/Podas'} planta={props.location.props} user={props.location.props.user}>
                <Paper elevation={3} className={classes.root}>
                    <div className="container-fluid overflow-auto pt-4">
                        {props.location.props.podas?
                            Object.keys(props.location.props.podas).reverse().map((id,i)=>(
                                <AccionDetallada user={props.location.props.user} index={i}  plantaDelHistorial={props.location.props.plantaDelHistorial} expanded={expanded} handleChange={handleChange} accion={props.location.props.podas[id]} tipoDePoda={props.location.props.podas[id].tipoDePoda}tipoDeAccion='podas' idPlanta={props.location.props.id} id={id} key={id}/>
                                ))
                                :
                                <>
                                <div className="row justify-content-center mt-4">
                                    <div className="col-auto">
                                        <h2 className='text-white'>Esta Planta no ha sido podada!</h2>
                                    </div>
                                </div>
                                {!props.location.props.plantaDelHistorial &&
                                    <div className="row justify-content-center mt-4">
                                        <div className="col-auto">
                                        <button type='button' className="btn btn-link" onClick={e=>{
                                            props.history.push('/Poda')
                                        }}>Podala Ahora!</button>
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
