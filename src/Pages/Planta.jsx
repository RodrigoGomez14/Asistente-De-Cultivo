import React from 'react'
import {Layout} from './Layout'
import {DetallePlanta} from '../alert-components/DetallePlanta'
import {DetalleAcciones} from '../alert-components/DetalleAcciones'
import {Redirect} from 'react-router-dom'
import {DeleteOutline, EditOutlined} from '@material-ui/icons'
import {IconButton,ButtonGroup,makeStyles,Typography} from '@material-ui/core'

const useStyles=makeStyles(theme=>({
    button:{
        color:theme.palette.primary.contrastText,
        textShadow:'1px 1px 10px black'
    },
    buttonText:{
        color:theme.palette.primary.contrastText,
        textShadow:'1px 1px 10px black'
    },
    buttonDanger:{
        color:theme.palette.danger,
        textShadow:'1px 1px 20px black'
    },
    buttonTextDanger:{
        color:theme.palette.danger,
        textShadow:'1px 1px 20px black'
    }
}))

export const Planta =(props)=>{
    const classes = useStyles()
    return(
        props.location.props?
            <Layout history={props.history} page={props.location.props.nombre}>
                <div className="container-fluid accion">
                    <div className="row">
                        <DetallePlanta 
                            genetica={props.location.props.genetica}
                            edad={props.location.props.edad}
                            nacimiento={props.location.props.nacimiento}
                            inicioVegetativo={props.location.props.inicioVegetativo}
                            inicioFloracion={props.location.props.inicioFloracion}
                        />
                        <DetalleAcciones
                            {...props.location.props}
                        />
                    </div>
                    <div className="row my-2 justify-content-around">
                        <div className="col-auto">
                            <IconButton
                                variant="contained"
                                color="primary"
                                onClick={props.location.props.alertEliminarPlanta}
                            >
                                <div className='d-flex flex-column justify-content-center align-items-center'>
                                    <DeleteOutline className={classes.buttonText}/>
                                    <Typography variant='caption' className={classes.buttonText} gutterBottom>
                                        Cosechar
                                    </Typography>
                                </div>
                            </IconButton>
                        </div>
                        <div className="col-auto">
                            <IconButton
                                variant="contained"
                                color="primary"
                                onClick={props.location.props.alertEliminarPlanta}
                            >   
                            <div className='d-flex flex-column justify-content-center align-items-center'>
                                <EditOutlined className={classes.buttonText}/>
                                <Typography variant='caption' className={classes.buttonText} gutterBottom>
                                    Editar
                                </Typography>
                            </div>
                            </IconButton>
                        </div>
                        <div className="col-auto">                        
                            <IconButton
                                variant="contained"
                                size='medium'
                                color="primary"
                                onClick={props.location.props.alertEliminarPlanta}>
                                <div className='d-flex flex-column justify-content-center align-items-center'>
                                    <DeleteOutline className={classes.buttonTextDanger}/>
                                    <Typography variant='caption' className={classes.buttonTextDanger}gutterBottom>
                                        Eliminar
                                    </Typography>
                                </div>
                            </IconButton>
                        </div>
                    </div>
                </div>
            </Layout>
            :
            <Redirect to='/'/>
    )
}