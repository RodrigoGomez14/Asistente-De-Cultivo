import React , {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTint, faCut , faBug} from '@fortawesome/free-solid-svg-icons'
import {Row,Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {Button,makeStyles,Avatar,Paper,Grid,SvgIcon,Icon} from '@material-ui/core'
import {BugReportOutlined,InvertColorsOutlined} from '@material-ui/icons'

import riegos from '../images/riegos.svg'
import timeline from '../images/timeline.svg'
import fumigacion from '../images/fumigacion.svg'
import transplante from '../images/transplante.svg'
import podas from '../images/podas.svg'

const useStyles=makeStyles(theme=>({
    root:{
        width:'100%',
        display:'flex',
        justifyContent:'center'
    },
    link:{
        textDecoration:'none',
        outline:'none',
        margin:theme.spacing(1)
    },
    button:{
        marginBottom:theme.spacing(2),
        color:theme.palette.primary.contrastText
    },
    paper:{
        marginTop:theme.spacing(3),
        marginBottom:theme.spacing(2),
        background:theme.palette.type==='dark'?theme.palette.secondary.main:theme.palette.primary.dark,
        width:'90%',

    },
    avatar:{
        width:theme.spacing(5),
        height:theme.spacing(5)
    },
    timeline:{
        width:'80%',
        marginTop:theme.spacing(2),
        marginBottom:theme.spacing(1),
    },
    imageIcon: {
        height: '100%',
        verticalAlign:'top',
    },
    iconRoot: {
        paddingRight:theme.spacing(7),
        height:theme.spacing(5),
        textAlign: 'center'
      }
}))

export const DetalleAcciones =({id,history})=>{
    const classes= useStyles()
    return(
            <div className={classes.root}>
                <Paper elevation={3} className={classes.paper}>
                    <Grid 
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item xs={12} justify="center">
                            <Link
                                to={{ 
                                    pathname:history.location.pathname==='/Historial/Planta'?'/Historial/Planta/Timeline':'/Planta/Timeline',
                                    props:{
                                        id:id
                            }}}>
                                <Button
                                    variant="contained"
                                    color='primary'
                                    className={classes.timeline}
                                >
                                    <Icon classes={{root: classes.iconRoot}}>
                                        <img className={classes.imageIcon} src={timeline}/>
                                    </Icon>
                                    Linea Temporal
                                </Button>
                            </Link>
                        </Grid>
                        <Grid xs={12} sm={6}>
                            <Link
                            to={{ 
                                pathname:history.location.pathname==='/Historial/Planta'?'/Historial/Planta/Riegos':'/Planta/Riegos',
                                props:{
                                    id:id
                            }}}>
                                <Button
                                    variant="text"
                                    className={classes.button}
                                >
                                    <Icon classes={{root: classes.iconRoot}}>
                                        <img className={classes.imageIcon} src={riegos}/>
                                    </Icon>
                                    Riegos
                                </Button>
                            </Link>            
                        </Grid>
                        <Grid xs={12} sm={6}>
                            <Link                
                            to={{ 
                            pathname:history.location.pathname==='/Historial/Planta'?'/Historial/Planta/Fumigaciones':'/Planta/Fumigaciones',
                            props:{
                                id:id
                            }}}>
                                <Button
                                    variant="text"
                                    className={classes.button}
                                >   
                                    <Icon classes={{root: classes.iconRoot}}>
                                        <img className={classes.imageIcon} src={fumigacion}/>
                                    </Icon>
                                    Fumigaciones
                                </Button>
                            </Link>
                        </Grid>
                        <Grid xs={12} sm={6}>
                            <Link                
                            to={{ 
                            pathname:history.location.pathname==='/Historial/Planta'?'/Historial/Planta/Transplantes':'/Planta/Transplantes',
                            props:{
                                id:id
                            }}}>
                                <Button
                                    variant="text"
                                    className={classes.button}
                                >   
                                    <Icon classes={{root: classes.iconRoot}}>
                                        <img className={classes.imageIcon} src={transplante}/>
                                    </Icon>
                                    Transplantes
                                </Button>
                            </Link>
                        </Grid>
                        <Grid xs={12} sm={6}>
                            <Link 
                                to={{ 
                                    pathname:history.location.pathname==='/Historial/Planta'?'/Historial/Planta/Podas':'/Planta/Podas',
                                    props:{
                                        id:id
                                }}}>
                                    <Button
                                        variant="text"
                                        className={classes.button}
                                    >
                                    <Icon classes={{root: classes.iconRoot}}>
                                        <img className={classes.imageIcon} src={podas}/>
                                    </Icon>
                                        Podas
                                    </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
    )
}