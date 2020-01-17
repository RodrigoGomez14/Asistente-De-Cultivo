import React , {Component} from 'react'
import fotoPlanta from '../images/apple cookies.jpg'
import moment from 'moment'
class DetallePlanta extends Component{
    render(){
        return(
            <div className="row mt-4 mb-4">
                <div className="col-4 text-center">
                    <img src={fotoPlanta} alt="" className='alert-foto'/>
                </div>
                <div className="col-8 align-self-center">
                    <div className="container">
                        <div className="list-group">
                            <div className="list-group-item list-group-item-action">
                                <div className="d-flex w-100 justify-content-between align-items-center">
                                    <h6 className=''>Genetica</h6>
                                    <h6 className='text-right '>{this.props.genetica}</h6>
                                </div>
                            </div>
                            <div className="list-group-item list-group-item-action">
                                <div className="d-flex w-100 justify-content-between align-items-center">
                                    <h6 className=''>Edad</h6>
                                    <h6 className='text-right '>{this.props.edad} Dias</h6>
                                </div>
                            </div>
                            <div className="list-group-item list-group-item-action">
                                <div className="d-flex w-100 justify-content-between align-items-center">
                                    <h6 className=''>Fecha de Germinacion</h6>
                                    <h6 className='text-right '>{this.props.nacimiento} ({moment().diff(moment(this.props.nacimiento),'days')} Dias)</h6>
                                </div>
                            </div>
                            <div className="list-group-item list-group-item-action">
                                <div className="d-flex w-100 justify-content-between align-items-center">
                                    <h6 className=''>Inicio de Vegetativo</h6>
                                    <h6 className='text-right '>{
                                        this.props.inicioVegetativo?
                                            `${this.props.inicioVegetativo} (${moment().diff(moment(this.props.inicioVegetativo),'days')} Dias)`
                                            :
                                            '--/--/----'
                                        }</h6>
                                </div>
                            </div>
                            <div className="list-group-item list-group-item-action">
                                <div className="d-flex w-100 justify-content-between align-items-center">
                                    <h6 className=''>Inicio de Floracion</h6>
                                    <h6 className='text-right '>{
                                        this.props.inicioFloracion?
                                        `${this.props.inicioFloracion}  (${moment().diff(moment(this.props.inicioFloracion),'days')} Dias)`
                                        :
                                        '--/--/----'
                                    }</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default DetallePlanta