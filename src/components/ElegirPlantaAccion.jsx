import React , {Component} from 'react'
import CheckboxPlanta from './CheckboxPlanta'
import {Accordion,Card,Button} from 'react-bootstrap'

class ElegirPlantaAccion extends Component{
    render(){
        return(
            <Accordion defaultActiveKey="0">
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant='link' eventKey="0">
                                Elige Las Plantas
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <div className="row my-2 justify-content-center">
                                {this.props.plantas?
                                    Object.keys(this.props.plantas).map(key=>(
                                        <CheckboxPlanta checked={this.props.plantas[key]} llave={key} key={key} handleClick={e=>{
                                            this.props.seleccionarPlanta(key)
                                        }}/>
                                    ))
                                :
                                null
                                }
                            </div>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
        )
    }
}
export default ElegirPlantaAccion