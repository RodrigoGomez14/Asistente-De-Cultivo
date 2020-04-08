import React , {useState} from 'react'
import {AccionDetallada} from '../components/AccionDetallada'
import { Redirect } from 'react-router'
import {Layout} from './Layout'
import {makeStyles,Paper} from '@material-ui/core'
import {connect} from 'react-redux'
import { Timeline, TimelineItem }  from 'vertical-timeline-component-for-react';

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
            <Layout history={props.history} page={props.plantas[props.location.props.id].nombre+'/Transplantes'} plantaDelHistorial={true} plantaId={props.location.props.id} user={props.user.uid} userVerification={props.user.emailVerified}>
                <Paper elevation={3} className={classes.root}>
                    <div className="container-fluid overflow-auto pt-4 p-0">
                            {props.plantas[props.location.props.id].transplantes?
                                <Timeline lineColor={'#ddd'}>
                                    {Object.keys(props.plantas[props.location.props.id].transplantes).reverse().map((id,i)=>(
                                        <TimelineItem
                                            dateText={props.plantas[props.location.props.id].transplantes[id].fecha}
                                            dateInnerStyle={{ background: '#00796b', color: '#fff' }}
                                            key={`transplante${i}`}
                                        >
                                            <AccionDetallada 
                                                handleChange={handleChange} 
                                                index={i} 
                                                expanded={expanded} 
                                                plantaDelHistorial={false} 
                                                user={props.user.uid} 
                                                accion={props.plantas[props.location.props.id].transplantes[id]} 
                                                tipoDeAccion='transplantes' 
                                                idPlanta={props.location.props.id} 
                                                id={id} 
                                                key={id}
                                            />
                                        </TimelineItem>   
                                    ))}
                                </Timeline>
                                :
                                <div className="row justify-content-center mt-4">
                                    <div className="col-auto">
                                        <h2 className='text-white'>Esta Planta no ha sido transplantada!</h2>
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
export default connect(mapStateToProps,null)(PlantaHistorialTransplantes)