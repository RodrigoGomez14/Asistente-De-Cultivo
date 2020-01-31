import React , {Component} from 'react'
import CarouselPlantas from '../components/CarouselPlantas'
import BarraDeLuz from '../components/BarraDeLuz'
//import TemperaturaYHumedad from '../components/TemperaturaYHumedad'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../components/styles/alertPlanta.css'
import './styles/Accion.css'
import {connect} from 'react-redux'
import  {database} from 'firebase'
import AlertConfiguracionArmario from '../alerts/AlertConfiguracionArmario'
import AlertCambiarFinal from '../alerts/AlertCambiarFinal'
import AlertCambiarInicio from '../alerts/AlertCambiarInicio'
import AlertCambiarPeriodo from '../alerts/AlertCambiarPeriodo'
import {MenuButton} from './styles/ArmarioStyle'
import Navbar from '../components/Navbar'
import { faTint, faCut , faBug , faCogs, faAlignRight, faTimes} from '@fortawesome/free-solid-svg-icons'
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Link} from 'react-router-dom'
import {auth} from 'firebase'
class Armario extends Component{
    state={
        nuevoPeriodo:undefined,
        menuOpened:false
    }
    alertCambiarPeriodo=()=>confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <div className='custom-ui'>
                    <AlertCambiarPeriodo
                        onClose={onClose}
                        alertConfiguracion={this.alertConfiguracion}
                        nuevoPeriodo={this.state.nuevoPeriodo}
                        cambiarStatePeriodo={nuevoPeriodo=>{
                            this.setState({
                                nuevoPeriodo:nuevoPeriodo
                            })
                        }}
                        cambioDePeriodo={this.cambioDePeriodo}
                    />
                </div>
            );
        }
    })
    alertCambiarInicio=()=>confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <div className='custom-ui'>
                    <AlertCambiarInicio
                        onClose={onClose}
                        alertConfiguracion={this.alertConfiguracion}
                        cambiarHoraDeInicio={this.cambiarHoraDeInicio}
                    />
                </div>
            );
        }
    })
    alertCambiarFinal=()=>confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <div className='custom-ui'>
                    <AlertCambiarFinal
                        onClose={onClose}
                        alertConfiguracion={this.alertConfiguracion}
                        cambiarHoraDeFinal={this.cambiarHoraDeFinal}
                    />
                </div>
            );
        }
    })
    alertConfiguracion=()=>confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <div className='custom-ui'>
                    <AlertConfiguracionArmario
                        periodo={this.props.periodo}
                        horaDeFinal={this.props.horaDeFinal}
                        horaDeInicio={this.props.horaDeInicio}
                        onClose={onClose}
                        alertCambiarFinal={this.alertCambiarFinal}
                        alertCambiarInicio={this.alertCambiarInicio}
                        alertCambiarPeriodo={this.alertCambiarPeriodo}
                    />
                </div>
            );
        }
    })
    cambioDePeriodo=async()=>{
        await database().ref().update({
            periodo:this.state.nuevoPeriodo
        })
    }
    cambiarHoraDeInicio=async ()=>{
        const horas = document.getElementById('inputHoras').value
        //const minutos = document.getElementById('inputMinutos').value
        await database().ref().update({
            horaDeInicio: parseInt(horas)
        })
    }
    cambiarHoraDeFinal=async ()=>{
        const horas = document.getElementById('inputHoras').value
        //const minutos = document.getElementById('inputMinutos').value
        await database().ref().update({
            horaDeFinal: parseInt(horas)
        })
    }
    changeStateOfNavbar =() =>{
        this.setState({menuOpened:!this.state.menuOpened})
    }
    render(){
        return(
            <div className="container-fluid d-flex flex-column justify-content-around h-100">
                <div className="row">
                    <div className="col-11 text-right">
                        <MenuButton onClick={e=>{
                            this.setState({menuOpened:true})
                        }}>
                            <FontAwesomeIcon icon={faAlignRight}/>
                        </MenuButton>
                    </div>
                </div>
                <Drawer anchor="right" open={this.state.menuOpened} onClose={e=>{this.setState({menuOpened:false})}}>
                    <div className="container d-flex flex-column h-100 justify-content-between">
                        <div>
                            <List>
                                <Link to='Riego' className='outline-none text-dark'>
                                    <ListItem button key={'Regar'} >
                                        <ListItemIcon><FontAwesomeIcon icon={faTint}/></ListItemIcon>
                                        <ListItemText primary={'Regar'} />
                                    </ListItem>
                                </Link>
                            </List>
                            <Divider />
                            <List>
                                <Link to='Poda' className='outline-none text-dark'>
                                    <ListItem button key={'Podar'}>
                                        <ListItemIcon><FontAwesomeIcon icon={faCut}/></ListItemIcon>
                                        <ListItemText primary={'Podar'} />
                                    </ListItem>
                                </Link>
                            </List>
                            <Divider />
                            <List>
                                <Link to='Insecticida' className='outline-none text-dark'>
                                    <ListItem button key={'Fumigar'}>
                                        <ListItemIcon><FontAwesomeIcon icon={faBug}/></ListItemIcon>
                                        <ListItemText primary={'Fumigar'} />
                                    </ListItem>
                                </Link>
                            </List>
                            <Divider />
                        </div>
                        <div>
                            <Divider />
                            <List>
                                <Link to='/Aplicables' className='outline-none text-dark'>
                                    <ListItem button key={'Aditivos'}>
                                        <ListItemIcon><FontAwesomeIcon icon={faBug}/></ListItemIcon>
                                        <ListItemText primary={'Aditivos'} />
                                    </ListItem>
                                </Link>
                            </List>
                            <Divider />
                            <List>
                                <Link to='/Aditivos' className='outline-none text-dark'>
                                    <ListItem button key={'Carencias y Excesos'}>
                                        <ListItemIcon><FontAwesomeIcon icon={faBug}/></ListItemIcon>
                                        <ListItemText primary={'Carencias y Excesos'} />
                                    </ListItem>
                                </Link>
                            </List>
                            <Divider />
                            <List>
                                <ListItem button key={'Configuracion'} onClick={e=>{
                                    this.alertConfiguracion()
                                    this.setState({menuOpened:false})
                                    }}>
                                    <ListItemIcon><FontAwesomeIcon icon={faCogs}/></ListItemIcon>
                                    <ListItemText primary={'Configuracion'} />
                                </ListItem>
                            </List>
                            <Divider />
                            <List>
                                <ListItem button key={'Cerrar Sesion'} className='text-danger' onClick={async e=>{
                                        await auth().signOut()
                                    }}>
                                    <ListItemIcon><FontAwesomeIcon icon={faTimes} className='text-danger'/></ListItemIcon>
                                    <ListItemText primary={'Cerrar Sesion'} />
                                </ListItem>
                            </List>
                        </div>
                    </div>
                </Drawer>
                <div className='row'>
                    <div className='col'>
                        <BarraDeLuz/>            
                    </div>
                </div>
                <div className='row'>
                    <CarouselPlantas history={this.props.history}/>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state =>{
    return{
        plantas:state.plantas,
        periodo:state.periodo,
        horaDeInicio:state.horaDeInicio,
        horaDeFinal:state.horaDeFinal,
    }
}
export default connect(mapStateToProps,null)(Armario)