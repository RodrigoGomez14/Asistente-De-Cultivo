import React from 'react'
import {Layout} from './Layout'
import {DetallePlanta} from '../alert-components/DetallePlanta'
import {DetalleAcciones} from '../alert-components/DetalleAcciones'
import {Redirect} from 'react-router-dom'
import {DeleteOutline, EditOutlined} from '@material-ui/icons'
import {IconButton,Button,ButtonGroup,makeStyles,Typography} from '@material-ui/core'

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
        color:theme.palette.primary.contrastText,
        textShadow:`1px 1px 20px ${theme.palette.danger}`
    },
    buttonTextDanger:{
        color:theme.palette.primary.contrastText,
        textShadow:`1px 1px 20px ${theme.palette.danger}`
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
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={props.location.props.alertEliminarPlanta}
                            endIcon={
                                <DeleteOutline/>
                            }
                            >
                            Cosechar
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={props.location.props.alertEliminarPlanta}
                            endIcon={
                                <EditOutlined/>
                            }
                        >   
                            Editar
                        </Button>                 
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={props.location.props.alertEliminarPlanta}
                            endIcon={
                                <DeleteOutline/>
                            }>
                                Eliminar
                        </Button>
                    </div>
                </div>
            </Layout>
            :
            <Redirect to='/'/>
    )
}