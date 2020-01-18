import React , {Component} from 'react'
import AlertNavBar from '../alert-components/AlertNavBar'
import BreadcrumbPlanta from '../alert-components/BreadcrumbPlanta'
import AccionDetallada from '../alert-components/AccionDetallada'
class AlertPodas extends Component{
    render(){
        return(
            <div className="container-fluid alert">
                <AlertNavBar
                    alertPlanta={this.props.alertPlanta}
                    onClose={this.props.onClose}
                    title={<BreadcrumbPlanta nombre={this.props.nombre} item='Podas' return={this.props.alertPlanta}/>}
                />
                <div className="container-fluid submodalIn">
                    {this.props.podas?
                        <div className="list-group">
                            {Object.keys(this.props.podas).reverse().map(id=>(
                                <div className="list-group-item list-group-item-action ">
                                    <AccionDetallada alert={this.props.alert} accion={this.props.podas[id]} tipoDeAccion='podas' idPlanta={this.props.idPlanta} id={id} key={id}/>
                                </div>
                            ))}
                        </div>
                        :
                        <>
                            <div className="row justify-content-center mt-4">
                                <div className="col-auto">
                                    <h2 className='text-white'>Esta Planta aun no ha sido podada!</h2>
                                </div>
                            </div>
                            <div className="row justify-content-center mt-4">
                                <div className="col-auto">
                                    <button type='button' className="btn btn-outline-light">Riego</button>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
        )
    }
}
export default AlertPodas