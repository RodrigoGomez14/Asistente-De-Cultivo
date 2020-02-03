import React, { Component } from 'react'
import NavBarAccion from '../components/NavBarAccion'
import { TabAditivos } from '../components/TabAditivos'
import { connect } from 'react-redux'

class Aplicables extends Component{
    render(){
        return(
            <div className="container-fluid overflow-auto">
                <NavBarAccion
                    title='Aditivos'
                />
                <TabAditivos user={this.props.user} fertilizantes={this.props.fertilizantes} insecticidas={this.props.insecticidas}/>
            </div>
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