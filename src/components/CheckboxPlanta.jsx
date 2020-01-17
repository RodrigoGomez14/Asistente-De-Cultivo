import React , {Component} from 'react'
import {connect} from 'react-redux'
class CheckboxPlanta extends Component{
    render(){
        return(
            <div className='col text-center'>
                <button type="button" className={this.props.checked?'btn btn-success':'btn btn-outline-light'} onClick={this.props.handleClick}>
                    {this.props.plantas[this.props.llave].nombre}
                </button>
            </div>
        )
    }
}
const mapStateToProps = state=>{
    return{
        plantas:state.plantas
    }
}
export default connect(mapStateToProps,null)(CheckboxPlanta)