import React,{Fragment} from 'react'
import './styles/table.css'
import {database} from 'firebase'
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {DeleteOutline, EditOutlined,AddOutlined} from '@material-ui/icons'
import {IconButton,Grow, ListItemText,List,ListItem} from '@material-ui/core'
import {Link} from 'react-router-dom'

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
    },
    paperDark: {
        backgroundColor: theme.palette.primary.main,
        color:theme.palette.primary.contrastText,
        borderRadius:'0'
    },
    expansionPanel:{
        backgroundColor:'transparent'
    },
    expandIcon:{
        color:theme.palette.primary.contrastText
    },
    addButton:{
        marginBottom:theme.spacing(1),
        color:theme.palette.primary.contrastText
    },
    deleteButton:{
        color:theme.palette.error.main
    },
    deleteText:{
        color:theme.palette.error.main
    }
}));


export const TableAditivos = ({title,aditivos,user}) =>{
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
                        <Link to={{
                            pathname:'/Nuevo-Aditivo',
                            props:{
                                tipoDeAditivo:title
                            }
                        }}>
                            <Button 
                                variant='text' 
                                className={classes.addButton} 
                                startIcon={<AddOutlined/>}
                                >
                                    Nuevo {title==="Fertilizantes"?'Fertilizante':"Insecticida"}
                            </Button>
                        </Link>
                    </div>
                </div>
                {aditivos?
                    aditivos.map((aditivo,i)=>(
                    <div className="row">
                        <div className="col-12">
                        <Grow in={true}
                            {...(true ? { timeout: 1500 } : {})}>
                            <ExpansionPanel expanded={expanded === 'panel'+i} className={classes.expansionPanel}onChange={handleChange('panel'+i)}>
                                <Paper elevation={4} className={classes.paperDark}>
                                    <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon className={classes.expandIcon}/>}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                    >
                                        <Typography className={classes.heading}>{aditivo.nombre} <span className='badge badge-pill badge-dark'>{aditivo.marca}</span></Typography>
                                    </ExpansionPanelSummary>
                                </Paper>
                                <Paper elevation={6} className={classes.paperMain}>
                                    <ExpansionPanelDetails>
                                        <div className="container">
                                            {aditivo.descripcion &&
                                                <>
                                                    <div className="row mb-2">
                                                        <div className="col-12 text-center">
                                                            <Typography variant='h5'>
                                                                Descripcion
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col text-left">
                                                            <Typography variant='body2'>
                                                                {aditivo.descripcion}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                    <hr/>
                                                </>
                                            }
                                            <div className="row">
                                                <div className="col-12 text-center">
                                                    <Typography variant='h5'>
                                                        Dosificaciones
                                                    </Typography>
                                                </div>
                                            </div>
                                            {Object.keys(aditivo.dosis).map((tipoDeAplicacion,j)=>(
                                                <Fragment key={'tipoDeAplicacion'+j}>
                                                    <Typography  variant ='h6'>
                                                            {tipoDeAplicacion}
                                                    </Typography>
                                                    <List>
                                                        {Object.keys(aditivo.dosis[tipoDeAplicacion]).map((aplicacion,k)=>(
                                                            <ListItem>
                                                                <ListItemText primary={aplicacion} secondary={aditivo.dosis[tipoDeAplicacion][aplicacion]}/>
                                                            </ListItem> 
                                                        ))}
                                                    </List>
                                                </Fragment>
                                            ))}
                                            <hr/>
                                            <div className="row my-2 justify-content-around">
                                                <div className='d-flex flex-column justify-content-center align-items-center'>
                                                    <IconButton
                                                        variant="contained"
                                                        color="inherit"
                                                    >   
                                                        <EditOutlined />
                                                    </IconButton>
                                                    <Typography variant='caption'  gutterBottom>
                                                        Editar
                                                    </Typography>
                                                </div>
                                                <div className='d-flex flex-column justify-content-center align-items-center'>
                                                    <IconButton
                                                        variant="contained"
                                                        color="inherit"
                                                        onClick={e=>{eliminarAditivo(i)}}
                                                    >
                                                        <DeleteOutline className={classes.deleteButton}/>
                                                    </IconButton>
                                                    <Typography variant='caption' className={classes.deleteText} gutterBottom>
                                                        Eliminar
                                                    </Typography>
                                                </div>
                                            </div>
                                        </div>
                                    </ExpansionPanelDetails>
                                    </Paper>
                            </ExpansionPanel>
                        </Grow>
                        </div>
                    </div>
                    ))
                    :
                    <Typography>Aun no hay ningun Aditivo</Typography>
                }
            </div>
        </div>
    )
}