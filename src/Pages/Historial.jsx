import React,{Component} from 'react'
import {Layout} from './Layout'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import {Button,Typography} from '@material-ui/core'
import {CardHistorial} from '../components/CardHistorial'
import {makeStyles,Paper} from '@material-ui/core'

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
        <Layout history={props.history} page={'Historial'} user={props.user}>
            <Paper elevation={3} className={classes.root}>
                <div className="container-fluid">
                    <div className="row flex-nowrap">
                        {props.historial?
                            Object.keys(props.historial).map(planta=>(
                                <div className="col-auto mt-3">
                                    <Link className='text-white' to={{
                                        pathname:'/Historial/Planta',
                                        props:{
                                            id:planta,
                                        }
                                    }}>
                                        <CardHistorial cantidadDeGramos={props.historial[planta].cantidadDeGramos} nombre={props.historial[planta].nombre} fechaDeCorte={props.historial[planta].fechaDeCorte}/>
                                    </Link>
                                </div>
                            )):
                            <div className="col-auto">
                                <Typography>
                                    No hay plantas en el historial
                                </Typography>
                            </div>
                        }
                    </div>
                </div>
            </Paper>
        </Layout>
    )
}
const mapStateToProps=state=>({
    user:state.user.uid,
    historial:state.data.historial
})
export default connect(mapStateToProps,null)(Historial)