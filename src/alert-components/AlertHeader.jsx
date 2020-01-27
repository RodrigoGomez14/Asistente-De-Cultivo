import React , {Component} from 'react'

class AlertHeader extends Component{
    render(){
        return(
            <div className="row align-items-center">
                <div className="col-12 text-center">
                    <h4 className='alert-titulo'>{this.props.nombre}</h4>
                </div>
                <div className="col-12 text-center">
                    <h3 className='text-white'>{this.props.title}</h3>
                </div>
            </div>
        )
    }
}
export default AlertHeader