import React, {Component} from 'react'
import {Accordion,Card,Button} from 'react-bootstrap'

class ElegirTipoDeRiego extends Component{
    render(){
        return(
            <Accordion defaultActiveKey="0">
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant='link'  eventKey="1">
                                Elige El tipo de Riego
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                            <div className="row my-2">
                                <div className="col text-center">
                                    <button type='button' className={this.props.tipoDeRiego==='Tierra'?'btn btn-success':'btn btn-outline-dark'} onClick={e=>{this.props.cambiarTipoDeRiego('Tierra')}}>
                                        Tierra
                                    </button>
                                </div>
                                <div className="col text-center">
                                    <button type='button' className={this.props.tipoDeRiego==='Foliar'?'btn btn-success':'btn btn-outline-dark'} onClick={e=>{this.props.cambiarTipoDeRiego('Foliar')}}>
                                        Foliar
                                    </button>
                                </div>
                            </div>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
        )
    }
}
export default ElegirTipoDeRiego