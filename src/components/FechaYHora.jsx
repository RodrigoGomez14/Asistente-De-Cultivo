import React, {Component} from 'react'
import moment from 'moment'

class FechaYHora extends Component{
    state={
        fecha:undefined
    }
    componentDidMount(){
        setInterval(() => {
            this.setState({
                fecha: `${moment().format('DD/MM/YYYY')} ${moment().format('LT')}`
            })
        }, 1000);
    }
    render(){
        if(this.state.fecha){
            return(
                
                <h1>{this.state.fecha}</h1>
            )
        }
        else{
            return(
                <h1>--/--/-- --:--:--</h1>
            )
        }
    }
}
export default FechaYHora