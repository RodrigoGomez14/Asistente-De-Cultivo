import React from 'react'
import {makeStyles,FormControlLabel,Input} from '@material-ui/core'
import {Alert,AlertTitle} from '@material-ui/lab'
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
        '& .MuiTypography-body1':{
            color:theme.palette.type==='dark'?theme.palette.primary.contrastText:theme.palette.secondary.contrastText
        }
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
            case 'Germinacion':
                if(periodoArmario==='Vegetativo'){
                    return(
                        <div className={classes.inputWrapper}>
                            <FormControlLabel
                                label='Inicio de Germinacion'
                                className={classes.input}
                                labelPlacement='top'
                                control={
                                    <Input type='date' value={inicioGerminacion} placeholder={date} onChange={e=>{setInicioGerminacion(e.target.value)}}/>
                                }
                            />
                        </div>
                    )
                }
                else{
                    return(
                        <Alert variant='filled' severity="error">
                            <AlertTitle>No es recomendable introducir una semilla germinando en un armario con periodo de Floracion</AlertTitle>
                        </Alert>
                    )
                }
            case 'Vegetativo':
                if(periodoArmario===etapa ){
                    return(
                        <div className={classes.inputWrapper}>
                            <FormControlLabel
                                label='Inicio de Germinacion'
                                className={classes.input}
                                labelPlacement='top'
                                control={
                                    <Input type='date' value={inicioGerminacion} placeholder={date} onChange={e=>{setInicioGerminacion(e.target.value)}}/>
                                }
                            />
                            <FormControlLabel
                                label='Inicio de Vegetativo'
                                className={classes.input}
                                labelPlacement='top'
                                control={
                                    <Input type='date' value={inicioVegetativo} placeholder={date} onChange={e=>{setInicioVegetativo(e.target.value)}}/>
                                }
                            />
                        </div>
                    )
                }
                else{
                    return(
                        <>
                            <Alert variant='filled' severity="warning">
                                <AlertTitle>Si ingresa esta planta al armario comenzara su periodo de floracion el dia de hoy</AlertTitle>
                            </Alert>
                            <div className={classes.inputWrapper}> 
                            <FormControlLabel
                                label='Inicio de Germinacion'
                                className={classes.input}
                                labelPlacement='top'
                                control={
                                    <Input type='date' value={inicioGerminacion} placeholder={date} onChange={e=>{setInicioGerminacion(e.target.value)}}/>
                                }
                            />
                                <FormControlLabel
                                label='Inicio de Vegetativo'
                                className={classes.input}
                                labelPlacement='top'
                                control={
                                    <Input type='date' value={inicioVegetativo} placeholder={date} onChange={e=>{setInicioVegetativo(e.target.value)}}/>
                                }
                            />
                            </div>
                        </>
                    )
                }
            case 'Floracion':
                if(periodoArmario===etapa){
                    return(
                        <div className={classes.inputWrapper}>
                            <FormControlLabel
                                label='Inicio de Germinacion'
                                className={classes.input}
                                labelPlacement='top'
                                control={
                                    <Input type='date' value={inicioGerminacion} placeholder={date} onChange={e=>{setInicioGerminacion(e.target.value)}}/>
                                }
                            />
                                <FormControlLabel
                                label='Inicio de Vegetativo'
                                className={classes.input}
                                labelPlacement='top'
                                control={
                                    <Input type='date' value={inicioVegetativo} placeholder={date} onChange={e=>{setInicioVegetativo(e.target.value)}}/>
                                }
                            />
                            <FormControlLabel
                                label='Inicio de Floracion'
                                className={classes.input}
                                labelPlacement='top'
                                control={
                                    <Input type='date' value={inicioFloracion} placeholder={date} onChange={e=>{setInicioFloracion(e.target.value)}}/>
                                }
                            />
                        </div>
                    )
                }
                else{
                    return(
                        <>
                            <Alert variant='filled' severity="error">
                                <AlertTitle>No es recomendable introducir una planta en periodo de floracion en un armario con periodo Vegetativo</AlertTitle>
                                Si continua se establecera el dia de la fecha como inicio de la revegetacion.
                            </Alert>
                            <div className={classes.inputWrapper}> 
                                <FormControlLabel
                                    label='Inicio de Germinacion'
                                    className={classes.input}
                                    labelPlacement='top'
                                    control={
                                        <Input type='date' value={inicioGerminacion} placeholder={date} onChange={e=>{setInicioGerminacion(e.target.value)}}/>
                                    }
                                />
                                <FormControlLabel
                                    label='Inicio del primer ciclo vegetativo'
                                    className={classes.input}
                                    labelPlacement='top'
                                    control={
                                        <Input type='date' value={inicioVegetativo} placeholder={date} onChange={e=>{setInicioVegetativo(e.target.value)}}/>
                                    }
                                />
                                <FormControlLabel
                                    label='Inicio de Floracion'
                                    className={classes.input}
                                    labelPlacement='top'
                                    control={
                                        <Input type='date' value={inicioFloracion} placeholder={date} onChange={e=>{setInicioFloracion(e.target.value)}}/>
                                    }
                                />
                            </div>
                        </>
                    )
                }
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