import React, { Component } from 'react'
import NavBarAccion from '../components/NavBarAccion'
import { TabAditivos } from '../components/TabAditivos'
import { connect } from 'react-redux'
import {Layout} from './Layout'
class Aplicables extends Component{
    render(){
        return(
            <Layout history={this.props.history} page='Aditivos'>
                <div className="container-fluid overflow-auto d-flex flex-column justify-content-start h-100 px-0">
                    <div className="row">
                        <TabAditivos user={this.props.user} fertilizantes={this.props.fertilizantes} insecticidas={this.props.insecticidas}/>
                    </div>
                </div>
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