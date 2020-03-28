import React,{Component} from 'react'
import {Layout} from './Layout'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import {Button,Typography} from '@material-ui/core'
import {CardHistorial} from '../components/CardHistorial'
import {makeStyles,Paper} from '@material-ui/core'
import { Timeline, TimelineItem }  from 'vertical-timeline-component-for-react';

const useStyles=makeStyles(theme=>({
    root:{
        height:'100%',
        width:'100%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-start',
        backgroundColor:theme.palette.type==='dark'?theme.palette.secondary.main:theme.palette.primary.dark,
        borderRadius:'0',
        overflow:'auto',
        paddingBottom:theme.spacing(2)
    }
}))
const Historial=(props)=>{
    const classes = useStyles()
    return(
        <Layout history={props.history} page={'Historial'} userVerification={props.user.emailVerified} user={props.user.uid}>
            <Paper elevation={3} className={classes.root}>
                <Timeline lineColor={'#ddd'}>
                    {props.historial?
                        Object.keys(props.historial).reverse().map(planta=>(
                            <TimelineItem
                                dateText={props.historial[planta].fechaDeCorte}
                                dateInnerStyle={{ background: '#00796b', color: '#fff', width:'250px'}}
                            >
                                <Link className='text-white' to={{
                                    pathname:'/Historial/Planta',
                                    props:{
                                        id:planta,
                                    }
                                }}>
                                    <CardHistorial cantidadDeGramos={props.historial[planta].cantidadDeGramos} nombre={props.historial[planta].nombre} fechaDeCorte={props.historial[planta].fechaDeCorte}/>
                                </Link>
                            </TimelineItem>
                        )):
                        <div className="col-auto">
                            <Typography>
                                No hay plantas en el historial
                            </Typography>
                        </div>
                    }
                </Timeline>
            </Paper>
        </Layout>
    )
}
const mapStateToProps=state=>({
    user:state.user,
    historial:state.data.historial
})
export default connect(mapStateToProps,null)(Historial)