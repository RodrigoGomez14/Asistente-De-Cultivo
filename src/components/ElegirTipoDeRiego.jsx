import React, {Component} from 'react'

class ElegirTipoDeRiego extends Component{
    render(){
        return(
            <div className="row mt-4">
                <div className="col-12 text-center">
                    <p className='text-white'>Elegir el tipo de riego</p>
                </div>
                <div className="col text-center">
                    <button type='button' className={this.props.tipoDeRiego==='Tierra'?'btn btn-success':'btn btn-outline-light'} onClick={e=>{this.props.cambiarTipoDeRiego('Tierra')}}>
                        Tierra
                    </button>
                </div>
                <div className="col text-center">
                    <button type='button' className={this.props.tipoDeRiego==='Foliar'?'btn btn-success':'btn btn-outline-light'} onClick={e=>{this.props.cambiarTipoDeRiego('Foliar')}}>
                        Foliar
                    </button>
                </div>
            </div>
        )
    }
}
export default ElegirTipoDeRiego