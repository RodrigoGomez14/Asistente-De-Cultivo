import React , {Component} from 'react'
import fotoPlanta from '../images/apple cookies.jpg'
import moment from 'moment'
import {Table,Row,Col,Container,Image} from 'react-bootstrap'
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import {List, ListItem,ListItemText,Paper, Divider} from '@material-ui/core'
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
        },
    }));
    const classes = useStyles()
    return(
        <>
            <Row className='mb-2'>
                <Col xs={12}>
                    <GridList className={classes.gridList} cols={2.5}>
                        {tileData.map(tile => (
                        <GridListTile key={tile.img}>
                            <img src={tile.img}  />
                        </GridListTile>
                        ))}
                    </GridList>
                </Col>
            </Row>
            <Row className='mb-2'>
                <Col>
                    <div className={classes.listRoot}>
                        <Paper elevation={3}>
                            <List component='nav'>
                                <ListItem>
                                    <ListItemText primary="Genetica" secondary={props.genetica}/>
                                </ListItem>
                                <Divider/>
                                <ListItem>
                                    <ListItemText primary="Edad" secondary={props.edad}/>
                                </ListItem>
                                <Divider/>
                                <ListItem>
                                    <ListItemText primary="Fecha De Germinacion" secondary={`${props.nacimiento} (${moment().diff(moment(props.nacimiento),'days')} Dias)`}/>
                                </ListItem>
                                <Divider/>
                                <ListItem>
                                    <ListItemText primary="Fecha De Vegetativo" secondary={`${props.inicioVegetativo} (${moment().diff(moment(props.inicioVegetativo),'days')} Dias)`}/>
                                </ListItem>
                                <Divider/>
                                <ListItem>
                                    <ListItemText primary="Fecha De Floracion" secondary={`${props.inicioFloracion} (${moment().diff(moment(props.inicioFloracion),'days')} Dias)`}/>
                                </ListItem>
                            </List>
                        </Paper>
                    </div>
                </Col>
            </Row>
        </>
    )
}