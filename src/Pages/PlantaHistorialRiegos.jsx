import React , {useState,useEffect} from 'react'
import {AccionDetallada} from '../components/AccionDetallada'
import {Accordion} from 'react-bootstrap'
import { Redirect } from 'react-router'
import {makeStyles,Paper} from '@material-ui/core';
import {Layout} from './Layout'
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
const PlantaHistorialRiegos =(props)=>{
    let [expanded,setExpanded]= useState(false)

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const classes = useStyles()
    return(
        props.location.props?
            <Layout history={props.history} page={props.plantas[props.location.props.id].nombre+'/Riegos'}  plantaDelHistorial={true} plantaId={props.location.props.id} user={props.user.uid} userVerification={props.user.emailVerified}>
                <Paper elevation={3} className={classes.root}>
                    <div className="container-fluid overflow-auto pt-4">
                            {props.plantas[props.location.props.id].riegos?
                                Object.keys(props.plantas[props.location.props.id].riegos).reverse().map((id,i)=>(
                                    <AccionDetallada 
                                        handleChange={handleChange} 
                                        index={i} 
                                        expanded={expanded} 
                                        plantaDelHistorial={true}
                                        user={props.user.uid} 
                                        accion={props.plantas[props.location.props.id].riegos[id]} 
                                        tipoDeAccion='riegos' 
                                        idPlanta={props.location.props.id} 
                                        id={id} 
                                        id={id}
                                    />
                                ))
                                :
                                <div className="row justify-content-center mt-4">
                                    <div className="col-auto">
                                        <h2 className='text-white'>Esta Planta no ha sido regada!</h2>
                                    </div>
                                </div>
                            }
                    </div>
                </Paper>
            </Layout>
            :
            <Redirect to='/'/>
    )
}
const mapStateToProps=state=>({
    user:state.user,
    plantas:state.data.historial
})
export default connect(mapStateToProps,null)(PlantaHistorialRiegos)
