import React , {Component} from 'react'
import AlertNavBar from '../alert-components/AlertNavBar'
import BreadcrumbPlanta from '../alert-components/BreadcrumbPlanta'
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
                            {Object.values(this.props.podas).reverse().map(poda=>(
                                <div className="list-group-item list-group-item-action list-group-item-info">
                                    <h5 className='text-dark'>{poda.fecha}</h5>
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