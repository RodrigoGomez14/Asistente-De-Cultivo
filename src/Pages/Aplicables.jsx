import React, { Component } from 'react'
import { TabAditivos } from '../components/TabAditivos'
import { connect } from 'react-redux'
import {Layout} from './Layout'
import {makeStyles,Paper} from '@material-ui/core'
const useStyles = makeStyles(theme=>({
    root:{
        height:'100%',
        width:'100%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-start',
        backgroundColor:theme.palette.type==='dark'?theme.palette.secondary.main:theme.palette.primary.dark,
        borderRadius:'0'
    }
}))
const Aplicables=(props)=>{
    const classes = useStyles()
    return(
        <Layout history={props.history} page='Aditivos' userVerification={props.user.emailVerified} user={props.user.uid}>
            <Paper elevation={3} className={classes.root}>
                <TabAditivos user={props.user.uid} fertilizantes={props.fertilizantes} insecticidas={props.insecticidas}/>
            </Paper>
        </Layout>
    )
}

const mapStateToProps =(state)=>{
    return{
        user:state.user,
        fertilizantes:state.data.fertilizantes,
        insecticidas:state.data.insecticidas
    }
}
export default connect(mapStateToProps,null)(Aplicables)