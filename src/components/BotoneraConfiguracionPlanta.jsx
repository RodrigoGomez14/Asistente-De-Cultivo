import React , {useState} from 'react'
import {makeStyles,IconButton,Typography,SvgIcon} from '@material-ui/core'
import {DeleteOutline,EditOutlined,NatureOutlined} from '@material-ui/icons'
const useStyles= makeStyles(theme=>({
    root:{
        width:'100%',
        display:'flex',
        justifyContent:'space-around',
        paddingBottom:theme.spacing(1)
    },
    editButton:{
        color:theme.palette.primary.contrastText,
    },
    deleteButton:{
        color:theme.palette.error.main
    },
    editText:{
        color:theme.palette.primary.contrastText,
    },
    deleteText:{
        color:theme.palette.error.main
    },
    cosecharButton:{
        color:theme.palette.success.main
    },
    cosecharText:{
        color:theme.palette.success.main
    },
}))

export const BotoneraConfiguracionPlanta =({inicioFloracion,cosecharPlanta,eliminarPlanta}) =>{
    const classes = useStyles()
    return(
        <div className={classes.root}>
            {inicioFloracion &&
                <div className='d-flex flex-column'>
                    <IconButton
                        variant="contained"
                        onClick={cosecharPlanta}
                        className={classes.cosecharButton}
                        >
                        <NatureOutlined/>
                    </IconButton>
                    <Typography variant='caption' className={classes.cosecharText}>
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