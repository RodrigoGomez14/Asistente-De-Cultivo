import React,{useState} from 'react'
import {Paper, TextField,makeStyles,Typography,FormControl,InputLabel,Select,MenuItem,Button,InputAdornment} from '@material-ui/core'
import {Alert,AlertTitle} from '@material-ui/lab'
import {CheckCircleOutlineOutlined} from '@material-ui/icons'
const useStyles = makeStyles(theme=>({
    root:{
        height:'100vh',
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-around',
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
    paper:{
        backgroundColor:theme.palette.primary.main
    },
    input:{
        marginTop:theme.spacing(1),
        marginBottom:theme.spacing(1),
    }
}))


export const FormNuevaPlanta =({guardarNuevaPlantaDB,periodoArmario})=>{
    const getDate=()=>{
        const date = new Date
        const year = date.getFullYear()
        let month = date.getMonth()+1
        month = month<10?month=`0${month}`:month
        const days = date.getDate()
        return`${days}/${month}/${year}`
    }
    const classes = useStyles()
    let [nombre,setNombre]=useState(undefined)
    let [genetica,setGenetica]=useState(undefined)
    let [etapa,setEtapa]=useState(undefined)
    let [selectedDate,setSelectedDate]=useState(undefined)
    let [inicioGerminacion,setInicioGerminacion]= useState(getDate())
    let [inicioVegetativo,setInicioVegetativo]= useState(undefined)
    let [inicioFloracion,setInicioFloracion]= useState(undefined)
    let [volumenMaceta,setVolumenMaceta]= useState(undefined)

    const handleDateChange = date => {
        setSelectedDate(date);
    };
    
    const renderInputsEtapa=etapa=>{
        const date = getDate()
        switch (etapa) {
            case 'Vegetativo':
                if(periodoArmario===etapa ){
                    return(
                        <>
                            <TextField label="Incio Germinacion" value={inicioGerminacion} placeholder={date} onChange={e=>{setInicioGerminacion(e.target.value)}}/>
                            <TextField label="Incio Vegetativo" value={inicioVegetativo} disabled={date===inicioGerminacion&&true} placeholder={date} onChange={e=>{setInicioVegetativo(e.target.value)}}/>
                        </>
                    )
                }
                else{
                    return(
                        <>  
                            <Alert variant='outlined' severity="warning">
                                <AlertTitle>Si ingresa esta planta al armario empezara el periodo de floracion</AlertTitle>
                            </Alert>
                            <TextField label="Incio Germinacion" value={inicioGerminacion} placeholder={date} onChange={e=>{setInicioGerminacion(e.target.value)}}/>
                            <TextField label="Incio Vegetativo" value={inicioVegetativo} disabled={!inicioGerminacion&&true} placeholder={date} onChange={e=>{setInicioVegetativo(e.target.value)}}/>
                        </>
                    )
                }
                break;
            case 'Floracion':
                if(periodoArmario===etapa){
                    return(
                        <>
                            <TextField label="Incio Germinacion" value={inicioGerminacion} placeholder={date} onChange={e=>{setInicioGerminacion(e.target.value)}}/>
                            <TextField label="Incio Vegetativo" value={inicioVegetativo} placeholder={date} onChange={e=>{setInicioVegetativo(e.target.value)}}/>
                            <TextField label="Incio Floracion" value={inicioFloracion} placeholder={date} onChange={e=>{setInicioFloracion(e.target.value)}}/>
                        </>
                    )
                }
                else{
                    return(
                        <>
                            <Alert variant='outlined' severity="error">
                                <AlertTitle>No es recomendable introducir una planta en periodo de floracion en un armario con periodo Vegetativo</AlertTitle>
                            </Alert>
                            <TextField label="Incio Germinacion" value={inicioGerminacion} placeholder={date} onChange={e=>{setInicioGerminacion(e.target.value)}}/>
                            <TextField label="Incio Vegetativo" value={inicioVegetativo} placeholder={date} onChange={e=>{setInicioVegetativo(e.target.value)}}/>
                            <TextField label="Incio Floracion" value={inicioFloracion} placeholder={date} onChange={e=>{setInicioFloracion(e.target.value)}}/>
                        </>
                    )
                }
                break;
            default:
                break;
        }
    }
    return(
        <div className={classes.root}>
            <Paper elevation={6} className={classes.paper}>
                <form className={classes.form}>
                    <Typography className={classes.title}>
                        Ingresa los siguientes datos
                    </Typography>
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
                                    setInicioGerminacion(getDate())
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
            </Paper>
            {etapa &&
                <Paper elevation={6}>
                    <form className={classes.form}>
                        {renderInputsEtapa(etapa)}
                    </form>
                </Paper>
            }

            <Button
                variant='contained'
                color='primary'
                disabled={!nombre&&true}
                startIcon={<CheckCircleOutlineOutlined/>}
                onClick={e=>{
                    guardarNuevaPlantaDB(nombre,genetica,inicioGerminacion,inicioVegetativo,inicioFloracion,volumenMaceta)
                }}
            >
                Agregar Planta!
            </Button>
        </div>
    )
}