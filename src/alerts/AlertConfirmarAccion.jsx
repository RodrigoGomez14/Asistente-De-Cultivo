import React , {Component} from 'react'
class AlertConfirmarAccion extends Component {
    render(){
        return(
            <div className="container-fluid alert alertPlanta h-100 d-flex flex-column justify-content-center">
                <div className="row">
                    <div className="col-12 text-center">
                        <h2 className='text-white'>Confirmar {this.props.accion}?</h2>
                    </div>
                </div>
                <div className="row justify-content-center mt-4">
                    <div className="col-auto">
                        <button type='button' className='btn btn-outline-light' onClick={e=>{
                            this.props.accionfn()
                            this.props.onClose()
                            this.props.history.goBack()
                        }}>Confirmar</button>
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