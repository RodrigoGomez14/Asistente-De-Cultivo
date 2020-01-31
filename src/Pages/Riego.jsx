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
import {Accordion} from 'react-bootstrap'
class Riego extends Component{
    state={
        tipoDeRiego:undefined,
        cantidadDeAgua:undefined,
        plantas: undefined,
        step2:false
    }
    seleccionarPlanta=(id)=>{
        this.setState({
            plantas:{
                ...this.state.plantas,
                [id]:{
                    ...this.state.plantas[id],
                    selected:!this.state.plantas[id].selected,
                }
            }
        })
    }
    componentDidMount(){
        let plantas={}
        Object.keys(this.props.plantas).map(key=>{
            plantas={
                ...plantas,
                [key]:{
                    selected:false,
                    nombre:this.props.plantas[key].nombre
                },
            }
            return null
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
            if(this.state.plantas[planta].selected){
                this.guardarRiegoBD(planta,this.state.cantidadDeAgua,this.state.tipoDeRiego,this.state.aditivos)
            }
            return null
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
                return null
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
    eliminarListaDeAditivos=()=>{
        this.setState({aditivos:undefined})
    }
    eliminarAditivo=(fertilizante)=>{
        let newAditivos = this.state.aditivos
        delete newAditivos[fertilizante]
        if(Object.keys(newAditivos).length){
            this.setState({aditivos:newAditivos})
        }
        else{
            this.setState({aditivos:null})
        }
    }
    activeStep2=()=>{
        this.setState({step2:!this.state.step2})
    }
    render(){
        return(
            <div className="container-fluid accion">
                <NavBarAccion
                    title='Riego'
                />
                <div className="container-fluid d-flex flex-column justify-content-start h-100 overflow-auto">
                    <Accordion defaultActiveKey='0' id='accordion'>
                        <ElegirPlantaAccion
                            seleccionarPlanta={this.seleccionarPlanta}
                            plantas={this.state.plantas}
                        />
                        <ElegirTipoDeRiego
                            tipoDeRiego={this.state.tipoDeRiego}    
                            cambiarTipoDeRiego={this.cambiarTipoDeRiego}
                        />
                        {this.state.tipoDeRiego?
                            <FormularioAccion
                                eliminarListaDeAditivos={this.eliminarListaDeAditivos}
                                tipoDeRiego={this.state.tipoDeRiego}
                                cambiarLitrosDeAgua={this.cambiarLitrosDeAgua}
                                cantidadDeAgua={this.state.cantidadDeAgua}
                                cambiarAditivo={this.cambiarAditivo}
                                adivito='Fertlizante'
                                aditivos={this.props.aditivos}
                                aditivosUsados={this.state.aditivos}
                                eliminarAditivo={this.eliminarAditivo}
                            />
                            :
                            null
                        }
                    </Accordion>
                </div>
                {this.state.cantidadDeAgua?
                    <BotoneraConfirmacionAccion
                        accion='Riego'
                        confirmarAccion={this.confirmarAccion}
                    />
                    :
                    null
                }
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