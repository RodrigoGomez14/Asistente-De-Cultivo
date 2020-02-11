import React,{Component} from 'react'
import {Layout} from './Layout'
import { connect } from 'react-redux'
import {Paper, Grid} from '@material-ui/core'
import {database} from 'firebase'
import moment from 'moment'
import {FormNuevaPlanta} from '../components/FormNuevaPlanta'
import addFile from '../images/addFile.svg'
class NuevaPlanta extends Component{
    guardarNuevaPlantaDB= async (nombre,genetica,etapa,inicioGerminacion,inicioVegetativo,inicioFloracion)=>{
        await database().ref().child(this.props.user).child('plantas').push({
            nombre:nombre,
            genetica:genetica?genetica:null,
            nacimiento:inicioGerminacion?inicioGerminacion:null,
            inicioVegetativo:inicioVegetativo?inicioVegetativo:null,
            inicioFloracion:inicioFloracion?inicioFloracion:null
        })
        this.props.history.replace('/')
    }
    render(){
        return(
            <Layout page='Nueva Planta' user={this.props.user} history={this.props.history}>
                <FormNuevaPlanta guardarNuevaPlantaDB={this.guardarNuevaPlantaDB} periodoArmario={this.props.periodo}/>
            </Layout>
        )
    }
}
const mapStateToProps=state=>({
    user:state.user,
    periodo:state.data.periodo
})
export default connect(mapStateToProps,null)(NuevaPlanta)