import React from 'react'
import fotoGerminacion from '../images/fotoGerminacion.jpg'
import fotoVegetativo from '../images/fotoVegetativo.jpg'
import fotoFloracion from '../images/fotoFloracion.jpg'
import 'react-confirm-alert/src/react-confirm-alert.css';
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
    const classes = useStyles()
    const growTime = 2000 + (500 * props.index)
    return(
        <div className="col-auto">
            <Grow in={true}
                {...(true ? { timeout: growTime } : {})}>
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