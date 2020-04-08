import React,{useState}from 'react'
import {Layout} from './Layout'
import {DetallePlanta} from '../components/DetallePlanta'
import {DetalleAcciones} from '../components/DetalleAcciones'
import {Redirect} from 'react-router-dom'
import {makeStyles,Paper,Divider,Button,Grow} from '@material-ui/core'
import {Alert,AlertTitle} from '@material-ui/lab'
import {database} from 'firebase'
import { BotoneraConfiguracionPlanta } from '../components/BotoneraConfiguracionPlanta'
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
        marginTop:'auto',
        width:'100%',
        flexGrow:'1',
        display:'flex'
    },
    alert:{
        marginTop:theme.spacing(1),
        '& .MuiAlert-message':{
            width:'100%'
        }
    },
    paperTile:{
        width:'100% !important',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center'
    }
}))
const getFullDate=()=>{
    const date = new Date()
    const year = date.getFullYear()
    let month = date.getMonth()+1
    month = month<10?month=`0${month}`:month
    const days = date.getDate()
    return`${days>=10?days:`0${days}`}/${month}/${year}`
}
const Planta =(props)=>{
    const classes = useStyles()
    let [iniciarVegetativo, setIniciarVegetativo]= useState(false)
    const cosecharPlanta=async ()=>{
        await database().ref().child(props.user.uid).child('historial').child(props.location.props.id).update({
            nombre:props.plantas[props.location.props.id].nombre?props.plantas[props.location.props.id].nombre:null,
            nacimiento:props.plantas[props.location.props.id].nacimiento?props.plantas[props.location.props.id].nacimiento:null,
            genetica:props.plantas[props.location.props.id].genetica?props.plantas[props.location.props.id].genetica:null,
            inicioVegetativo:props.plantas[props.location.props.id].inicioVegetativo?props.plantas[props.location.props.id].inicioVegetativo:null,
            inicioFloracion:props.plantas[props.location.props.id].inicioFloracion?props.plantas[props.location.props.id].inicioFloracion:null,
            podas:props.plantas[props.location.props.id].podas?props.plantas[props.location.props.id].podas:null,
            riegos:props.plantas[props.location.props.id].riegos?props.plantas[props.location.props.id].riegos:null,
            fumigaciones:props.plantas[props.location.props.id].fumigaciones?props.plantas[props.location.props.id].fumigaciones:null,
            transplantes:props.plantas[props.location.props.id].transplantes?props.plantas[props.location.props.id].transplantes:null,
            inicioRevegetacion:props.plantas[props.location.props.id].inicioRevegetacion?props.plantas[props.location.props.id].inicioRevegetacion:null,
            segundaFloracion:props.plantas[props.location.props.id].segundaFloracion?props.plantas[props.location.props.id].segundaFloracion:null,
            fechaDeCorte:getFullDate()
        })
        props.history.replace({
            pathname:'Historial/Planta',
            props:{
                id:props.location.props.id
            }
        })
        await database().ref().child(props.user.uid).child('plantas').child(props.location.props.id).remove()
    }
    const eliminarPlanta=async ()=>{
        props.history.replace('/')
        await database().ref().child(props.user.uid).child('plantas').child(props.location.props.id).remove()
    }
    const comenzarVegetativo=async ()=>{
        await database().ref().child(props.user.uid).child('plantas').child(props.location.props.id).update({
            inicioVegetativo:getFullDate()
        })
        setIniciarVegetativo(false)
    }
    return(
        props.location.props?
        <Layout history={props.history} page={props.plantas[props.location.props.id].nombre} plantaId={props.location.props.id} user={props.user.uid} userVerification={props.user.emailVerified}>
                <Paper elevation={3} className={classes.root}>
                    <div className="container-fluid">
                        <div className="row flex-nowrap overflow-auto">
                            <DetallePlanta 
                                genetica={props.plantas[props.location.props.id].genetica}
                                cantidadDeGramos={props.plantas[props.location.props.id].cantidadDeGramos}
                                plantaDelHistorial={props.plantas[props.location.props.id].plantaDelHistorial}
                                edad={props.plantas[props.location.props.id].edad}
                                nacimiento={props.plantas[props.location.props.id].nacimiento}
                                inicioVegetativo={props.plantas[props.location.props.id].inicioVegetativo}
                                inicioFloracion={props.plantas[props.location.props.id].inicioFloracion}
                                fechaDeCorte={props.plantas[props.location.props.id].fechaDeCorte}
                                volumenMaceta={props.plantas[props.location.props.id].volumenMaceta}
                                inicioRevegetacion={props.plantas[props.location.props.id].inicioRevegetacion}
                                segundaFloracion={props.plantas[props.location.props.id].segundaFloracion}
                            />
                        </div>
                        {!props.plantas[props.location.props.id].inicioFloracion &&
                            <div className="row mt-2 justify-content-center">
                                {props.plantas[props.location.props.id].nacimiento && !props.plantas[props.location.props.id].inicioVegetativo &&
                                    <Button variant='contained' color='primary' onClick={e=>{setIniciarVegetativo(true)}}>
                                        Iniciar periodo Vegetativo
                                    </Button>
                                }
                            </div>
                        }
                        {iniciarVegetativo&&
                            <Grow in={iniciarVegetativo}
                                {...(true ? { timeout: 1500 } : {})}>
                                <Alert variant='filled' severity='warning' className={classes.alert}>
                                    <AlertTitle>Iniciar Vegetativo?</AlertTitle>
                                    Si continua se guardara el dia de la fecha como el inicio del ciclo Vegetativo
                                    <Button variant='text' color='warning' onClick={e=>{comenzarVegetativo()}}>
                                        Continuar
                                    </Button>
                                </Alert>
                            </Grow>
                        }
                        <div className="row">
                            <DetalleAcciones
                                history={props.history}
                                id={props.location.props.id}
                            />
                        </div>
                        <Divider/>
                            {!props.plantas[props.location.props.id].plantaDelHistorial &&
                                <div className={classes.rowBotonera}>
                                    <BotoneraConfiguracionPlanta
                                        inicioFloracion={props.plantas[props.location.props.id].inicioFloracion}
                                        cosecharPlanta={cosecharPlanta}
                                        eliminarPlanta={eliminarPlanta}
                                        nacimiento={props.location.props.nacimiento}
                                        inicioVegetativo={props.plantas[props.location.props.id].inicioVegetativo}
                                        comenzarVegetativo={comenzarVegetativo}
                                    />
                                </div>
                            }
                        <Divider/>
                    </div>
                </Paper>
            </Layout>
            :
            <Redirect to='/'/>
    )
}
const mapStateToProps=state=>({
    user:state.user,
    plantas:state.data.plantas
})
export default connect(mapStateToProps,null)(Planta)