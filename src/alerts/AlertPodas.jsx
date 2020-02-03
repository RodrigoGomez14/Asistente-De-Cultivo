import React , {Component} from 'react'
import AlertNavBar from '../alert-components/AlertNavBar'
import BreadcrumbPlanta from '../alert-components/BreadcrumbPlanta'
import AccionDetallada from '../alert-components/AccionDetallada'
import { Accordion } from 'react-bootstrap'
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
                    <Accordion defaultActiveKey='0'>
                        {this.props.podas?
                            Object.keys(this.props.podas).reverse().map((id,i)=>(
                                <AccionDetallada user={this.props.user} index={i} alert={this.props.alert} accion={this.props.podas[id]} tipoDePoda={this.props.podas[id].tipoDePoda}tipoDeAccion='podas' idPlanta={this.props.idPlanta} id={id} key={id}/>
                            ))
                            :
                            <>
                                <div className="row justify-content-center mt-4">
                                    <div className="col-auto">
                                        <h2 className='text-white'>Esta Planta aun no ha sido podada!</h2>
                                    </div>
                                </div>
                                <div className="row justify-content-center mt-4">
                                    <div className="col-auto">
                                    <button type='button' className="btn btn-link" onClick={e=>{
                                            this.props.onClose()
                                            this.props.history.push('/Poda')
                                        }}>Podala Ahora!</button>
                                    </div>
                                </div>
                            </>
                        }
                    </Accordion>
                </div>
            </div>
        )
    }
}
export default AlertPodas