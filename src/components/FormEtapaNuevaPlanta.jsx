import React,{useState} from 'react'
import {Paper, TextField,makeStyles,Typography,FormControl,InputLabel,Select,MenuItem,Button,InputAdornment} from '@material-ui/core'
import {Alert,AlertTitle} from '@material-ui/lab'
import {CheckCircleOutlineOutlined} from '@material-ui/icons'
const useStyles = makeStyles(theme=>({
    root:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
    },
    form:{
        padding:theme.spacing(4),
        marginTop:theme.spacing(2),
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    input:{
        marginTop:theme.spacing(1),
        marginBottom:theme.spacing(1),
    },
    inputWrapper:{
        width:'100%',
        display:'flex',
        justifyContent:'space-around',
        marginTop:theme.spacing(3)
    }
}))
export const FormEtapaNuevaPlanta =({getFullDate,periodoArmario,inicioGerminacion,setInicioGerminacion,inicioVegetativo,setInicioVegetativo,inicioFloracion,setInicioFloracion,etapa})=>{
    const classes = useStyles()
    const date = getFullDate()
    const renderInputs=()=>{
        switch (etapa) {
            case 'Vegetativo':
                if(periodoArmario===etapa ){
                    return(
                        <div className={classes.inputWrapper}>
                            <TextField label="Incio Germinacion" value={inicioGerminacion} placeholder={date} onChange={e=>{setInicioGerminacion(e.target.value)}}/>
                        </div>
                    )
                }
                else{
                    return(
                        <>
                            <Alert variant='outlined' severity="warning">
                                <AlertTitle>Si ingresa esta planta al armario comenzara su periodo de floracion</AlertTitle>
                            </Alert>
                            <div className={classes.inputWrapper}> 
                                <TextField label="Incio Germinacion" value={inicioGerminacion} placeholder={date} onChange={e=>{setInicioGerminacion(e.target.value)}}/>
                            </div>
                        </>
                    )
                }
                break;
            case 'Floracion':
                if(periodoArmario===etapa){
                    return(
                        <div className={classes.inputWrapper}>
                            <TextField label="Incio Germinacion" value={inicioGerminacion} placeholder={date} onChange={e=>{setInicioGerminacion(e.target.value)}}/>
                            <TextField label="Incio Vegetativo" value={inicioVegetativo} placeholder={date} onChange={e=>{setInicioVegetativo(e.target.value)}}/>
                            <TextField label="Incio Floracion" value={inicioFloracion} placeholder={date} onChange={e=>{setInicioFloracion(e.target.value)}}/>
                        </div>
                    )
                }
                else{
                    return(
                        <Alert variant='outlined' severity="error">
                            <AlertTitle>No es recomendable introducir una planta en periodo de floracion en un armario con periodo Vegetativo</AlertTitle>
                        </Alert>
                    )
                }
                break;
            default:
                break;
        }
    }
    return(
        <div className={classes.root}>
            <form className={classes.form}>
                {renderInputs()}
            </form>
        </div>
    )
}