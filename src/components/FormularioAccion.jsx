import React , {Component,Fragment} from 'react'
import {Row,Col,Form,Accordion,Card,InputGroup} from 'react-bootstrap'
import {PopOver} from './Popover'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSortDown} from '@fortawesome/free-solid-svg-icons'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
class FormularioAccion extends Component{
    render(){
        return(
            <Row>
                <Col sm={{span:8,offset:2}}>
                <ExpansionPanel expanded={this.props.expanded === 'panel3'} onChange={e=>{
                    this.props.setExpansionExpanded('panel3')
                }}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >    
                        <Typography>
                            Cantidad de Agua y Aditivos
                        </Typography>
                        <div className="row">
                            <div className="col-12 text-center">
                                {this.props.cantidadDeAgua?
                                    <Typography>
                                        {this.props.cantidadDeAgua} L
                                    </Typography>
                                    :
                                    null
                                }
                            </div>
                            <div className="col-auto">
                                {this.props.aditivosUsados?
                                    <Typography className="col-auto">
                                        {Object.keys(this.props.aditivosUsados).map((aditivo,i)=>{
                                            const cantidad = this.props.aditivosUsados[aditivo]
                                            return(
                                                <span className='badge badge-pill badge-light mr-2 p-2' key={'aditivo'+i}>
                                                    {aditivo} {parseFloat(cantidad.slice(0,cantidad.indexOf(' '))*this.props.cantidadDeAgua).toFixed(2)} ml
                                                </span>
                                            )
                                        })}
                                    </Typography>
                                    :
                                    null}
                            </div>
                        </div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Form>  
                            <Form.Row sm={{span:4,offset:4}} className='justify-content-center align-items-center'>
                                <Form.Group>
                                    <Form.Label  className='text-dark'>Litros de Agua</Form.Label>
                                    <Form.Control type="number"
                                        onChange={e=>{
                                            this.props.cambiarLitrosDeAgua(e.target.value)
                                            if(!e.target.value){
                                                this.props.eliminarListaDeAditivos()
                                            }
                                        }} 
                                        value={this.props.cantidadDeAgua}
                                        id='inputLitros'/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row className='justify-content-center align-items-center flex-column'>
                                {this.props.aditivos&&this.props.cantidadDeAgua?
                                    <>
                                        <div className="form-row">
                                            <div className="col-auto">
                                                <p className='text-dark'>Aditivos (ml)</p>
                                            </div>
                                        </div>
                                        <div className="container">
                                            <div className="form-row mt-4 justify-content-start w-80`">
                                                {this.props.aditivos.map((aditivo,i)=>(
                                                    aditivo.dosis[this.props.tipoDeRiego]?
                                                        <Fragment key={'input'+i}>  
                                                            <div className="form-group col-4">
                                                                <Form.Group>
                                                                    <Form.Label>
                                                                        <PopOver aditivo={aditivo} cantidadDeAgua={this.props.cantidadDeAgua}/>
                                                                    </Form.Label>
                                                                    <Form.Control as='select' type="number"
                                                                        onChange={e=>{
                                                                            if(e.target.value){
                                                                                this.props.cambiarAditivo([aditivo.nombre],e.target.value)
                                                                            }
                                                                            else{
                                                                                this.props.eliminarAditivo([aditivo.nombre])
                                                                            }
                                                                        }}
                                                                    >
                                                                        <option value="">-</option>
                                                                            {Object.keys(aditivo.dosis[this.props.tipoDeRiego]).map(key=>(
                                                                                <option value={aditivo.dosis[this.props.tipoDeRiego][key]}> {aditivo.dosis[this.props.tipoDeRiego][key]} {key}</option>
                                                                            ))}
                                                                    </Form.Control>
                                                                </Form.Group>
                                                            </div>
                                                        </Fragment>
                                                        :
                                                        null
                                                    ))}
                                            </div>
                                        </div>
                                    </>
                                    :
                                    null
                                }
                            </Form.Row>
                        </Form>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                </Col>
            </Row>
        )
    }
}
export default FormularioAccion