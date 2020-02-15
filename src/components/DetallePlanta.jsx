import React , {Component} from 'react'
import fotoPlanta from '../images/apple cookies.jpg'
import moment from 'moment'
import {Table,Row,Col,Container,Image} from 'react-bootstrap'
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import {List, ListItem,ListItemText,Paper, Divider,CardMedia,ListItemAvatar,Avatar,Grow} from '@material-ui/core'
import { PortableWifiOff, Height } from '@material-ui/icons';
import semilla from '../images/semilla.svg'
import vegetativo from '../images/vegetativo.svg'
import floracion from '../images/floracion.svg'
import maceta from '../images/maceta.svg'
import adn from '../images/adn.svg'
import balanza from '../images/balanza.svg'
import cosecha from '../images/cosecha.svg'
const useStyles = makeStyles(theme => ({
    paper:{
        backgroundColor:theme.palette.primary.main,
        padding:theme.spacing(1),
        flexGrow:'1',
        marginTop:theme.spacing(2),
        marginLeft:theme.spacing(1),
        marginRight:theme.spacing(1),
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        maxWidth:'220px'
    },
    listText:{
        color:theme.palette.primary.contrastText,
        '& .MuiTypography-colorTextSecondary':{
            color:theme.palette.primary.contrastText,
        }
    },
    itemList:{
        display:'flex',
        justifyContent:'space-around',
        width:'100%'
    },
    avatar:{
        padding:theme.spacing(1),
        width:theme.spacing(7),
        height:theme.spacing(7)
    }
}))

export const DetallePlanta=(props)=>{
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
    const classes = useStyles()
            
    return(
        <div className={classes.itemList}>
            <Grow in={true}
                {...(true ? { timeout: 1500 } : {})}>
                <Paper elevation={3} className={classes.paper}>
                    <Avatar src={adn} className={classes.avatar}/>
                    <ListItemText className={classes.listText} primary='Genetica' secondary={props.genetica}/>
                </Paper>
            </Grow>
            <Grow in={true}
                {...(true ? { timeout: 1500 } : {})}>
                <Paper elevation={3} className={classes.paper}>
                    <Avatar src={maceta} className={classes.avatar}/>
                    <ListItemText className={classes.listText} primary='Volumen Maceta' secondary={`${props.volumenMaceta} Lt`}/>
                </Paper>
            </Grow>
            <Grow in={true}
            {...(true ? { timeout: 1500 } : {})}>
                <Paper elevation={3} className={classes.paper}>
                    <Avatar src={semilla} className={classes.avatar}/>
                    <ListItemText className={classes.listText} primary='Fecha De Germinacion' secondary={props.nacimiento?props.nacimiento:'-'}/>
                </Paper>
            </Grow>
            <Grow in={true}
            {...(true ? { timeout: 1500 } : {})}>
                <Paper elevation={3} className={classes.paper}>
                    <Avatar src={vegetativo} className={classes.avatar}/>
                    <ListItemText className={classes.listText} primary='Fecha De Vegetativo' secondary={props.inicioVegetativo?props.inicioVegetativo:'-'}/>
                </Paper>
            </Grow>
            <Grow in={true}
            {...(true ? { timeout: 1500 } : {})}>
                <Paper elevation={3} className={classes.paper}>
                    <Avatar src={floracion} className={classes.avatar}/>
                    <ListItemText className={classes.listText} primary='Fecha De Floracion' secondary={props.inicioFloracion?props.inicioFloracion:'-'}/>
                </Paper>
            </Grow>
            {props.plantaDelHistorial && props.fechaDeCorte &&
                <Grow in={true}
                {...(true ? { timeout: 1500 } : {})}>
                    <Paper elevation={3} className={classes.paper}>
                        <Avatar src={cosecha} className={classes.avatar}/>
                        <ListItemText className={classes.listText} primary='Fecha De Corte' secondary={props.fechaDeCorte}/>
                    </Paper>
                </Grow>
            }
            {props.plantaDelHistorial &&
                <Grow in={true}
                {...(true ? { timeout: 1500 } : {})}>
                    <Paper elevation={3} className={classes.paper}>
                        <Avatar src={balanza} className={classes.avatar}/>
                        <ListItemText className={classes.listText} primary='Cantidad Cosechada' secondary={`${props.cantidadDeGramos?props.cantidadDeGramos:'-'}`}/>
                    </Paper>
                </Grow>
            }
        </div>
    )
}