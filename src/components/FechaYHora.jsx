import React, {Component} from 'react'
import moment from 'moment'
import {Typography} from '@material-ui/core'

class FechaYHora extends Component{
    state={
        fecha:`${moment().format('DD/MM/YYYY')} ${moment().format('LT')}`
    }
    componentDidMount(){
        setInterval(() => {
            this.setState({
                fecha: `${moment().format('DD/MM/YYYY')} ${moment().format('LT')}`
            })
        }, 1000);
    }
    render(){
        return(
            <h3>{this.state.fecha}</h3>
        )
    }
}
export default FechaYHora