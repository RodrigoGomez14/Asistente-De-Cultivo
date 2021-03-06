import React from 'react'
import fotoPlanta from '../images/apple cookies.jpg'
import {Paper,makeStyles,Grow} from '@material-ui/core'
import {Overlay,Img,Card} from './styles/TarjetaPlantaStyles'

const useStyles= makeStyles(theme=>({
    root: {
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    paper:{
        width: '250px',
    },
    cardHeader:{
        backgroundColor:theme.palette.primary.dark,
        color:theme.palette.primary.contrastText
    }
}))
export const CardHistorial=({nombre,fechaDeCorte,cantidadDeGramos})=>{
    const classes= useStyles()
    return(
        <Grow in={true}
            {...(true ? { timeout: 1500 } : {})}>
            <Paper elevation={6} className={classes.paper}>
                <Card className="card" >
                    <Img src={fotoPlanta} className="card-img-top" alt="..."/>
                    <Overlay className="card-img-overlay d-flex flex-column justify-content-end pl-1 pb-1">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col text-left">
                                    <h4 className="card-title text-white">{nombre}</h4>
                                    {cantidadDeGramos &&
                                        <h4 className="card-title text-white">{cantidadDeGramos}</h4>
                                    }
                                </div>
                            </div>
                        </div>
                    </Overlay>
                </Card>
            </Paper>
        </Grow>
    )
}