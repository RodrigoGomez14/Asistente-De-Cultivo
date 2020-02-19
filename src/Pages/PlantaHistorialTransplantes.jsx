import React , {useState,useEffect} from 'react'
import {AccionDetallada} from '../components/AccionDetallada'
import {Accordion} from 'react-bootstrap'
import { Redirect } from 'react-router'
import {Layout} from './Layout'
import {makeStyles,Paper} from '@material-ui/core'
import {connect} from 'react-redux'
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
const PlantaHistorialTransplantes =(props)=>{
    let [expanded,setExpanded]= useState(false)

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const classes = useStyles()
    return(
        props.location.props?
            <Layout history={props.history} page={props.plantas[props.location.props.id].nombre+'/Transplantes'} plantaDelHistorial={true} plantaId={props.location.props.id} user={props.user}>
                <Paper elevation={3} className={classes.root}>
                    <div className="container-fluid overflow-auto pt-4">
                            {props.plantas[props.location.props.id].transplantes?
                                Object.keys(props.plantas[props.location.props.id].transplantes).reverse().map((id,i)=>(
                                    <AccionDetallada 
                                        handleChange={handleChange} 
                                        index={i} 
                                        expanded={expanded} 
                                        plantaDelHistorial={true} 
                                        user={props.user} 
                                        accion={props.plantas[props.location.props.id].transplantes[id]} 
                                        tipoDeAccion='transplantes' 
                                        idPlanta={props.location.props.id} 
                                        id={id} 
                                        key={id}
                                    />
                                ))
                                :
                                <>
                                    <div className="row justify-content-center mt-4">
                                        <div className="col-auto">
                                            <h2 className='text-white'>Esta Planta no ha sido transplantada!</h2>
                                        </div>
                                    </div>
                                    {!props.location.props.plantaDelHistorial &&
                                        <div className="row justify-content-center mt-4">
                                            <div className="col-auto">
                                                <button type='button' className="btn btn-link" onClick={e=>{
                                                    props.history.push('/Transplante')
                                                }}>Transplatala Ahora!</button>
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
const mapStateToProps=state=>({
    user:state.user.uid,
    plantas:state.data.historial
})
export default connect(mapStateToProps,null)(PlantaHistorialTransplantes)