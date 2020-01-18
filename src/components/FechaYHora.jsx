import React, {Component} from 'react'
import moment from 'moment'

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
            
            <h1>{this.state.fecha}</h1>
        )
    }
}
export default FechaYHora