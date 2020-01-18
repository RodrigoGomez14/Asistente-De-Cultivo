import React , {Component} from 'react'

class FormularioAccion extends Component{
    render(){
        return(
            <form action="">
                <div className="form-row mt-4">
                    <div className="form-group col-2 offset-5">
                        <label htmlFor="inputLitos">Litros de Agua</label>
                        <input type="number"
                            onChange={e=>{
                                this.props.cambiarLitrosDeAgua(e.target.value)
                            }} 
                            value={this.props.cantidadDeAgua} 
                            className='form-control' 
                            id='inputLitros'/>
                    </div>
                </div>
                {this.props.aditivos?
                <>
                    <div className="form-row">
                        <div className="col-auto">
                            <p>Indicar Cantidades de {this.props.aditivo} (ml)</p>
                        </div>
                    </div>
                    <div className="form-row mt-4 justify-content-center">
                        {this.props.aditivos.map((aditivo,i)=>(
                            <div className="form-group col-auto" key={'input'+i}>
                                <label >{aditivo}</label>
                                <input type="number" 
                                    className='form-control' 
                                    onChange={e=>{
                                        this.props.cambiarAditivo([aditivo],e.target.value)
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </>
                :
                null
                }
                <div className="form-row mt-4">
                    <div className="form-group col-6 offset-3">
                        <label htmlFor="inputTextArea">Comentario del Riego</label>
                        <textarea type="text" className='form-control' id='inputTextArea'/>
                    </div>
                </div>
            </form>
        )
    }
}
export default FormularioAccion