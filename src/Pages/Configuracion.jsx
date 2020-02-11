import React, { Component } from 'react'
import {Layout} from './Layout'
import {connect} from 'react-redux'
import {ListConfig} from '../components/ListConfig'
import {database}from 'firebase'
class Configuracion extends Component{
    state={
        switchModoOscuro:localStorage.getItem('theme')==='dark'?true:false
    }
    setSwitchValue=value=>{
         this.setState({
            switchModoOscuro:value
        })
        if(!value){
            localStorage.setItem('theme','light')
        }
        else{
            localStorage.setItem('theme','dark')
        }
    }
    cambiarHoraDeInicio=horaDeInicio=>{
        database().ref().child(this.props.user).update({
            horaDeInicio:horaDeInicio
        })
    }
    cambiarPeriodo=periodo=>{
        database().ref().child(this.props.user).update({
            periodo:periodo
        })
    }
    cambiarCicloLuminico=cicloLuminico=>{
        database().ref().child(this.props.user).update({
            cicloLuminico:cicloLuminico
        })
    }
    render(){
        console.log(this.state.switchModoOscuro)
        return(
            <Layout history={this.props.history} page='Configuracion' user={this.props.user}>
                <ListConfig 
                    switchValue={this.state.switchModoOscuro} 
                    setSwitchValue={this.setSwitchValue} 
                    horaDeInicio={this.props.horaDeInicio} 
                    cambiarHoraDeInicio={this.cambiarHoraDeInicio}
                    periodo={this.props.periodo} 
                    cambiarPeriodo={this.cambiarPeriodo}
                    cicloLuminico={this.props.cicloLuminico}
                    cambiarCicloLuminico={this.cambiarCicloLuminico}
                />
            </Layout>
        )
    }
}
const mapStateToProps = state=>({
    user:state.user,
    periodo:state.data.periodo,
    horaDeInicio:state.data.horaDeInicio,
    cicloLuminico:state.data.cicloLuminico
})
export default connect(mapStateToProps,null)(Configuracion)