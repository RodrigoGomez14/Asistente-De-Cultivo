import React,{useState} from 'react'
import {Form,Row,Col,Container, Accordion, Card,InputGroup} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import {TextField,Paper,makeStyles,Button,FormControl,InputLabel,Select,MenuItem,Typography} from '@material-ui/core'
import {AddOutlined} from '@material-ui/icons'
import {database} from 'firebase'
const useStyles = makeStyles(theme=>({
    root:{
        height:'100%',
        width:'100%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-around',
        alignItems:'center'
    },
    firstPaper:{
        width:'75%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-around',
        padding:theme.spacing(4)
    },
    secondPaper:{
        padding:theme.spacing(4),
        maxWidth:'75%',
    },
    dosisList:{
        display:'flex',
        flexWrap:'nowrap',
        overflow:'auto',
        width:'100%',
        marginBottom:theme.spacing(1)
    },
    form:{
        display:'flex',
        minWidth:'200px',
        margin:theme.spacing(1),
        flexDirection:'column'
    }
}))

export const FormNuevoAditivo = ({aditivos,tipoDeAditivo,user,history}) =>{
    const [inputs,setInputs] = useState({})
    const [dosis,setDosis] = useState({})

    const ClasificarDosis = ()=>{
        let Riego={}
        let Foliar={}
        Object.keys(dosis).map(newDosis=>{
            let tipoDeDosis= dosis[newDosis].tipoDeDosis?'gr/L':'ml/L'
            if(dosis[newDosis].tipoDeRiego==='Foliar'){
                Foliar={
                    ...Foliar,
                    [dosis[newDosis].etapa]:`${dosis[newDosis].cantidad} ${tipoDeDosis}`
                }
            }
            else{
                Riego={
                    ...Riego,
                    [dosis[newDosis].etapa]:`${dosis[newDosis].cantidad} ${tipoDeDosis}`
                }
            }
        })
        return{Riego,Foliar}
    }
    const agregarAditivo= async ()=>{
        const {Riego,Foliar}=ClasificarDosis()
        const newAditivo= {
            nombre:inputs.nombre,
            marca:inputs.marca,
            descripcion:inputs.descripcion,
            dosis:{
                Tierra:Riego,
                Foliar:Foliar
            }
        }
        let newAditivos=aditivos
        newAditivos.push(newAditivo)
        console.log(tipoDeAditivo)
        switch (tipoDeAditivo) {
            case 'Fertilizantes':
                await database().ref().child(user).update({
                    fertilizantes:newAditivos
                })
                break;
            case 'Insecticidas':
                await database().ref().child(user).update({
                    insecticidas:newAditivos
                })
                break;
            default:
                break;
        }
    }
    const updateState=(valor,nombre,indexDosis)=>{
        if(indexDosis){
            setDosis({
                ...dosis,
                [indexDosis]:{
                    ...dosis[indexDosis],
                    [nombre]:valor
                }
            })
        }
        else{
            setInputs({
                ...inputs,
                [nombre]:valor
            })
        }
    }
    
    let [cantidadDeDosis,setCantidadDeDosis]=useState(1)
    const exaplmesForInput=['Periodo Vegetativo','Cualquier Momento','Post Germinacion']
    let dosisList = []
    const classes = useStyles()
    return(
        <div className={classes.root}>
            <Paper elevation={4} className={classes.firstPaper}>
                <Typography>
                    Caracteristicas
                </Typography>
                <TextField label="Nombre"  onChange={e=>{
                    updateState(e.target.value,'nombre')
                }}/>
                <TextField label="Marca"  onChange={e=>{
                    updateState(e.target.value,'marca')
                }}/>
                <TextField label="Descripcion"  multiline onChange={e=>{
                    updateState(e.target.value,'descripcion')
                }}/>
            </Paper>
            <Paper elevation={4} className={classes.secondPaper}>
                <Typography>
                    Dosificacion
                </Typography>
                <Button
                    variant='text'
                    color='primary'
                    startIcon={<AddOutlined/>}
                    onClick={e=>{
                        setCantidadDeDosis(cantidadDeDosis+=1)
                    }}
                >
                    Agregar otra dosis
                </Button>
                <div className={classes.dosisList}>
                    {new Array(cantidadDeDosis).fill(undefined).map((vacio,i)=>(
                        <form className={classes.form}>
                            <TextField label="Etapa"  placeholder={exaplmesForInput[i]?exaplmesForInput[i]:null} onChange={e=>{
                                updateState(e.target.value,'etapa','dosis'+i)
                            }}/>
                            <TextField label="Cantidad" onChange={e=>{
                                updateState(parseFloat(e.target.value),'cantidad','dosis'+i)
                            }}/>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">Tipo De Dosificacion</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
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
            </Paper>
            <Button
                variant='contained'
                color='primary'
                onClick={e=>{
                    agregarAditivo()
                }}
            >
                Agregar {tipoDeAditivo}!
            </Button>
        </div>
    )
}