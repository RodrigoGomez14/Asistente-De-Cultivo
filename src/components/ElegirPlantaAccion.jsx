import React , {Component,useState} from 'react'
import CheckboxPlanta from './CheckboxPlanta'
import {Row,Col,Accordion,Card} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSortDown} from '@fortawesome/free-solid-svg-icons'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {FormControl,InputLabel,Select,MenuItem,makeStyles,FormControlLabel,Checkbox,FormGroup} from '@material-ui/core'
import {Alert} from '@material-ui/lab/'
import {Link} from 'react-router-dom'
const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        width:"100% !important"
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    alert:{
        alignItems:'center',
    }
}));
export const ElegirPlantaAccion=({plantas,seleccionarPlanta})=>{
    const classes = useStyles()
    return(
        <Row>
            <Col sm={{span:8,offset:2}}>
                <div className="container">
                    <div className="row my-2 justify-content-center">
                        {plantas.length?
                        <FormGroup row>
                            {plantas.map((planta,i)=>(
                                <FormControlLabel
                                control={
                                    <Checkbox color='default' checked={planta.selected} onChange={e=>{
                                        seleccionarPlanta(i)}}
                                    value={planta.nombre} />
                                }
                                label={planta.nombre}
                                    />
                            ))}
                        </FormGroup>
                        :
                        <div className="col-12">
                            <Alert severity="warning" className={classes.alert}> <div>No hay Plantas En el Armario - <Link to='/Aplicables'>Agrega una ahora!</Link> </div> </Alert>
                        </div>
                        }
                    </div>
                </div>
            </Col>
        </Row>
    )
}
export default ElegirPlantaAccion