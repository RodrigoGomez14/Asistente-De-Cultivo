import React, {useEffect,useState} from 'react'
import {FechaYHora} from '../components/FechaYHora'
import './styles/table.css'
import {Typography,LinearProgress,Grow} from '@material-ui/core'
import {TarjetaArmario} from '../components/TarjetaArmario'
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    root:{
        width:'100%',
        padding:theme.spacing(2),  
    },
    text:{
        color: theme.palette.primary.contrastText
    },
    list:{
        justifyContent:'center',
        flexWrap:'nowrap',
        overflow:'auto'
    }
}));

const BorderLinearProgress = withStyles({
    root: {
      height: 20,
      borderRadius: 20,
      backgroundColor: lighten('#4CAF50', 0.5),
    },
    bar: {
      borderRadius: 20,
      border:'1px solid white',
      backgroundColor: '#4CAF50',
    },
  })(LinearProgress);

export const BarraDeLuz=(props)=>{
    let [faltante,setFaltante]=useState(undefined)
    let [transcurrido,setTranscurrido]=useState(undefined)
    let [lamparaEncendida,setLampraEncendida]=useState(undefined)
    let [porcentaje,setPorcentaje]=useState(undefined)

    const getMinutesOfDay=()=>{
        const date = new Date()
        const minutes= date.getMinutes()+date.getHours()*60
        return minutes
    }
    const actualizarTranscurrido=minutes=>{
        setTranscurrido(minutes-(props.horaDeInicio*60))
    }
    const actualizarBarraDeEstado=()=>{
        const nuevoPorcentaje = (transcurrido*100)/(props.cicloLuminico*60)
        setPorcentaje(nuevoPorcentaje)
    }
    useEffect(()=>{
        const minutesOfDay = getMinutesOfDay()
        let horaFinal = props.horaDeInicio + props.cicloLuminico
        const minutoFinal = horaFinal >24? (horaFinal-24)*60 : horaFinal*60
        const minutoDeInicio = props.horaDeInicio*60
        if(minutoFinal<minutoDeInicio){
            //cuando termina despues de las 12
        }
        else{
            // cuando termina antes de las 12
        }
        const minutosDelCiclo = props.cicloLuminico*60
        actualizarBarraDeEstado()
    })
    const classes = useStyles()
    return(
        <Grow in={true}
        {...(true ? { timeout: 1500 } : {})}>
            <div className={classes.root}>
                <div className="container-fluid p-0">
                    <div className="row">
                        <div className="col-auto ml-auto mr-auto">
                            <FechaYHora/>
                        </div>
                    </div>
                    <div className="row">
                        {!lamparaEncendida?
                            <div className="col text-center">
                                <Typography variant='h6' className={classes.text}>
                                    Descansando...
                                </Typography>
                            </div>
                            :
                            <div className="col text-center">
                                <Typography variant ='h6' className={classes.text}>
                                    Creciendo...
                                </Typography>
                            </div>
                        }
                    </div>
                    <div className="row mt-4">
                        <div className="col-12">
                        <BorderLinearProgress
                                className={classes.margin}
                                variant="determinate"
                                color="secondary"
                                value={55}
                            />
                        </div>
                    </div>
                    <div className="row flex-nowrap overflow-auto">
                        <TarjetaArmario periodo={props.periodo} horaDeInicio={props.horaDeInicio} cicloLuminico={props.cicloLuminico} />
                    </div>
                </div>
            </div>
        </Grow>
    )
}