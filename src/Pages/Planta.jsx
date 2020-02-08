import React,{useState}from 'react'
import {Layout} from './Layout'
import {DetallePlanta} from '../alert-components/DetallePlanta'
import {DetalleAcciones} from '../alert-components/DetalleAcciones'
import {Redirect} from 'react-router-dom'
import {DeleteOutline, EditOutlined, CheckCircle,ExpandMore} from '@material-ui/icons'
import {IconButton,Button,ButtonGroup,makeStyles,TextField,Paper,ExpansionPanel,ExpansionPanelSummary,Typography,ExpansionPanelDetails} from '@material-ui/core'
import {database} from 'firebase'
import moment from 'moment'

const useStyles=makeStyles(theme=>({
    button:{
        color:theme.palette.primary.contrastText,
        textShadow:'1px 1px 10px black'
    },
    buttonText:{
        color:theme.palette.primary.contrastText,
        textShadow:'1px 1px 10px black'
    },
    buttonDanger:{
        color:theme.palette.primary.contrastText,
        textShadow:`1px 1px 20px ${theme.palette.danger}`
    },
    buttonTextDanger:{
        color:theme.palette.primary.contrastText,
        textShadow:`1px 1px 20px ${theme.palette.danger}`
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    ExpansionPanelDetails:{
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center'
    }
}))

export const Planta =(props)=>{
    const classes = useStyles()
    let [collapseInputCantidad,setCollapseInputCantidad] = useState(false)
    let [inputCantidad, setInputCantidad]= useState(undefined)
    const cosecharPlanta=async ()=>{
        await database().ref().child(props.location.props.user).child('historial').child(props.location.props.id).update({
            nombre:props.location.props.nombre?props.location.props.nombre:null,
            nacimiento:props.location.props.nacimiento?props.location.props.nacimiento:null,
            genetica:props.location.props.genetica?props.location.props.genetica:null,
            inicioVegetativo:props.location.props.inicioVegetativo?props.location.props.inicioVegetativo:null,
            inicioFloracion:props.location.props.inicioFloracion?props.location.props.inicioFloracion:null,
            podas:props.location.props.podas?props.location.props.podas:null,
            riegos:props.location.props.riegos?props.location.props.riegos:null,
            fumigaciones:props.location.props.fumigaciones?props.location.props.fumigaciones:null,
            fechaDeCorte:moment().format('LLL')
        })
        await database().ref().child(props.location.props.user).child('plantas').child(props.location.props.id).remove()
        props.location.props.history.goBack()
    }
    const guardarCantidadCosechada=async ()=>{
        await database().ref().child(props.location.props.user).child('historial').child(props.location.props.id).update({
            cantidadDeGramos:inputCantidad+' gr'
        })
        props.location.props.history.goBack()
    }
    return(
        props.location.props?
            <Layout history={props.history} page={props.location.props.nombre}>
                <div className="container-fluid accion">
                    <div className="row">
                        <DetallePlanta 
                            genetica={props.location.props.genetica}
                            cantidadDeGramos={props.location.props.cantidadDeGramos}
                            plantaDelHistorial={props.location.props.plantaDelHistorial}
                            edad={props.location.props.edad}
                            nacimiento={props.location.props.nacimiento}
                            inicioVegetativo={props.location.props.inicioVegetativo}
                            inicioFloracion={props.location.props.inicioFloracion}
                            fechaDeCorte={props.location.props.fechaDeCorte}
                        />
                        <DetalleAcciones
                            {...props.location.props}
                        />
                    </div>
                    {props.location.props.plantaDelHistorial && !props.location.props.cantidadDeGramos &&
                        <div className="row my-2 justify-content-center">
                            <div className="col-6 offset-3">
                                <ExpansionPanel>
                                    <ExpansionPanelSummary
                                    expandIcon={<ExpandMore />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    >
                                        <Typography className={classes.heading}>Ingresar Cantidad Cosechada</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails className={classes.ExpansionPanelDetails}>
                                        <TextField id="outlined-basic" 
                                            value={inputCantidad}
                                            label="Cantidad Cosechada (gr)" 
                                            variant="outlined"
                                            onChange={e=>{
                                                setInputCantidad(e.target.value)
                                            }}
                                        />
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={e=>{
                                                guardarCantidadCosechada()
                                            }}
                                            endIcon={
                                                <CheckCircle/>
                                            }
                                            >
                                            Guardar 
                                        </Button>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </div>
                        </div>
                    }
                    {!props.location.props.plantaDelHistorial &&
                        <div className="row my-2 justify-content-around">
                            <Button
                                variant="contained"
                                color={{xs:'primary',md:'secondary'}}
                                onClick={cosecharPlanta}
                                endIcon={
                                    <DeleteOutline/>
                                }
                                >
                                Cosechar
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={props.location.props.alertEliminarPlanta}
                                endIcon={
                                    <EditOutlined/>
                                }
                            >   
                                Editar
                            </Button>                 
                            <Button
                                variant="contained"
                                color="secondary"
                                endIcon={
                                    <DeleteOutline/>
                                }>
                                    Eliminar
                            </Button>
                        </div>
                    }
                </div>
            </Layout>
            :
            <Redirect to='/'/>
    )
}