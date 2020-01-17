import React , {Component} from 'react'
class AlertConfirmarAccion extends Component {
    render(){
        return(
            <div className="container-fluid alert alertPlanta">
                <div className="row">
                    <div className="col-12 text-center">
                        <h2 className='text-white'>Confirmar {this.props.accion}?</h2>
                    </div>
                </div>
                <div className="row justify-content-around">
                    <div className="col-auto">
                        <button type='button' className='btn btn-outline-light' onClick={e=>{
                            this.props.accionfn()
                        }}>Si, Confirmar</button>
                    </div>
                    <div className="col-auto">
                        <button type='button' className='btn btn-outline-light' onClick={e=>{
                            this.props.onClose()
                        }}>Cancelar</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default AlertConfirmarAccion