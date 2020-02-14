import React , {Component,Fragment,useRef} from 'react'
import {Row,Col,Form,Container} from 'react-bootstrap'
import {PopOver} from './Popover'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSortDown} from '@fortawesome/free-solid-svg-icons'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {Alert,AlertTitle} from '@material-ui/lab';
import {FormControl,InputLabel,Select,MenuItem,makeStyles} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
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
    },
    title:{
        color: theme.palette.primary.contrastText,
        marginTop:theme.spacing(1)
    }
  }));
export const FormularioAccion=(props)=>{
    const classes = useStyles()
    return(
        <Row>
            <Col sm={{span:8,offset:2}}>
                <Container fluid className='pt-4'>
                    <Form>  
                        <Form.Row sm={{span:4,offset:4}} className='justify-content-center align-items-center'>
                            <TextField id="outlined-basic" type='number' value={props.cantidadDeAgua} label="Litros de Agua" variant="outlined" onChange={e=>{
                                props.cambiarLitrosDeAgua(e.target.value)
                                if(!e.target.value){
                                    props.eliminarListaDeAditivos()
                                }
                            }}/>
                        </Form.Row>
                        <Form.Row className='justify-content-center align-items-center flex-column'>
                            <div className="form-row">
                                <div className="col-auto">
                                    <Typography variant='h6' className={classes.title}>Aditivos (ml)</Typography>
                                </div>
                            </div>
                            <div className="container">
                                <div className="form-row mt-4 justify-content-start w-80`">
                                    {props.aditivos?
                                        props.aditivos.map((aditivo,i)=>(
                                        aditivo.dosis[props.tipoDeRiego]?
                                            <Fragment key={'input'+i}>  
                                                <div className="form-group col-12 col-sm-6 cols-md-4">
                                                    <FormControl className={classes.formControl} >
                                                        <InputLabel  id="emo-simple-select-helper-label">
                                                            {aditivo.nombre}
                                                        </InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-helper-label"
                                                            id="demo-simple-select-helper"
                                                            disabled={!props.cantidadDeAgua}
                                                            onChange={e=>{
                                                                if(e.target.value){
                                                                    props.cambiarAditivo([aditivo.nombre],e.target.value)
                                                                }
                                                                else{
                                                                    props.eliminarAditivo([aditivo.nombre])
                                                                }
                                                            }}
                                                        >
                                                        <MenuItem value=''>-</MenuItem>
                                                                {Object.keys(aditivo.dosis[props.tipoDeRiego]).map(key=>(
                                                                    <MenuItem value={aditivo.dosis[props.tipoDeRiego][key]}>{aditivo.dosis[props.tipoDeRiego][key]} {key}</MenuItem>
                                                                ))}
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                            </Fragment>
                                            :
                                            null
                                        ))
                                        :
                                        <div className="col-12">
                                            <Alert severity="warning" variant='outlined' className={classes.alert}> <AlertTitle>No hay Aditivos disponibles - <Link to='/Aplicables'>Agrega uno ahora!</Link> </AlertTitle> </Alert>
                                        </div>
                                    }
                                </div>
                            </div>
                        </Form.Row>
                    </Form>
                </Container>
            </Col>
        </Row>
    )
}