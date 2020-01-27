import React , {Component} from 'react'
import AccionDetallada from '../alert-components/AccionDetallada'
import AlertNavBar from '../alert-components/AlertNavBar'
import BreadcrumbPlanta from '../alert-components/BreadcrumbPlanta'
import {Accordion} from 'react-bootstrap'
class AlertRiego extends Component{
    render(){
        return(
            <div className="container-fluid alert">
                <AlertNavBar
                    alertPlanta={this.props.alertPlanta}
                    onClose={this.props.onClose}
                    title={<BreadcrumbPlanta nombre={this.props.nombre} item={'Riego'} return={this.props.alertPlanta}/>}
                />
                <div className="container-fluid submodalIn">
                    <Accordion defaultActiveKey='0'>
                        {this.props.riegos?
                            Object.keys(this.props.riegos).reverse().map((id,i)=>(
                                <AccionDetallada index={i} alert={this.props.alert} accion={this.props.riegos[id]} tipoDeAccion='riegos' idPlanta={this.props.idPlanta} id={id} key={id}/>
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
                                        <button type='button' className="btn btn-outline-light" onClick={e=>{
                                            
                                        }}>Riego</button>
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
export default AlertRiego