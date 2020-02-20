import React , {useState} from 'react'
import {AccionDetallada} from '../components/AccionDetallada'
import {Accordion} from 'react-bootstrap'
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
const PlantaPodas =(props)=>{
    let [expanded,setExpanded]= useState(false)

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const classes = useStyles()
    return(
        props.location.props?
            <Layout history={props.history} page={props.plantas[props.location.props.id].nombre+'/Podas'} plantaId={props.location.props.id} user={props.user}>
                <Paper elevation={3} className={classes.root}>
                    <div className="container-fluid overflow-auto pt-4">
                        {props.plantas[props.location.props.id].podas?
                        <Timeline lineColor={'#ddd'}>
                            {Object.keys(props.plantas[props.location.props.id].podas).reverse().map((id,i)=>(
                                <TimelineItem
                                dateText={props.plantas[props.location.props.id].podas[id].fecha}
                                dateInnerStyle={{ background: '#00796b', color: '#fff' }}
                                >
                                    <AccionDetallada 
                                        user={props.user} 
                                        index={i}  
                                        plantaDelHistorial={false} 
                                        expanded={expanded} 
                                        handleChange={handleChange} 
                                        accion={props.plantas[props.location.props.id].podas[id]} 
                                        tipoDePoda={props.plantas[props.location.props.id].podas[id].tipoDePoda}
                                        tipoDeAccion='podas' 
                                        idPlanta={props.location.props.id} 
                                        id={id} 
                                        key={id}/>
                                </TimelineItem>
                                ))}
                        </Timeline>
                                :
                                <>
                                <div className="row justify-content-center mt-4">
                                    <div className="col-auto">
                                        <h2 className='text-white'>Esta Planta no ha sido podada!</h2>
                                    </div>
                                </div>
                                <div className="row justify-content-center mt-4">
                                    <div className="col-auto">
                                    <button type='button' className="btn btn-link" onClick={e=>{
                                        props.history.push('/Poda')
                                    }}>Podala Ahora!</button>
                                    </div>
                                </div>
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
export default connect(mapStateToProps,null)(PlantaPodas)
