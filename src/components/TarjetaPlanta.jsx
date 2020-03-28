import React, {useState,useEffect} from 'react'
import moment from 'moment'
import fotoGerminacion from '../images/fotoGerminacion.jpg'
import fotoVegetativo from '../images/fotoVegetativo.jpg'
import fotoFloracion from '../images/fotoFloracion.jpg'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {database} from 'firebase'
import {Overlay,Img,Card} from './styles/TarjetaPlantaStyles'
import {Link} from 'react-router-dom'
import {Paper} from '@material-ui/core'
import {Grow} from '@material-ui/core' 
import {makeStyles} from '@material-ui/core'


const useStyles = makeStyles(theme => ({
    paper: {
      backgroundColor:theme.palette.primary.main,
      padding:theme.spacing(1)
    },
  }));

export const TarjetaPlanta=(props)=>{
    let [edad,setEdad]=useState(undefined)
    useEffect(()=>{
        setEdad(moment().diff(moment(props.nacimiento),'days'))
    })
    const classes = useStyles()
    return(
        <div className="col-auto">
            <Grow in={true}
                {...(true ? { timeout: 1500 } : {})}>
                <Paper elevation={6} className={classes.paper}>
                    <Link className='text-white' to={{
                        pathname:'/Planta',
                        props:{
                            id:props.id
                        }
                    }}>
                        <Card className="card" >
                            <Img 
                                src={
                                    props.periodo==='Vegetativo'?
                                        props.inicioVegetativo?
                                        fotoVegetativo
                                        :
                                        fotoGerminacion
                                    :
                                    fotoFloracion
                                } 
                                className="card-img-top" alt="..."/>
                            <Overlay className="card-img-overlay d-flex flex-column justify-content-end pl-1 pb-1">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col text-left">
                                            {console.log(props)}
                                            <h4 className="card-title">{props.nombre}</h4>
                                        </div>
                                    </div>
                                </div>
                            </Overlay>
                        </Card>
                    </Link>
                </Paper>
            </Grow>
        </div>
    )
}