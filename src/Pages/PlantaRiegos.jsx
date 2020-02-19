import React , {useState,useEffect} from 'react'
import {AccionDetallada} from '../components/AccionDetallada'
import {Accordion} from 'react-bootstrap'
import { Redirect } from 'react-router'
import {makeStyles,Paper} from '@material-ui/core';
import {Layout} from './Layout'
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
const PlantaRiegos =(props)=>{
    let [expanded,setExpanded]= useState(false)

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const classes = useStyles()
    return(
        props.location.props?
            <Layout history={props.history} page={props.plantas[props.location.props.id].nombre+'/Riegos'} plantaId={props.location.props.id} user={props.user}>
                <Paper elevation={3} className={classes.root}>
                    <div className="container-fluid overflow-auto pt-4">
                        {props.plantas[props.location.props.id].riegos?
                                <Timeline lineColor={'#ddd'}>
                                        {Object.keys(props.plantas[props.location.props.id].riegos).reverse().map((id,i)=>(
                                            <TimelineItem
                                            dateText="10/04/2009"
                                            dateInnerStyle={{ background: '#00796b', color: '#fff' }}
                                        >   
                                             <AccionDetallada 
                                                handleChange={handleChange} 
                                                index={i} 
                                                expanded={expanded} 
                                                plantaDelHistorial={false}
                                                user={props.user} 
                                                accion={props.plantas[props.location.props.id].riegos[id]} 
                                                tipoDeAccion='riegos' 
                                                idPlanta={props.location.props.id} 
                                                id={id} 
                                                id={id}
                                            />
                                        </TimelineItem>
                                        ))}
                                </Timeline>
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
                </Paper>
            </Layout>
            :
            <Redirect to='/'/>
    )
}
const mapStateToProps=state=>({
    user:state.user.uid,
    plantas:state.data.plantas
})
export default connect(mapStateToProps,null)(PlantaRiegos)
