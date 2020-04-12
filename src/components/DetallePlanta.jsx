import React , {useState, useEffect} from 'react'
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles';
import {ListItemText,Paper,Avatar,Grow} from '@material-ui/core'
import semilla from '../images/semilla.svg'
import vegetativo from '../images/vegetativo.svg'
import floracion from '../images/floracion.svg'
import maceta from '../images/maceta.svg'
import calendarioBlanco from '../images/calendario-blanco.svg'
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
        width:'180px',
    },
    listText:{
        color:theme.palette.primary.contrastText,
        '& .MuiTypography-colorTextSecondary':{
            color:theme.palette.primary.contrastText,
        }
    },
    itemList:{
        display:'flex',
        flexWrap:'nowrap',
        overflowX:'auto',
        width:'100%'
    },
    avatar:{
        padding:theme.spacing(1),
        width:theme.spacing(7),
        height:theme.spacing(7)
    },
    root:{
        display:'flex',
        flexWrap:'nowrap',
        overflow:'scroll'
    }
}))

export const DetallePlanta=(props)=>{
    const [dias, setDias] = useState('- Dias')
    const classes = useStyles()

    useEffect(()=>{
        if(!props.plantaDelHistorial){
            const dias = moment().diff(moment(props.nacimiento,"DDMMYYYY"),'days')
            dias === 1?
                setDias(`${dias} Dia`)
                :
                setDias(`${dias} Dias`)
        }
        else{
            const dias = moment(props.fechaDeCorte,'DDMMYYYY').diff(moment(props.nacimiento,"DDMMYYYY"),'days')
            dias === 1?
                setDias(`${dias} Dia`)
                :
                setDias(`${dias} Dias`)
        }
    }
    ,[props.plantaDelHistorial, props.nacimiento, props.fechaDeCorte])
    return(
        <div className={classes.root}>
            <Grow in={true}
            {...(true ? { timeout: 1500 } : {})}>
                <div className="col-auto">
                    <Paper elevation={3} className={classes.paper}>
                        <Avatar src={adn} className={classes.avatar}/>
                        <ListItemText className={classes.listText} primary='Genetica' secondary={props.genetica}/>
                    </Paper>
                </div>
            </Grow>
            <Grow in={true}
            {...(true ? { timeout: 2000 } : {})}>
                <div className="col-auto">
                    <Paper elevation={3} className={classes.paper}>
                        <Avatar src={calendarioBlanco} className={classes.avatar}/>
                        <ListItemText className={classes.listText} primary='Tiempo De Vida' secondary={dias}/>
                    </Paper>
                </div>
            </Grow>
            <Grow in={true}
            {...(true ? { timeout: 2500 } : {})}>
                <div className="col-auto">
                    <Paper elevation={3} className={classes.paper}>
                        <Avatar src={maceta} className={classes.avatar}/>
                        <ListItemText className={classes.listText} primary='Volumen Maceta' secondary={props.volumenMaceta?`${props.volumenMaceta} Lt`:`No especificado`}/>
                    </Paper>
                </div>
            </Grow>
            <Grow in={true}
            {...(true ? { timeout: 3000 } : {})}>
                <div className="col-auto">
                    <Paper elevation={3} className={classes.paper}>
                        <Avatar src={semilla} className={classes.avatar}/>
                        <ListItemText className={classes.listText} primary='Inicio De Germinacion' secondary={props.nacimiento?props.nacimiento:'-'}/>
                    </Paper>
                </div>
            </Grow>
            <Grow in={true}
            {...(true ? { timeout: 3500 } : {})}>
                <div className="col-auto">
                    <Paper elevation={3} className={classes.paper}>
                        <Avatar src={vegetativo} className={classes.avatar}/>
                        <ListItemText className={classes.listText} primary='Inicio De Vegetativo' secondary={props.inicioVegetativo?props.inicioVegetativo:'-'}/>
                    </Paper>
                </div>
            </Grow>
            {props.inicioRevegetacion &&
                <Grow in={true}
                {...(true ? { timeout: 4000 } : {})}>
                    <div className="col-auto">
                        <Paper elevation={3} className={classes.paper}>
                            <Avatar src={vegetativo} className={classes.avatar}/>
                            <ListItemText className={classes.listText} primary='Revegetacion' secondary={props.inicioRevegetacion}/>
                        </Paper>
                    </div>
                </Grow>
            }
            <Grow in={true}
            {...(true ? { timeout: 4500 } : {})}>
                <div className="col-auto">
                    <Paper elevation={3} className={classes.paper}>
                        <Avatar src={floracion} className={classes.avatar}/>
                        <ListItemText className={classes.listText} primary='Inicio De Floracion' secondary={props.inicioFloracion?props.inicioFloracion:'-'}/>
                    </Paper>
                </div>
            </Grow>
                {props.segundaFloracion &&
                <Grow in={true}
                {...(true ? { timeout: 5000 } : {})}>
                    <div className="col-auto">
                        <Paper elevation={3} className={classes.paper}>
                            <Avatar src={floracion} className={classes.avatar}/>
                            <ListItemText className={classes.listText} primary='Segunda Floracion' secondary={props.segundaFloracion}/>
                        </Paper>
                    </div>
                </Grow>
                }
                {props.fechaDeCorte &&
                <Grow in={true}
                {...(true ? { timeout: 5500 } : {})}>
                    <div className="col-auto">
                        <Paper elevation={3} className={classes.paper}>
                            <Avatar src={cosecha} className={classes.avatar}/>
                            <ListItemText className={classes.listText} primary='Fecha De Corte' secondary={props.fechaDeCorte}/>
                        </Paper>
                    </div>
                </Grow>
                }
                {props.cantidadDeGramos &&
                <Grow in={true}
                {...(true ? { timeout: 6000 } : {})}>
                    <div className="col-auto">
                        <Paper elevation={3} className={classes.paper}>
                            <Avatar src={balanza} className={classes.avatar}/>
                            <ListItemText className={classes.listText} primary='Cantidad Cosechada' secondary={`${props.cantidadDeGramos?props.cantidadDeGramos:'-'}`}/>
                        </Paper>
                    </div>
                </Grow>
                }
        </div>
    )
}