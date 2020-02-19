import React,{useState}from 'react'
import { Paper,ListItem,List,ListItemText,FormControl,InputLabel,Select,MenuItem,makeStyles,Switch,FormControlLabel,TextField,InputAdornment,Grow,Button, Typography } from '@material-ui/core'
import {Alert,AlertTitle} from '@material-ui/lab'
import {database} from 'firebase'

const useStyles=makeStyles(theme=>({
    root:{
        width:'100%',
        display:'flex',
        justifyContent:'center'
    },
    paper:{
        marginTop:theme.spacing(1),
        width:'500px',
        display:'flex',
        flexDirection:'column',
        padding:theme.spacing(1),
        marginLeft:theme.spacing(1),
        marginRight:theme.spacing(1),
    },
    FormControl:{
        marginTop:theme.spacing(2),
    },
    FormControlSwitch:{
        marginLeft:'auto',
        marginRight:'auto'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    inputCicloLuminico:{
        display:'flex',
        flexDirection:'column'
    },
    alert:{
        marginTop:theme.spacing(1)
    }
}))
const getFullDate=()=>{
    const date = new Date
    const year = date.getFullYear()
    let month = date.getMonth()+1
    month = month<10?month=`0${month}`:month
    const days = date.getDate()
    return`${days}/${month}/${year}`
}
export const ListConfig =({switchValue,setSwitchValue,horaDeInicio,cambiarHoraDeInicio,periodo,cambiarPeriodo,cicloLuminico,cambiarCicloLuminico,plantas,user})=>{
    const classes = useStyles()
    let [errorCicloLuminico,setErrorCicloLuminico]= useState(undefined)
    let [horaDeRespaldo,setHoraDeRespaldo]= useState(undefined)
    return(
        <div className={classes.root}>
            <Paper elevation={3} className={classes.paper}>
                <FormControlLabel
                    className={classes.FormControlSwitch}
                    control={
                        <Switch checked={switchValue} onChange={e=>{setSwitchValue(e.target.checked)}} value="switch" />
                    }
                    label="Modo Oscuro"
                />
                <FormControl className={classes.FormControl}>
                    <InputLabel id="select-label">Periodo</InputLabel>
                    <Select
                        labelId="select-label"
                        readOnly={periodo&&true}
                        id="select"
                        value={periodo}
                        onChange={e=>{
                            cambiarPeriodo(e.target.value)
                        }}
                    >
                        <MenuItem value={'Vegetativo'}>Vegetativo</MenuItem>
                        <MenuItem value={'Floracion'}>Floracion</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className={classes.FormControl}>
                    <InputLabel id="select-label">Hora De Inicio Del Ciclo</InputLabel>
                    <Select
                        labelId="select-label"
                        id="select"
                        value={horaDeInicio}
                        startAdornment={
                            <InputAdornment position="start">HS</InputAdornment>
                        }
                        onChange={e=>{
                            cambiarHoraDeInicio(e.target.value)
                        }}
                    >
                        {new Array(24).fill(undefined).map((hour,index)=>(
                            <MenuItem value={index}>
                                {index<10?`0${index}:00`:`${index}:00`}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl className={classes.FormControl}>
                    <InputLabel id="select-label">Duracion Del Ciclo</InputLabel>
                    <Select
                        labelId="select-label"
                        id="select"
                        value={cicloLuminico}
                        error={errorCicloLuminico}
                        startAdornment={
                            <InputAdornment position="start">HS</InputAdornment>
                        }
                        onChange={e=>{
                            console.log(e.target.value)
                            if(e.target.value<13&&periodo==='Vegetativo'){
                                setErrorCicloLuminico('Si este es menor de 13 Hs el armario pasara al periodo de Floracion, se establecera la fecha de inicio de floracion de cada planta al dia de hoy')
                                setHoraDeRespaldo(e.target.value)
                            }
                            if(e.target.value>=13&&periodo==='Floracion'){
                                setErrorCicloLuminico('Si este es mayor de 13 Hs el armario pasara al periodo Vegetativo')
                                setHoraDeRespaldo(e.target.value)
                            }
                            else{
                                cambiarCicloLuminico(e.target.value)
                            }
                        }}
                    >
                        {new Array(25).fill(undefined).map((hour,index)=>(
                            index&&
                                <MenuItem value={index}>
                                    {index}
                                </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {errorCicloLuminico&&
                <Grow in={true}>
                <   Alert className={classes.alert} variant="filled" severity="warning">
                        <Typography>
                            Quiere cambiar el ciclo luminico a {horaDeRespaldo} HS?
                        </Typography>
                        {errorCicloLuminico}
                        <Button
                            variant='contained'
                            onClick={e=>{
                                const periodo = horaDeRespaldo>=13?'Vegetativo':'Floracion'
                                cambiarCicloLuminico(horaDeRespaldo)
                                cambiarPeriodo(periodo)
                                if(periodo==='Floracion'){
                                    {plantas&&
                                        Object.keys(plantas).map(async key=>{
                                            if(!plantas[key].inicioFloracion){
                                                await database().ref().child(user).child('plantas').child(key).update({
                                                    inicioFloracion:getFullDate()
                                                })
                                            }
                                        })
                                    }
                                }
                                setErrorCicloLuminico(undefined)
                            }}>
                            Continuar
                        </Button>
                    </Alert>
                </Grow>
                }
            </Paper>
        </div>
    )
}