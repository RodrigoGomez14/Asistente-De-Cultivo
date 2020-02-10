import React,{Component} from 'react'
import {Layout} from './Layout'
import { connect } from 'react-redux'
import {Paper, Grid} from '@material-ui/core'
import {database} from 'firebase'
import moment from 'moment'
import addFile from '../images/addFile.svg'
import { FormNuevoAditivo } from '../alert-components/FormNuevoAditivo'
import {Redirect} from 'react-router-dom'
class NuevoAditivo extends Component{
    render(){
        if(!this.props.location.props){
            return(
                <Redirect to='Aplicables'/>
            )
        }
        else{
            return(
                <Layout page='Nuevo Aditivo' user={this.props.user} history={this.props.history}>
                    <Grid container component="main">
                        <Grid item xs={0} sm={0} md={7}>
                            <img src={addFile}/>
                        </Grid>
                        <Grid item xs={12} sm={8} md={5}square>
                            <FormNuevoAditivo  
                                aditivos={this.props.location.props.tipoDeAditivo==='Fertilizantes'?this.props.fertilizantes:this.props.insecticidas}
                                tipoDeAditivo={this.props.location.props.tipoDeAditivo}
                                user={this.props.user}
                            />
                        </Grid>
                    </Grid>
                </Layout>
            )
        }
    }
}
const mapStateToProps=state=>({
    user:state.user,
    fertilizantes:state.data.fertilizantes,
    insecticidas:state.data.insecticidas
})
export default connect(mapStateToProps,null)(NuevoAditivo)