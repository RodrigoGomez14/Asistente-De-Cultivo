import React,{Component} from 'react'
import {Layout} from './Layout'
import { connect } from 'react-redux'
import {database} from 'firebase'
import moment from 'moment'
import addFile from '../images/addFile.svg'
import { FormNuevoAditivo } from '../components/FormNuevoAditivo'
import {Redirect} from 'react-router-dom'
import {makeStyles,Paper} from '@material-ui/core'
const useStyles = makeStyles(theme=>({
    root:{
        height:'100%',
        width:'100%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-around',
        backgroundColor:theme.palette.type==='dark'?theme.palette.secondary.main:theme.palette.primary.dark,
        borderRadius:'0'
    }
}))
const NuevoAditivo=(props)=>{
    const classes = useStyles()
    if(!props.location.props){
        return(
            <Redirect to='Aplicables'/>
        )
    }
    else{
        return(
            <Layout page='Nuevo Aditivo' user={props.user} history={props.history}>
                <Paper elevation={3} className={classes.root}>
                    <FormNuevoAditivo  
                        history={props.history}
                        aditivos={props.location.props.tipoDeAditivo==='Fertilizantes'?props.fertilizantes:props.insecticidas}
                        tipoDeAditivo={props.location.props.tipoDeAditivo}
                        user={props.user}
                    />
                </Paper>
            </Layout>
        )
    }
}
const mapStateToProps=state=>({
    user:state.user.uid,
    fertilizantes:state.data.fertilizantes,
    insecticidas:state.data.insecticidas
})
export default connect(mapStateToProps,null)(NuevoAditivo)