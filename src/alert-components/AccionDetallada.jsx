import React , {Component} from 'react'

class AccionDetallada extends Component{
    render(){
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-auto">
                        <h5 className='text-dark'>{this.props.accion.fecha}</h5>
                    </div>
                    <div className="col-auto">
                        <h5 className='text-dark'>{this.props.accion.agua} L de agua</h5>
                    </div>
                    <div className="col text-right">
                        <h5>
                            <div className="badge badge-pill badge-dark">
                                {this.props.accion.tipoDeRiego}
                            </div>
                        </h5>
                    </div>
                </div>
                <div className="row">
                    {console.log(this.props.accion)}
                    {Object.keys(this.props.accion.aditivos).map(aditivo=>(
                        <div className="col-auto">
                            <span className='badge badge-pill badge-dark'>
                                <div className="col-auto">
                                    {aditivo}
                                </div>
                                <div className="col-auto">
                                    {this.props.accion.aditivos[aditivo]} ml
                                </div>
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}
export default AccionDetallada