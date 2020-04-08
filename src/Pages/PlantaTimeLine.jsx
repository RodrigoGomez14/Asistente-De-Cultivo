import React , {useState} from 'react'
import {AccionDetallada} from '../components/AccionDetallada'
import { Redirect } from 'react-router'
import {Layout} from './Layout'
import {makeStyles,Paper,Typography} from '@material-ui/core'
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
    },
    paper:{
        padding:theme.spacing(1)
    }
})) 
const PlantaTimeLine =(props)=>{
    let [expanded,setExpanded]= useState(false)
    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const classes = useStyles()
    const convertToArray=(acciones=[],tipoDeAccion)=>{
        let aux = []
        Object.keys(acciones).map(key=>{
            aux.push({accion:acciones[key],tipoDeAccion:tipoDeAccion,id:key})
            return null
        })
        return aux
    }
    const obtenerArray=()=>{
        if(props.location.props){
            let aux =[]
            const arrayRiegos= convertToArray(props.plantas[props.location.props.id].riegos,'Riego')
            const arrayFumigaciones= convertToArray(props.plantas[props.location.props.id].fumigaciones,'Fumigacion')
            const arrayPodas= convertToArray(props.plantas[props.location.props.id].podas,'Poda')
            const arrayTransplantes= convertToArray(props.plantas[props.location.props.id].transplantes,'Transplante')
            arrayRiegos.map(riego=>{
                aux.push(riego)
                return null
            })
            arrayFumigaciones.map(fumigacion=>{
                aux.push(fumigacion)
                return null
            })
            arrayPodas.map(poda=>{
                aux.push(poda)
                return null
            })
            arrayTransplantes.map(transplante=>{
                aux.push(transplante)
                return null
            })
            return aux.sort(function compare(a, b) {
                if (a.id < b.id) {
                  return -1;
                }
                if (a.id > b.id) {
                  return 1;
                }
                return 0;
              }).reverse()
        }
    }
    const array = obtenerArray()
    return(
        props.location.props?
        <Layout history={props.history} page={props.plantas[props.location.props.id].nombre+'/Timeline'} plantaId={props.location.props.id} user={props.user.uid} userVerification={props.user.emailVerified}>
                <Paper elevation={3} className={classes.root}>
                    {array.length?
                            <Timeline lineColor={'#fff'}>
                                {array.map((accion,i)=>(
                                    <TimelineItem
                                        key={`timeline${i}`}
                                        dateText={accion.accion.fecha}
                                        dateInnerStyle={{ background: '#00796b', color: '#fff' }}
                                    >   
                                        <AccionDetallada 
                                            handleChange={handleChange} 
                                            index={i} 
                                            expanded={expanded} 
                                            plantaDelHistorial={true}
                                            user={props.user.uid} 
                                            accion={accion.accion} 
                                            tipoDeAccion={accion.tipoDeAccion} 
                                            idPlanta={props.location.props.id} 
                                            id={accion.id} 
                                        />
                                    </TimelineItem>
                                ))}
                            </Timeline>
                            :
                            <Typography variant='h4'> No se ha realizando nada sobre esta planta</Typography>
                        }
                </Paper>
            </Layout>
            :
            <Redirect to='/'/>
    )
}
const mapStateToProps=state=>({
    user:state.user,
    plantas:state.data.plantas
})
export default connect(mapStateToProps,null)(PlantaTimeLine)
