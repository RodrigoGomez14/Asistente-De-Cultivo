import React, {Component} from 'react'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {connect} from 'react-redux'
import AlertConfirmarAccion from '../alerts/AlertConfirmarAccion'
import './styles/Accion.css'
import * as firebase from 'firebase'
import moment from 'moment'
import NavBarAccion from '../components/NavBarAccion'
import ElegirPlantaAccion from '../components/ElegirPlantaAccion';
import BotoneraConfirmacionAccion from '../components/BotoneraConfirmacionAccion';

class Poda extends Component{
    state={
        plantas:undefined
    }
    seleccionarPlanta=(id)=>{
        this.setState({
            plantas:{
                ...this.state.plantas,
                [id]:!this.state.plantas[id],
            }
        })
    }
    componentDidMount(){
        let plantas={}
        Object.keys(this.props.plantas).map(key=>(
            plantas={
                ...plantas,
                [key]:false,
            }
        ))
        this.setState({
            plantas:plantas
        })
    }
    confirmarAccion=(accion)=>confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <div className='custom-ui'>
                    <AlertConfirmarAccion
                        onClose={onClose}
                        accion={accion}
                        accionfn={this.podar}
                    />
                </div>
            );
        }
    })
    podar=()=>{
        Object.keys(this.state.plantas).map(planta=>{
            if(this.state.plantas[planta]){
                this.guardarPodaBD(planta)
            }
        })
    }
    guardarPodaBD= async (idPlanta)=>{
        await firebase.database().ref().child('plantas').child(idPlanta).child('podas').push({
            fecha:moment().format('LLL'),
        })
    }
    render(){
        console.log(this.state)
        return(
            <div className="container-fluid accion">
                <NavBarAccion
                    title='Poda'
                />
                <ElegirPlantaAccion
                    seleccionarPlanta={this.seleccionarPlanta}
                    plantas={this.state.plantas}
                />
                <BotoneraConfirmacionAccion
                    confirmarAccion={this.confirmarAccion}
                />
            </div>
        )
    }
}
const mapStateToProps = state=>{
    return{
        plantas:state.plantas,
    }
}
export default connect(mapStateToProps,null)(Poda)