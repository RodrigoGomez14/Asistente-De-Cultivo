import React, {Component} from 'react'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import AlertConfirmarAccion from '../alerts/AlertConfirmarAccion'
import {connect} from 'react-redux'
import './styles/Accion.css'
import {database} from 'firebase'
import moment from 'moment'
import NavBarAccion from '../components/NavBarAccion'
import ElegirPlantaAccion from '../components/ElegirPlantaAccion';
import ElegirTipoDeRiego from '../components/ElegirTipoDeRiego';
import BotoneraConfirmacionAccion from '../components/BotoneraConfirmacionAccion';
import FormularioAccion from '../components/FormularioAccion';
import {Tabs,Tab} from 'react-bootstrap'
class Riego extends Component{
    state={
        tipoDeRiego:undefined,
        cantidadDeAgua:undefined,
        plantas: undefined
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
        Object.keys(this.props.plantas).map(key=>{
            plantas={
                ...plantas,
                [key]:false,
            }
        })
        this.setState({
            plantas:plantas,
        })
    }
    confirmarAccion=(accion)=>confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <div className='custom-ui'>
                    <AlertConfirmarAccion
                        history={this.props.history}
                        onClose={onClose}
                        accion={accion}
                        accionfn={this.regar}
                    />
                </div>
            );
        }
    })
    regar=()=>{
        Object.keys(this.state.plantas).map(planta=>{
            if(this.state.plantas[planta]){
                this.guardarRiegoBD(planta,this.state.cantidadDeAgua,this.state.tipoDeRiego,this.state.aditivos)
            }
        })
    }
    guardarRiegoBD= async (idPlanta,agua,tipoDeRiego,fertilizantes)=>{
        let fertilizantesFinal = {}
        if(fertilizantes){
            Object.keys(fertilizantes).map(fertilizante=>{
                fertilizantesFinal={
                    ...fertilizantesFinal,
                    [fertilizante]:fertilizantes[fertilizante]
                }
            })
        }
        await database().ref().child('plantas').child(idPlanta).child('riegos').push({
            agua:agua,
            tipoDeRiego:tipoDeRiego,
            fecha:moment().format('LLL'),
            aditivos:fertilizantesFinal
        })
    }
    cambiarTipoDeRiego=(tipoDeRiego)=>{
        this.setState({
            tipoDeRiego:tipoDeRiego
        })
    }
    cambiarLitrosDeAgua=(litros)=>{
        this.setState({
            cantidadDeAgua:litros
        })
    }
    cambiarAditivo=(fertilizante,cantidad)=>{
        this.setState({
            aditivos:{...this.state.aditivos,[fertilizante]:cantidad}
        })
    }
    render(){
        return(
            <div className="container-fluid accion">
                <NavBarAccion
                    title='Riego'
                />
                <ElegirPlantaAccion
                    seleccionarPlanta={this.seleccionarPlanta}
                    plantas={this.state.plantas}
                />
                <ElegirTipoDeRiego
                    tipoDeRiego={this.state.tipoDeRiego}    
                    cambiarTipoDeRiego={this.cambiarTipoDeRiego}
                />
                <FormularioAccion
                    cambiarLitrosDeAgua={this.cambiarLitrosDeAgua}
                    cantidadDeAgua={this.state.cantidadDeAgua}
                    cambiarAditivo={this.cambiarAditivo}
                    adivito='Fertlizante'
                    aditivos={this.props.aditivos}
                />
                <div className="row">
                    <div className="col-auto">
                        {this.state.tipoDeRiego}
                    </div>
                    <div className="col-auto">
                        {this.state.cantidadDeAgua}
                    </div>
                    <div className='col-auto'>
                        {this.state.aditivos?
                            Object.keys(this.state.aditivos).map(aditivo=>(
                                <span className='badge badge-pill badge-info'>
                                    {aditivo}
                                    <hr/>
                                    {this.state.aditivos[aditivo]}
                                </span>
                            ))
                            :
                        null}
                    </div>
                </div>
                <BotoneraConfirmacionAccion
                    confirmarAccion={this.confirmarAccion}
                    aditivos={this.props.aditivos}
                />
            </div>
        )
    }
}
const mapStateToProps = state=>{
    return{
        plantas:state.plantas,
        aditivos:state.fertilizantes
    }
}
export default connect(mapStateToProps,null)(Riego)