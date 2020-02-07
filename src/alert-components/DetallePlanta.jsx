import React , {Component} from 'react'
import fotoPlanta from '../images/apple cookies.jpg'
import moment from 'moment'
import {Table,Row,Col,Container,Image} from 'react-bootstrap'
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import {List, ListItem,ListItemText,Paper, Divider,CardMedia} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
        '& .MuiGridListTile-root':{
            width:'30% !important'
        }
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    listRoot: {
        width: '100%',
        maxWidth: 360,
        backgroundImage:`url(${fotoPlanta})`,

    },
    listItem:{
        color:theme.palette.primary.contrastText,
        '& .MuiTypography-colorTextSecondary':{
            color:theme.palette.primary.contrastText,
        }
    },
    paper:{
        backgroundColor:theme.palette.primary.dark
    },
    media: {
        height:'100%'
    },
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
        <>
            <Col xs={12} className='p-0'>
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
            </Col>
            <div className='col-12 col-sm-8 col-md-6 col-lg-3 mt-2'>
                <div className={classes.listRoot}>
                    <Paper elevation={3} className={classes.paper}>
                        <List component='nav'>
                            <ListItem>
                                <ListItemText className={classes.listItem} primary="Genetica" secondary={props.genetica}/>
                            </ListItem>
                            <Divider/>
                            <ListItem>
                                <ListItemText className={classes.listItem} primary="Edad" secondary={props.edad}/>
                            </ListItem>
                            <Divider/>
                            <ListItem>
                                <ListItemText className={classes.listItem} primary="Fecha De Germinacion" secondary={`${props.nacimiento} (${moment().diff(moment(props.nacimiento),'days')} Dias)`}/>
                            </ListItem>
                            <Divider/>
                            <ListItem>
                                <ListItemText className={classes.listItem} primary="Fecha De Vegetativo" secondary={`${props.inicioVegetativo} (${moment().diff(moment(props.inicioVegetativo),'days')} Dias)`}/>
                            </ListItem>
                            <Divider/>
                            <ListItem>
                                <ListItemText className={classes.listItem} primary="Fecha De Floracion" secondary={`${props.inicioFloracion} (${moment().diff(moment(props.inicioFloracion),'days')} Dias)`}/>
                            </ListItem>
                        </List>
                    </Paper>
                </div>
            </div>
        </>
    )
}