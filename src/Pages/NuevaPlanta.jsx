import React,{Component} from 'react'
import {Layout} from './Layout'
import { connect } from 'react-redux'
import {Paper, Grid} from '@material-ui/core'
import {database} from 'firebase'
import moment from 'moment'
import {FormNuevaPlanta} from '../components/FormNuevaPlanta'
import addFile from '../images/addFile.svg'
class NuevaPlanta extends Component{
    guardarNuevaPlantaDB= async (nombre,genetica,etapa)=>{
        await database().ref().child(this.props.user).child('plantas').push({
            nombre:nombre,
            genetica:genetica,
            etapa:etapa,
            nacimiento:moment().format('L')
        })
        this.props.history.replace('/')
    }
    render(){
        return(
            <Layout page='Nueva Planta' user={this.props.user} history={this.props.history}>
                <Grid container component="main">
                    <Grid item xs={false} sm={4} md={7}>
                        <img src={addFile}/>
                    </Grid>
                    <Grid item xs={12} sm={8} md={5}square>
                        <FormNuevaPlanta guardarNuevaPlantaDB={this.guardarNuevaPlantaDB} />
                    </Grid>
                </Grid>
            </Layout>
    
        )
    }
}
const mapStateToProps=state=>({
    user:state.user
})
export default connect(mapStateToProps,null)(NuevaPlanta)