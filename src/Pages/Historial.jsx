import React,{Component} from 'react'
import {Layout} from './Layout'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import {Button,Typography} from '@material-ui/core'
import {CardHistorial} from '../components/CardHistorial'
class Historial extends Component{
    render(){
        return(
            <Layout history={this.props.history} page={'Historial'}>
                <div className="container">
                    <div className="row">
                        {this.props.historial?
                            Object.keys(this.props.historial).map(planta=>(
                                <div className="col-auto mt-3">
                                    <Link className='text-white' to={{
                                        pathname:'/Historial/Planta',
                                        props:{
                                            ...this.props.historial[planta],
                                            user:this.props.user,
                                            id:planta,
                                            history:this.props.history,
                                            plantaDelHistorial:true
                                        }
                                    }}>
                                        <CardHistorial nombre={this.props.historial[planta].nombre} fechaDeCorte={this.props.historial[planta].fechaDeCorte}/>
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
            </Layout>
        )
    }
}
const mapStateToProps=state=>({
    user:state.user,
    historial:state.data.historial
})
export default connect(mapStateToProps,null)(Historial)