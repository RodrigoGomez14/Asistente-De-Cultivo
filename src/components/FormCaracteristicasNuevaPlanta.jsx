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
        marginTop:theme.spacing(1)
    }
}))


export const FormCaracteristicasNuevaPlanta =({nombre,setNombre,genetica,setGenetica,volumenMaceta,setVolumenMaceta,etapa,setInicioGerminacion,getFullDate,setEtapa})=>{
    
    const classes = useStyles()
    return(
        <div className={classes.root}>
            <form className={classes.form}>
                <TextField label="Nombre" className={classes.input} value={nombre} onChange={e=>{setNombre(e.target.value)}}/>
                <TextField label="Genetica"  className={classes.input} value={genetica} onChange={e=>{setGenetica(e.target.value)}}/>
                <TextField 
                    label="Volumen De Maceta" 
                    className={classes.input}
                    value={volumenMaceta} 
                    type='number'  
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            Lt
                        </InputAdornment>
                        ),
                    }}
                    onChange={e=>{setVolumenMaceta(e.target.value)}}/>
                <FormControl className={classes.formControl}>
                    <InputLabel id="etapa-select-label">Etapa</InputLabel>
                    <Select
                        labelId="etapa-select-label"
                        id="etapa-select"
                        value={etapa}
                        onChange={e=>{
                            const etapa = e.target.value
                            if(etapa==='Vegetativo'){
                                setInicioGerminacion(getFullDate())
                                setEtapa(e.target.value)
                            }
                            else{
                                setInicioGerminacion(undefined)
                                setEtapa(e.target.value)}
                            }
                        }
                    >
                        <MenuItem value={'Vegetativo'}>Vegetativo</MenuItem>
                        <MenuItem value={'Floracion'}>Floracion</MenuItem>
                    </Select>
                </FormControl>
            </form>
        </div>
    )
}