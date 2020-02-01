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
                </Col>
            </Row>
        )
    }
}
export default ElegirPlantaAccion