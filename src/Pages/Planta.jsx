import React,{useState}from 'react'
import {Layout} from './Layout'
import {DetallePlanta} from '../components/DetallePlanta'
import {DetalleAcciones} from '../components/DetalleAcciones'
import {Redirect} from 'react-router-dom'
import {makeStyles,GridListTile,CardMedia,Paper,GridList, Divider} from '@material-ui/core'
import {database} from 'firebase'
import moment from 'moment'
import { BotoneraConfiguracionPlanta } from '../components/BotoneraConfiguracionPlanta'
import fotoPlanta from '../images/apple cookies.jpg'
import {InputCantidadCosechada} from '../components/InputCantidadCosechada'


const useStyles=makeStyles(theme=>({
    root:{
        height:'100%',
        width:'100%',
        display:'flex',
        flexDirection:'column',
        backgroundColor:theme.palette.type==='dark'?theme.palette.secondary.main:theme.palette.primary.dark,
        borderRadius:'0',
        overflow:'auto'
    },
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
    paperPrimary:{
        width:'100%',
        height:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    gridList: {
        flexWrap: 'nowrap',
        width:'100%',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
        '& .MuiGridListTile-root':{
            width:'30% !important'
        }
    },
    media: {
        height:'100%'
    },
    rightPanel:{
        display:'flex',
        flexDirection:'column',
        height:'100%',
        justifyContent:'space-between',
        padding:theme.spacing(1),
    },
    rowBotonera:{
        width:'100%',
        flexGrow:'1',
        display:'flex'
    }
}))

export const Planta =(props)=>{
    const classes = useStyles()
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
    const eliminarPlanta=async ()=>{
        await database().ref().child(props.location.props.user).child('plantas').child(props.location.props.id).remove()
        props.location.props.history.replace('/')
    }
    const tileData=[
        {
            img:fotoPlanta,
        },
        {
            img:fotoPlanta,
        },
        {
            img:fotoPlanta,
        },
        {
            img:fotoPlanta,
        },{
            img:fotoPlanta,
        }
        ,{
            img:fotoPlanta,
        },
        {
            img:fotoPlanta,
        }
    ]
    return(
        props.location.props?
            <Layout history={props.history} page={props.location.props.nombre} user={props.location.props.user}>
                <Paper elevation={3} className={classes.root}>
                    <div className="container-fluid">
                        <div className="row">
                            <GridList className={classes.gridList} cols={2.5}>
                                {tileData.map(tile => (
                                <GridListTile key={tile.img} className={classes.tile}>
                                    <CardMedia
                                        className={classes.media}
                                        image={fotoPlanta}
                                    />
                                </GridListTile>
                                ))}
                            </GridList>
                        </div>
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
                                volumenMaceta={props.location.props.volumenMaceta}
                            />
                        </div>
                        <div className="row">
                            {props.location.props.plantaDelHistorial && !props.location.props.cantidadDeGramos &&
                                <InputCantidadCosechada inputCantidad={inputCantidad} setInputCantidad={setInputCantidad} guardarCantidadCosechada={guardarCantidadCosechada} />
                            }
                        </div>
                        <div className="row">
                            <DetalleAcciones
                                {...props.location.props}
                            />
                        </div>
                        <Divider/>
                        <div className="row">
                            {!props.location.props.plantaDelHistorial &&
                                <div className={classes.rowBotonera}>
                                    <BotoneraConfiguracionPlanta
                                        inicioFloracion={props.location.props.inicioFloracion}
                                        cosecharPlanta={cosecharPlanta}
                                        eliminarPlanta={eliminarPlanta}
                                    />
                                </div>
                            }
                        </div>
                        <Divider/>
                    </div>
                </Paper>
            </Layout>
            :
            <Redirect to='/'/>
    )
}