import React , {Component} from 'react'
import fotoPlanta from '../images/apple cookies.jpg'
import moment from 'moment'
import {Table,Row,Col,Container,Image} from 'react-bootstrap'
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
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
    }));
    const classes = useStyles()
    return(
        <Row className="mb-4 align-items-center">
            <Col xs={12}className='px-0 mb-2'>
                <GridList className={classes.gridList} cols={2.5}>
                    {tileData.map(tile => (
                    <GridListTile key={tile.img}>
                        <img src={tile.img}  />
                    </GridListTile>
                    ))}
                </GridList>
            </Col>
            <Col md={8} className="align-self-center">
                <Container className="container">
                    <Table striped hover variant='dark' >
                        <tbody>
                            <tr>
                                <td>
                                    <h6 className=''>Genetica</h6>
                                </td>
                                <td>
                                    <h6 className='text-right '>{props.genetica}</h6>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h6 className=''>Edad</h6>
                                </td>
                                <td>
                                    <h6 className='text-right '>{props.edad} Dias</h6>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h6 className=''>Fecha de Germinacion</h6>
                                </td>
                                <td>
                                    <h6 className='text-right '>{props.nacimiento} ({moment().diff(moment(props.nacimiento),'days')} Dias)</h6>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h6 className=''>Inicio de Vegetativo</h6>
                                </td>
                                <td>
                                    <h6 className='text-right '>{
                                        props.inicioVegetativo?
                                            `${props.inicioVegetativo} (${moment().diff(moment(props.inicioVegetativo),'days')} Dias)`
                                            :
                                            '--/--/----'
                                        }</h6>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h6 className=''>Inicio de Floracion</h6>
                                </td>
                                <td>
                                    <h6 className='text-right '>{
                                        props.inicioFloracion?
                                        `${props.inicioFloracion}  (${moment().diff(moment(props.inicioFloracion),'days')} Dias)`
                                        :
                                        '--/--/----'
                                    }</h6>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Container>
            </Col>
        </Row>
    )
}