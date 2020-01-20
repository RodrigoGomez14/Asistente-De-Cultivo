import React , {Component} from 'react'
import {Accordion,Card,Button} from 'react-bootstrap'

class FormularioAccion extends Component{
    render(){
        return(
            <Accordion defaultActiveKey="0">
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant='link'  eventKey="2">
                                Cantidad de Agua y Aditivos
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="2">
                            <form action="">
                                <div className="form-row mt-4">
                                    <div className="form-group col-2 offset-5">
                                        <label htmlFor="inputLitos" className='text-dark'>Litros de Agua</label>
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
                                            <p className='text-dark'>Indicar Cantidades de {this.props.aditivo} (ml)</p>
                                        </div>
                                    </div>
                                    <div className="form-row mt-4 justify-content-center">
                                        {this.props.aditivos.map((aditivo,i)=>(
                                            <div className="form-group col-auto" key={'input'+i}>
                                                <label className='text-dark'>{aditivo}</label>
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
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
        )
    }
}
export default FormularioAccion