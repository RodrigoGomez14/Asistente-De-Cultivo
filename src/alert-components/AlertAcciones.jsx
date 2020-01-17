import React , {Component} from 'react'

class AlertAcciones extends Component{
    render(){
        {this.props.accionList?
            Object.values(this.props.accionList).reverse().map(accion=>(
                <div className="row mt-2 mb-2 pb-2 borderline">
                    <RiegoDetallado accion={accion}/>
                </div>
            ))
            :
            <>
                <div className="row justify-content-center mt-4">
                    <div className="col-auto">
                        <h2 className='text-white'>Esta Planta aun no ha sido regada!</h2>
                    </div>
                </div>
                <div className="row justify-content-center mt-4">
                    <div className="col-auto">
                        <Link to='/Riego'>
                            <a className="btn btn-outline-light">Riego</a>
                        </Link>
                    </div>
                </div>
            </>
        }
    }
}
export default AlertAcciones