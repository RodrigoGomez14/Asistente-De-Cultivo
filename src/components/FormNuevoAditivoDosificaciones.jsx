import React,{useState} from 'react'
import {Form,Row,Col,Container, Accordion, Card,InputGroup} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import {TextField,Paper,makeStyles,Button,FormControl,InputLabel,Select,MenuItem,Typography} from '@material-ui/core'
import {AddOutlined} from '@material-ui/icons'
import {database} from 'firebase'
const useStyles = makeStyles(theme=>({
    root:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        paddingTop:theme.spacing(2)
    },
    form:{
        display:'flex',
        flexDirection:'column',
        marginLeft:theme.spacing(1),
        marginRight:theme.spacing(1)
    },
    firstPaper:{
        width:'300px',
        display:'flex',
        flexDirection:'column',
        marginTop:theme.spacing(1),
        padding:theme.spacing(4),
        backgroundColor:theme.palette.primary.main
    },
    secondPaper:{
        padding:theme.spacing(4),
        marginTop:theme.spacing(1),
        width:'80%',
        backgroundColor:theme.palette.primary.main
    },
    dosisList:{
        display:'flex',
        flexWrap:'nowrap',
        overflow:'auto',
        width:'100%',
        marginBottom:theme.spacing(1)
    },
    button:{
        marginTop:theme.spacing(2),
        marginBottom:theme.spacing(2),
    }
}))

export const FormNuevoAditivoDosificaciones = ({updateState}) =>{
    let [cantidadDeDosis,setCantidadDeDosis]=useState(1)
    const exaplmesForInput=['Periodo Vegetativo','Cualquier Momento','Post Germinacion']
    const classes = useStyles()
    return(
        <div className='container-fluid'>
            <Button
                variant='outlined'
                color='#fff'
                className={classes.button}
                startIcon={<AddOutlined/>}
                onClick={e=>{
                    setCantidadDeDosis(cantidadDeDosis+=1)
                }}
            >
                Agregar otra dosis
            </Button>
            <div className='row flex-nowrap overflow-auto'>
                {new Array(cantidadDeDosis).fill(undefined).map((vacio,i)=>(
                    <form className='col-auto d-flex flex-column'>
                        <TextField label="Etapa"  color='#fff' placeholder={exaplmesForInput[i]?exaplmesForInput[i]:null} onChange={e=>{
                            updateState(e.target.value,'etapa','dosis'+i)
                        }}/>
                        <TextField label="Cantidad" type='number' color='#fff' onChange={e=>{
                            updateState(parseFloat(e.target.value),'cantidad','dosis'+i)
                        }}/>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">Tipo De Dosificacion</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                color='#fff'
                                onChange={e=>{
                                    updateState(e.target.value,'tipoDeDosis',"dosis"+i)
                                }}
                            >
                                <MenuItem value={'1'}>gr/L</MenuItem>
                                <MenuItem value={'2'}>ml/L</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">Tipo De Aplicacion</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                color='#fff'
                                id="demo-simple-select"
                                onChange={e=>{
                                    updateState(e.target.value,'tipoDeRiego','dosis'+i)
                                }}
                            >
                                <MenuItem value={'Tierra'}>Tierra</MenuItem>
                                <MenuItem value={'Foliar'}>Foliar</MenuItem>
                            </Select>
                        </FormControl>
                    </form>
                ))}
            </div>
        </div>
    )
}