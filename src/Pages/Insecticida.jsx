import React, {Component} from 'react'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {connect} from 'react-redux'
import './styles/Accion.css'
import {database} from 'firebase'
import moment from 'moment'
import AlertConfirmarAccion from '../alerts/AlertConfirmarAccion';
import NavBarAccion from '../components/NavBarAccion';
import ElegirPlantaAccion from '../components/ElegirPlantaAccion'
import ElegirTipoDeRiego from '../components/ElegirTipoDeRiego';
import BotoneraConfirmacionAccion from '../components/BotoneraConfirmacionAccion';
import FormularioAccion from '../components/FormularioAccion'
import { Accordion } from 'react-bootstrap';
class Insecticida extends Component{
    state={
        tipoDeRiego:undefined,
        cantidadDeAgua:undefined,
        platnas:undefined
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
            plantas:plantas
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
                        accionfn={this.fumigar}
                    />
                </div>
            );
        }
    })
    fumigar=()=>{
        Object.keys(this.state.plantas).map(planta=>{
            if(this.state.plantas[planta].selected){
                this.guardrarFumigacionDB(planta,this.state.cantidadDeAgua,this.state.cantidadDeAgua,this.state.aditivos,this.state.tipoDeRiego)
            }
            return null
        })
    }
    guardrarFumigacionDB= async (idPlanta,agua,cantidadDeAgua,insecticidas,tipoDeRiego)=>{
        let insecticidasFinal = {}
        if(insecticidas){
            Object.keys(insecticidas).map(insecticida=>{
                insecticidasFinal={
                    ...insecticidasFinal,
                    [insecticida]:insecticidas[insecticida]
                }
                return null
            })
        }
        await database().ref().child('plantas').child(idPlanta).child('fumigaciones').push({
            agua:agua,
            cantidadDeAgua:cantidadDeAgua,
            fecha:moment().format('LLL'),
            aditivos:insecticidasFinal,
            tipoDeRiego:tipoDeRiego
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
    render(){
        return(
            <div className="container-fluid accion">
                <NavBarAccion
                    title='Insecticida'
                />
                <div className="container-fluid d-flex flex-column justify-content-start h-100 overflow-auto">
                    <Accordion defaultActiveKey='0'>
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
                            aditivo='Insecticida'
                            aditivos={this.props.aditivos}
                            aditivosUsados={this.state.aditivos}
                            eliminarAditivo={this.eliminarAditivo}
                        />
                    </Accordion>
                </div>
                <BotoneraConfirmacionAccion
                    accion='Fumigacion'
                    confirmarAccion={this.confirmarAccion}
                />
            </div>
        )
    }
}
const mapStateToProps = state=>{
    return{
        plantas:state.plantas,
        aditivos:state.insecticidas,
    }
}
export default connect(mapStateToProps,null)(Insecticida)