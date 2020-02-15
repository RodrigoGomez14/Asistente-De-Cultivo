import React , {useState,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faSortDown} from '@fortawesome/free-solid-svg-icons'
import * as firebase from 'firebase'
import {Accordion,Card} from 'react-bootstrap'
import {Grow, ListItem,List,ListItemText} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {DeleteOutline, EditOutlined} from '@material-ui/icons'
import {IconButton,ButtonGroup,ExpansionPanel,Divider} from '@material-ui/core'
const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      color:theme.palette.primary.contrastText
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    paperMain: {
        backgroundColor: theme.palette.secondary.light,
        color:theme.palette.primary.contrastText
    },
    paperDark: {
        backgroundColor:theme.palette.primary.main,
        borderRadius:'0'
    },
    edit:{
        color:theme.palette.primary.contrastText,
    },
    delete:{
        color:theme.palette.error.main
    },
    expansionPanel:{
        backgroundColor:'transparent'
    },
    button:{
        color:theme.palette.primary.contrastText,
    },
    buttonText:{
        color:theme.palette.secondary.contrastText,
    },
    expandIcon:{
        color:theme.palette.primary.contrastText
    },
    listItemText:{
        '& .MuiTypography-colorTextSecondary':{
            color:theme.palette.primary.contrastText
        }
    }
  }));
export const AccionDetallada=(props)=>{
    const classes= useStyles()
    let [show,setShow] = useState(false)
    
    const eliminarAccion= async()=>{
        await firebase.database().ref().child(props.user).child('plantas').child(props.idPlanta).child(props.tipoDeAccion).child(props.id).remove()
    }
    
    useEffect(() => {
        setTimeout(() => {
            setShow(true)
        }, 100);
    })
    return(
        <div className="row">
            <div className="col-10 offset-1">
                <Grow in={true}
                        {...(true ? { timeout: 1500 } : {})}>
                    <ExpansionPanel expanded={props.expanded === 'panel'+props.index} className={classes.expansionPanel} onChange={props.handleChange('panel'+props.index)}>
                        <Paper elevation={4} className={classes.paperDark}>
                            <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon className={classes.expandIcon}/>}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                            >
                                <Typography className={classes.heading}>{props.accion.fecha}</Typography>
                            </ExpansionPanelSummary>
                        </Paper>
                        <Paper elevation={4} className={classes.paperMain}>
                            <ExpansionPanelDetails>
                                <div className="container">
                                    {props.accion.agua &&
                                        <div className="row">
                                            <div className="col-12 text-center">
                                                <Typography variant='h5'>
                                                    {props.accion.agua} L. De Agua 
                                                </Typography>
                                            </div>
                                        </div>
                                    }
                                    {props.accion.tipoDeRiego &&
                                        <div className="row my-2">
                                            <div className="col-12 text-center">
                                                <Typography variant='h5'>
                                                    {props.accion.tipoDeRiego==='Tierra'?' en Tierra':' Foliar'}
                                                </Typography>
                                            </div>
                                        </div>
                                    }
                                    {props.accion.tipoDePoda &&
                                        <div className="col text-left">
                                            <Typography variant='h5'>
                                                Poda {props.accion.tipoDePoda}
                                            </Typography>
                                        </div>
                                    }
                                    {props.accion.volumenMaceta &&
                                        <div className="col text-left">
                                            <Typography variant='h5'>
                                                Nuevo Volumen {props.accion.volumenMaceta} Lt
                                            </Typography>
                                        </div>
                                    }
                                    <Divider/>
                                    {props.tipoDeAccion!=='podas' && props.tipoDeAccion!=='transplantes' && 
                                        <div className="row my-2">
                                            {props.accion.aditivos?
                                                <>
                                                    <div className="col-12 text-left">
                                                        <Typography variant='h5'>
                                                            Aditivos Usados
                                                        </Typography>
                                                    </div>
                                                    <List>
                                                        {Object.keys(props.accion.aditivos).map((aditivo,i)=>(
                                                            <>
                                                                <ListItem>
                                                                    <ListItemText
                                                                        className={classes.listItemText}
                                                                        primary={aditivo}
                                                                        secondary={props.accion.aditivos[aditivo]+' ml'} 
                                                                    />
                                                                </ListItem>
                                                            </>
                                                        ))}
                                                    </List>
                                                </>
                                                :
                                                <div className="col-12 text-center">
                                                    <Typography>
                                                        No se utilizaron Aditivos
                                                    </Typography>
                                                </div>
                                            }
                                        </div>
                                    }
                                    <Divider/>
                                    {!props.plantaDelHistorial &&
                                        <div className="row my-2 justify-content-around">
                                            <div className='d-flex flex-column justify-content-center align-items-center'>
                                                <IconButton
                                                    variant="contained"
                                                    color="inherit"
                                                >   
                                                        <EditOutlined className={classes.edit}/>
                                                </IconButton>
                                                <Typography variant='caption' className={classes.edit} gutterBottom>
                                                    Editar
                                                </Typography>
                                            </div>
                                            <div className='d-flex flex-column justify-content-center align-items-center'>
                                                <IconButton
                                                    variant="contained"
                                                    color="inherit"
                                                    onClick={e=>{eliminarAccion()}}
                                                >
                                                        <DeleteOutline className={classes.delete}/>
                                                </IconButton>
                                                <Typography variant='caption' className={classes.delete} gutterBottom>
                                                    Eliminar
                                                </Typography>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </ExpansionPanelDetails>
                        </Paper>
                    </ExpansionPanel>
                </Grow>
            </div>
        </div>
    )
}