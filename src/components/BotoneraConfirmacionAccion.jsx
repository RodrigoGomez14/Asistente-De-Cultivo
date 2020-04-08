import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCheck} from '@fortawesome/free-solid-svg-icons'
import {Button,makeStyles} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    button: {
        marginRight: theme.spacing(2),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    buttonPrimary:{
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
}));

export const BotoneraConfirmacionAccion=(props)=>{
    const classes = useStyles()
    return(
            <div className={classes.actionsContainer}>
                <div>
                    <Button
                        className={classes.button}
                        onClick={props.handleBack}
                    >
                        Volver
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={
                            e=>{
                                props.confirmarAccion(props.accion)
                            }
                        }
                    >
                    <FontAwesomeIcon icon={faCheck} size='lg' className='mr-2'/>
                    Guardar {props.accion}
                </Button>
                </div>
            </div>
    )
}