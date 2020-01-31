import React, {Component} from 'react'
import {Row,Col,Accordion,Card} from 'react-bootstrap'
import './styles/accion-card.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSortDown} from '@fortawesome/free-solid-svg-icons'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class ElegirTipoDeRiego extends Component{
    render(){
        return(
            <Row>
                <Col sm={{span:8,offset:2}}>
                <ExpansionPanel expanded={this.props.expanded === 'panel2'} onChange={e=>{
                    this.props.setExpansionExpanded('panel2')
                }}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <div className="row">
                            <div className="col-auto">
                                <Typography>
                                    Elige El tipo de Riego 
                                </Typography>
                            </div>
                            <div className="col-auto mr-auto">
                                <Typography>
                                    {this.props.tipoDeRiego?<strong>({this.props.tipoDeRiego})</strong>:null}
                                </Typography>
                            </div>
                        </div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
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
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                </Col>
            </Row>
        )
    }
}
export default ElegirTipoDeRiego