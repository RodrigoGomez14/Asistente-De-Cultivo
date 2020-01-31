import React , {Component} from 'react'
import CheckboxPlanta from './CheckboxPlanta'
import {Row,Col,Accordion,Card} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSortDown} from '@fortawesome/free-solid-svg-icons'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
class ElegirPlantaAccion extends Component{
    render(){
        let selectedPlants= {}
        if(this.props.plantas){
            Object.keys(this.props.plantas).map(key=>{
                if(this.props.plantas[key].selected){
                    selectedPlants[this.props.plantas[key].nombre]=true
                }
                return null
            })
        }
        return(
            <Row>
                <Col sm={{span:8,offset:2}}>
                <ExpansionPanel expanded={this.props.expanded === 'panel1'} onChange={e=>{
                    this.props.setExpansionExpanded('panel1')
                }}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <div className="container">
                            <div className="row">
                                <div className="col-auto">
                                    <Typography>
                                        Elige Las Plantas
                                    </Typography>
                                </div>
                                <div className="col-auto">
                                    <div className="container">
                                        <div className="row">
                                            {selectedPlants?
                                            Object.keys(selectedPlants).map((nombre,i)=>(
                                                <div className="col-auto mx-2" key={'selectedPlant'+i}>
                                                    <Typography>
                                                        <span className='badge badge-pill badge-dark p-2'>
                                                            {nombre}
                                                        </span>
                                                    </Typography>
                                                </div>
                                            ))
                                            :
                                            null
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div className="container">
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
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                </Col>
            </Row>
        )
    }
}
export default ElegirPlantaAccion