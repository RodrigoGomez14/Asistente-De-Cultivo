import React,{useState}from 'react'
import {Layout} from './Layout'
import {DetallePlanta} from '../components/DetallePlanta'
import {DetalleAcciones} from '../components/DetalleAcciones'
import {Redirect} from 'react-router-dom'
import {makeStyles,GridListTile,CardMedia,Paper,GridList, Divider,Button,Grow} from '@material-ui/core'
import {Alert,AlertTitle} from '@material-ui/lab'
import {database} from 'firebase'
import moment from 'moment'
import { BotoneraConfiguracionPlanta } from '../components/BotoneraConfiguracionPlanta'
import fotoPlanta from '../images/apple cookies.jpg'
import {InputCantidadCosechada} from '../components/InputCantidadCosechada'
import {connect} from 'react-redux'

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
    },
    alert:{
        marginTop:theme.spacing(1),
        '& .MuiAlert-message':{
            width:'100%'
        }
    }
}))
const getFullDate=()=>{
    const date = new Date
    const year = date.getFullYear()
    let month = date.getMonth()+1
    month = month<10?month=`0${month}`:month
    const days = date.getDate()
    return`${days}/${month}/${year}`
}
const PlantaHistorial =(props)=>{
    const classes = useStyles()
    let [inputCantidad, setInputCantidad]= useState(undefined)
    let [iniciarVegetativo, setIniciarVegetativo]= useState(false)
    const guardarCantidadCosechada=async ()=>{
        await database().ref().child(props.user.uid).child('historial').child(props.location.props.id).update({
            cantidadDeGramos:inputCantidad+' gr'
        })
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
    /*
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
    */
    return(
        props.location.props?
            <Layout history={props.history} page={props.plantas[props.location.props.id].nombre} plantaDelHistorial={true} plantaId={props.location.props.id} user={props.user.uid} userVerification={props.user.emailVerified}>
                <Paper elevation={3} className={classes.root}>
                    <div className="container-fluid">
                        <div className="row flex-nowrap overflow-auto">
                            <DetallePlanta 
                                genetica={props.plantas[props.location.props.id].genetica}
                                cantidadDeGramos={props.plantas[props.location.props.id].cantidadDeGramos}
                                plantaDelHistorial={true}
                                edad={props.plantas[props.location.props.id].edad}
                                nacimiento={props.plantas[props.location.props.id].nacimiento}
                                inicioVegetativo={props.plantas[props.location.props.id].inicioVegetativo}
                                inicioFloracion={props.plantas[props.location.props.id].inicioFloracion}
                                fechaDeCorte={props.plantas[props.location.props.id].fechaDeCorte}
                                volumenMaceta={props.plantas[props.location.props.id].volumenMaceta}
                            />
                        </div>
                        <div className="row">
                            {!props.plantas[props.location.props.id].cantidadDeGramos &&
                                <InputCantidadCosechada inputCantidad={inputCantidad} setInputCantidad={setInputCantidad} guardarCantidadCosechada={guardarCantidadCosechada} />
                            }
                        </div>
                        <div className="row">
                            <DetalleAcciones
                                history={props.history}
                                id={props.location.props.id}
                            />
                        </div>
                    </div>
                </Paper>
            </Layout>
            :
            <Redirect to='/'/>
    )
}
const mapStateToProps=state=>({
    user:state.user,
    plantas:state.data.historial
})
export default connect(mapStateToProps,null)(PlantaHistorial)