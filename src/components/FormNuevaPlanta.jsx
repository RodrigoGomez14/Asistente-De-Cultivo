import React,{useState} from 'react'
import {Paper, TextField,makeStyles,Typography,FormControl,InputLabel,Select,MenuItem,Button} from '@material-ui/core'
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
}))


export const FormNuevaPlanta =({guardarNuevaPlantaDB})=>{
    const classes = useStyles()
    let [nombre,setNombre]=useState(undefined)
    let [genetica,setGenetica]=useState(undefined)
    let [etapa,setEtapa]=useState('Germiacion')
    let [selectedDate,setSelectedDate]=useState(undefined)

    const handleDateChange = date => {
        setSelectedDate(date);
    };
    return(
        <div className={classes.root}>
            <Paper elevation={6}>
                <form className={classes.form}>
                    <Typography className={classes.title}>
                        Ingresa los siguientes datos
                    </Typography>
                    <TextField label="Nombre" value={nombre} onChange={e=>{setNombre(e.target.value)}}/>
                    <TextField label="Genetica" value={genetica} onChange={e=>{setGenetica(e.target.value)}}/>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="etapa-select-label">Etapa</InputLabel>
                        <Select
                            labelId="etapa-select-label"
                            id="etapa-select"
                            value={etapa}
                            onChange={e=>{setEtapa(e.target.value)}}
                        >
                            <MenuItem value={'Germinacion'}>Germinacion</MenuItem>
                            <MenuItem value={'Vegetativo'}>Vegetativo</MenuItem>
                            <MenuItem value={'Floracion'}>Floracion</MenuItem>
                        </Select>
                    </FormControl>
                </form>
            </Paper>
            <Button
                variant='contained'
                color='primary'
                startIcon={<CheckCircleOutlineOutlined/>}
                onClick={e=>{
                    guardarNuevaPlantaDB(nombre,genetica,etapa)
                }}
            >
                Agregar Planta!
            </Button>
        </div>
    )
}