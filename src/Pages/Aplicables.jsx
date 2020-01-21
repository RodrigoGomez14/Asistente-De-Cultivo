import React, { Component } from 'react'
import NavBarAccion from '../components/NavBarAccion'
import { TabAditivos } from '../components/TabAditivos'
import { connect } from 'react-redux'

class Aplicables extends Component{
    render(){
        console.log(this.props.fertilizantes,this.props.insecticidas)
        return(
            <div className="container-fluid">
                <NavBarAccion
                    title='Aditivos'
                />
                <TabAditivos fertilizantes={this.props.fertilizantes} insecticidas={this.props.insecticidas}/>
            </div>
        )
    }
}

const mapStateToProps =(state)=>{
    return{
        fertilizantes:state.fertilizantes,
        insecticidas:state.insecticidas
    }
}
export default connect(mapStateToProps,null)(Aplicables)