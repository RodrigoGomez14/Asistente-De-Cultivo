import React , {useState} from 'react'
import {makeStyles,IconButton,Typography} from '@material-ui/core'
import {DeleteOutline,EditOutlined} from '@material-ui/icons'

const useStyles= makeStyles(theme=>({
    editButton:{
        color:theme.palette.type==='dark'?theme.palette.primary.contrastText:theme.palette.secondary.contrastText,
    },
    deleteButton:{
        color:theme.palette.error.main
    },
    editText:{
        color:theme.palette.type==='dark'?theme.palette.primary.contrastText:theme.palette.secondary.contrastText,
    },
    deleteText:{
        color:theme.palette.error.main
    }
}))

export const BotoneraConfiguracionPlanta =({inicioFloracion,cosecharPlanta,eliminarPlanta,}) =>{
    const classes = useStyles()
    return(
        <div className="row my-2 justify-content-around">
            {inicioFloracion &&
                <div className='d-flex flex-column'>
                    <IconButton
                        variant="contained"
                        color='secondary'
                        onClick={cosecharPlanta}
                        >
                        <DeleteOutline/>
                    </IconButton>
                    <Typography variant='caption'>
                        Cosechar
                    </Typography>
                </div>
            }
            <div className='d-flex flex-column'>
                <IconButton
                    variant="contained"
                    className={classes.editButton}
                    >
                    <EditOutlined/>
                </IconButton>
                <Typography variant='caption'className={classes.editText}>
                    Editar
                </Typography>
            </div> 
            <div className='d-flex flex-column'>
                <IconButton
                    variant="contained"
                    className={classes.deleteButton}
                    onClick={e=>{
                        eliminarPlanta()
                    }}
                >
                    <DeleteOutline/>
                </IconButton>
                <Typography variant='caption' className={classes.deleteText}>
                Eliminar
                </Typography>
            </div>
        </div>
    )
}