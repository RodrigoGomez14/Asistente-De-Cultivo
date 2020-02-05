import React,{Fragment} from 'react'
import {Table,Accordion, Card,Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortDown, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { confirmAlert } from 'react-confirm-alert';
import {AlertNuevoAditivo} from '../alerts/AlertNuevoAditivo'
import 'react-confirm-alert/src/react-confirm-alert.css';
import './styles/table.css'
import {database} from 'firebase'
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'


const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    paperMain: {
        backgroundColor: theme.palette.secondary.light,
        color:theme.palette.secondary.contrastText
    },
    paperDark: {
        backgroundColor: theme.palette.secondary.main,
        color:theme.palette.secondary.contrastText
    },
    expansionPanel:{
        backgroundColor:'transparent'
    }
  }));


export const TableAditivos = ({title,aditivos,user}) =>{
    const alertNuevoAditivo=()=>confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <div className='custom-ui'>
                    <AlertNuevoAditivo
                        user={user}
                        aditivos={aditivos}
                        tipoDeAditivo={title}
                        onClose={onClose}
                    />
                </div>
            );
        }
    })
    const alertEditarAditivo=(aditivo)=>confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <div className='custom-ui'>
                    <AlertNuevoAditivo
                        user={user}
                        aditivos={aditivos}
                        tipoDeAditivo={title}
                        onClose={onClose}
                        aditivo={aditivo}
                    />
                </div>
            );
        }
    })
    const eliminarAditivo=async (id)=>{
        let newAditivos = aditivos
        newAditivos.splice(id,1)
        switch (title) {
            case "Fertilizantes":
                await database().ref().child(user).update({
                   fertilizantes:newAditivos
                })
                break;
            case "Insecticidas":
                await database().ref().child(user).update({
                    insecticidas:newAditivos
                })
                break;
            default:
                break;
        }
    }
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
  
    const handleChange = panel => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
    return(
        <div className='overflow-auto'>
            <div className="container mb-2">
                <div className="row">
                    <div className="col-auto ml-auto mr-auto">
                            <Button variant='outline-light mb-2' onClick={e=>{
                                    alertNuevoAditivo()
                                }}>
                                Nuevo {title==="Fertilizantes"?'Fertilizante':"Insecticida"}
                                <FontAwesomeIcon icon={faPlusCircle} className='ml-3'/>
                            </Button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                            {aditivos?
                                aditivos.map((aditivo,i)=>(
                                    <ExpansionPanel expanded={expanded === 'panel'+i} className={classes.expansionPanel}onChange={handleChange('panel'+i)}>
                                        <Paper elevation={4} className={classes.paperDark}>
                                            <ExpansionPanelSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1bh-content"
                                            id="panel1bh-header"
                                            >
                                                <Typography className={classes.heading}>{aditivo.nombre} <span className='badge badge-pill badge-dark'>{aditivo.marca}</span></Typography>
                                            </ExpansionPanelSummary>
                                        </Paper>
                                        <Paper elevation={4} className={classes.paperMain}>
                                            <ExpansionPanelDetails>
                                                <div className="container">
                                                    <div className="row">
                                                        <div className="col-12 text-center">
                                                            <strong>
                                                                Descripcion
                                                            </strong>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col text-left">
                                                            <small>
                                                                {aditivo.descripcion}
                                                            </small>
                                                        </div>
                                                    </div>
                                                    <hr/>
                                                    <div className="row">
                                                        <div className="col-12 text-center">
                                                            <strong>
                                                                Dosificacion
                                                            </strong>
                                                        </div>
                                                    </div>
                                                    {Object.keys(aditivo.dosis).map((tipoDeAplicacion,j)=>(
                                                        <Fragment key={'tipoDeAplicacion'+j}>
                                                            <div className="row mb-2 mt-2">
                                                                <div className="col-auto mr-auto">
                                                                    <span className='badge badge-pill badge-dark'>
                                                                        {tipoDeAplicacion}
                                                                    </span>
                                                                </div>
                                                            <hr/>
                                                            </div>
                                                            {Object.keys(aditivo.dosis[tipoDeAplicacion]).map((aplicacion,k)=>(
                                                                <div className="row" key={'dosis'+k}>
                                                                    <div className="col-auto mr-auto">
                                                                        {aplicacion}
                                                                    </div>
                                                                    <div className="col-auto ml-auto">
                                                                        {aditivo.dosis[tipoDeAplicacion][aplicacion]}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </Fragment>
                                                    ))}
                                                    <div className="row mt-4">
                                                        <div className="col-auto ml-auto mr-auto">
                                                            <button type='button' className='btn btn-dark' onClick={e=>{
                                                                alertEditarAditivo(aditivo)
                                                            }}>
                                                                Editar aditivo
                                                            </button>
                                                        </div>
                                                        <div className="col-auto ml-auto mr-auto">
                                                            <button type='button' className='btn btn-danger' onClick={e=>{
                                                                eliminarAditivo(i)
                                                            }}>
                                                                Eliminar aditivo
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </ExpansionPanelDetails>
                                            </Paper>
                                        </ExpansionPanel>
                                ))
                                :
                                <h1>Agrega {title}</h1>
                            }
                    </div>
                </div>
            </div>
        </div>
    )
}