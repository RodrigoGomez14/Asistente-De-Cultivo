import React from 'react'
import * as firebase from 'firebase'
import {Grow, ListItem,List,ListItemText} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {DeleteOutline, EditOutlined} from '@material-ui/icons'
import {IconButton,ExpansionPanel,Divider} from '@material-ui/core'
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
    
    const eliminarAccion= async()=>{
        await firebase.database().ref().child(props.user).child('plantas').child(props.idPlanta).child(props.tipoDeAccion).child(props.id).remove()
    }
    return(
        <Grow in={true}
                {...(true ? { timeout: 1500 } : {})}>
            <ExpansionPanel expanded={props.expanded === 'panel'+props.index} className={classes.expansionPanel} onChange={props.handleChange('panel'+props.index)}>
                <Paper elevation={4} className={classes.paperDark}>
                    <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon className={classes.expandIcon}/>}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    >
                        <Typography className={classes.heading}>{`${props.tipoDeAccion==='fumigaciones'?props.tipoDeAccion.slice(0,props.tipoDeAccion.lastIndexOf('s')-1):props.tipoDeAccion.slice(0,props.tipoDeAccion.lastIndexOf('s'))} ${props.index+1}`}</Typography>
                    </ExpansionPanelSummary>
                </Paper>
                <Paper elevation={4} >
                    <ExpansionPanelDetails>
                        <div className="container p-0">
                            {props.accion.agua &&
                                <div className="row">
                                    <List>
                                        <ListItem>
                                            <ListItemText
                                                className={classes.listItemText}
                                                primary={'Cantidad de Agua'}
                                                secondary={`${props.accion.agua} L.`} 
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText
                                                className={classes.listItemText}
                                                primary={'Tipo de Riego'}
                                                secondary={props.accion.tipoDeRiego} 
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText
                                                className={classes.listItemText}
                                                primary={'Nivel de pH'}
                                                secondary={props.accion.ph?props.accion.ph:'-'} 
                                            />
                                        </ListItem>
                                    </List>
                                </div>
                            }
                            {props.accion.tipoDePoda &&
                                <div className="row">
                                    <List>
                                        <ListItem>
                                            <ListItemText
                                                className={classes.listItemText}
                                                primary={'Tipo de Poda'}
                                                secondary={props.accion.tipoDePoda} 
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText
                                                className={classes.listItemText}
                                                primary={'Descripcion'}
                                                secondary={props.accion.descripcion} 
                                            />
                                        </ListItem>
                                    </List>
                                </div>
                            }
                            {props.accion.volumenMaceta &&
                                <div className="row">
                                    <List>
                                        <ListItem>
                                            <ListItemText
                                                className={classes.listItemText}
                                                primary={'Nuevo Volumen de maceta'}
                                                secondary={`${props.accion.volumenMaceta} Lt.`} 
                                            />
                                        </ListItem>
                                    </List>
                                </div>
                            }
                            <Divider/>
                            {props.tipoDeAccion!=='podas' && props.tipoDeAccion!=='transplantes' && 
                                <div className="row my-2">
                                    {props.accion.aditivos?
                                        <>
                                            <div className="col-12 text-center">
                                                <Typography variant='h5'>
                                                    Aditivos Usados
                                                </Typography>
                                            </div>
                                            <List>
                                                {Object.keys(props.accion.aditivos).map((aditivo,i)=>(
                                                    <>
                                                        <ListItem>
                                                            <ListItemText
                                                                key={`aditivo ${i}`}
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
                                                <EditOutlined />
                                        </IconButton>
                                        <Typography variant='caption' gutterBottom>
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
    )
}