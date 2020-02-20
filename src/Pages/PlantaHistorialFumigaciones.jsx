import React , {useState} from 'react'
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
const PlantaHistorialFumigaciones =(props)=>{
    let [expanded,setExpanded]= useState(false)

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const classes = useStyles()
    return(
        props.location.props?
            <Layout history={props.history} page={props.plantas[props.location.props.id].nombre+'/Fumigaciones'} plantaDelHistorial={true} plantaId={props.location.props.id} user={props.user}>
                <Paper elevation={3} className={classes.root}>
                    <div className="container-fluid overflow-auto pt-4">
                            {props.plantas[props.location.props.id].fumigaciones?
                                Object.keys(props.plantas[props.location.props.id].fumigaciones).reverse().map((id,i)=>(
                                    <AccionDetallada 
                                        handleChange={handleChange} 
                                        index={i} 
                                        plantaDelHistorial={true} 
                                        expanded={expanded} 
                                        user={props.user}
                                        index={i} 
                                        accion={props.plantas[props.location.props.id].fumigaciones[id]} 
                                        tipoDeAccion='fumigaciones' 
                                        idPlanta={props.location.props.id} 
                                        id={id} 
                                        key={id}/>
                                ))
                                :
                                <div className="row justify-content-center mt-4">
                                    <div className="col-auto">
                                        <h2 className='text-white'>Esta Planta aun no ha sido fumigada!</h2>
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
    user:state.user.uid,
    plantas:state.data.historial
})
export default connect(mapStateToProps,null)(PlantaHistorialFumigaciones)
