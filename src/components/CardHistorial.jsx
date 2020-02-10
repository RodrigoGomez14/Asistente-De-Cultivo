import React from 'react'
import { AddCircleOutlineOutlined } from '@material-ui/icons'
import fotoPlanta from '../images/apple cookies.jpg'
import {Card,CardHeader,CardMedia,CardActions,makeStyles,IconButton} from '@material-ui/core'
const useStyles= makeStyles(theme=>({
    root: {
        width: 250,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    cardHeader:{
        backgroundColor:theme.palette.primary.dark,
        color:theme.palette.primary.contrastText
    }
}))
export const CardHistorial=({nombre,fechaDeCorte,cantidadDeGramos})=>{
    const classes= useStyles()
    return(
        <Card className={classes.root}>
            <CardHeader
                className={classes.cardHeader}
                title={cantidadDeGramos?`${nombre} (${cantidadDeGramos})`:nombre}
                subheader={fechaDeCorte}
            />
            <CardMedia
                className={classes.media}
                image={fotoPlanta}
            />
        </Card>
    )
}