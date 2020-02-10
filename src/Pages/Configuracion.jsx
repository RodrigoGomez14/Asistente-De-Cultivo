import React, { Component } from 'react'
import {Layout} from './Layout'
import {connect} from 'react-redux'
class Configuracion extends Component{
    render(){
        return(
            <Layout history={this.props.history} page='Configuracion' user={this.props.user}>
                <div className="container-fluid accion">
                    <div className="row">
                        <div className="col">
                            Configuracion
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}
const mapStateToProps = state=>({
    user:state.user
})
export default connect(mapStateToProps,null)(Configuracion)