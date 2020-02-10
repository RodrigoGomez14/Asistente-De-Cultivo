import React, { Component } from 'react'
import { TabAditivos } from '../components/TabAditivos'
import { connect } from 'react-redux'
import {Layout} from './Layout'
class Aplicables extends Component{
    render(){
        return(
            <Layout history={this.props.history} page='Aditivos' user={this.props.user}>
                <TabAditivos user={this.props.user} fertilizantes={this.props.fertilizantes} insecticidas={this.props.insecticidas}/>
            </Layout>
        )
    }
}

const mapStateToProps =(state)=>{
    return{
        user:state.user,
        fertilizantes:state.data.fertilizantes,
        insecticidas:state.data.insecticidas
    }
}
export default connect(mapStateToProps,null)(Aplicables)