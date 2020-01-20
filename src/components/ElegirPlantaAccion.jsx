import React , {Component} from 'react'
import CheckboxPlanta from './CheckboxPlanta'
import {Row,Col,Accordion,Card,Button} from 'react-bootstrap'

class ElegirPlantaAccion extends Component{
    render(){
        let selectedPlants= {}
        if(this.props.plantas){
            Object.keys(this.props.plantas).map(key=>{
                if(this.props.plantas[key].selected){
                    selectedPlants[this.props.plantas[key].nombre]=true
                }
            })
        }
        return(
            <Row>
                <Col sm={{span:8,offset:2}}>
                    <Accordion defaultActiveKey="0">
                        <Card>
                            <button className='btn btn-link'>
                                <Accordion.Toggle as={Card.Header} className={Object.keys(selectedPlants).length?'text-light bg-success':'text-dark'} eventKey="0" role='button'>
                                    Elige Las Plantas
                                    <div className="row">
                                        {selectedPlants?
                                        Object.keys(selectedPlants).map(nombre=>(
                                            <div className="col-auto">
                                                <span className='badge badge-pill badge-light p-2'>
                                                    {nombre}
                                                </span>
                                            </div>
                                        ))
                                        :
                                        null
                                        }
                                    </div>
                                </Accordion.Toggle>
                            </button>
                            <Accordion.Collapse eventKey="0">
                                <div className="row my-2 justify-content-center">
                                    {this.props.plantas?
                                        Object.keys(this.props.plantas).map(key=>(
                                            <CheckboxPlanta checked={this.props.plantas[key].selected} llave={key} key={key} handleClick={e=>{
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
                </Col>
            </Row>
        )
    }
}
export default ElegirPlantaAccion