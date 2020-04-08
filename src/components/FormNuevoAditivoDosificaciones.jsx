import React,{useState} from 'react'
import {TextField,makeStyles,Button,FormControl,InputLabel,Select,MenuItem,Typography,Dialog,DialogTitle,DialogContent,DialogActions,List,ListItem,ListItemText,Card,CardContent,InputAdornment} from '@material-ui/core'
import {AddOutlined} from '@material-ui/icons'
const useStyles = makeStyles(theme=>({
    root:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        paddingTop:theme.spacing(2)
    },
    form:{
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

export const FormNuevoAditivoDosificaciones = ({updateState,dosis,setDosis}) =>{
    let [openDialog,setOpenDialog]=useState(false)
    let [etapa,setEtapa]=useState(undefined)
    let [cantidad,setCantidad]=useState(undefined)
    let [tipoDeDosis,setTipoDeDosis]=useState(undefined)
    let [tipoDeRiego,setTipoDeRiego]=useState(undefined)


    const guardarDosis = ()=>{
        const newDosis = {
            ...dosis,
            [Object.keys(dosis).length]:{
                etapa:etapa,
                cantidad:cantidad,
                tipoDeDosis:tipoDeDosis,
                tipoDeRiego:tipoDeRiego
            }
        }
        setDosis(newDosis)
    }
    const resetInputs =()=>{
        setEtapa(undefined)
        setCantidad(undefined)
        setTipoDeDosis(undefined)
        setTipoDeRiego(undefined)
    }
    const classes = useStyles()
    const handleClose = ()=>{setOpenDialog(false)}
    return(
        <div className='container-fluid'>
            <Button
                variant='outlined'
                color='#fff'
                className={classes.button}
                startIcon={<AddOutlined/>}
                onClick={e=>{
                    setOpenDialog(true)
                }}
            >
                Agregar otra dosis
            </Button>
            {Object.keys(dosis).length!== 0?
                <div className={classes.dosisList}>
                    {Object.keys(dosis).map(key=>(
                        <Card elevation={3} className={classes.form}>
                            <CardContent>
                                <Typography variant='h6'>
                                    Dosis {parseInt(key)+1}
                                </Typography>
                                <List>
                                    <ListItem>
                                        <ListItemText primary='Etapa' secondary={dosis[key].etapa} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary='Cantidad' secondary={dosis[key].cantidad} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary='Tipo De Dosis' secondary={dosis[key].tipoDeDosis===1?'gr/l':'ml/l'} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary='Tipo De Riego' secondary={dosis[key].tipoDeRiego} />
                                    </ListItem>
                                </List>
                            </CardContent>
                        </Card>
                        ))
                    }
                </div>
                :
                null
            }
            <Dialog
                open={openDialog}
                onClose={handleClose}
            >
                <DialogTitle >{"Agregar Nueva Dosificacion"}</DialogTitle>
                <DialogContent>
                <form className='col-auto d-flex flex-column'>
                        <TextField label="Etapa"  color='#fff' placeholder='Ciclo Vegetativo' onChange={e=>{
                            setEtapa(e.target.value)
                        }}/>
                        <TextField label="Cantidad y Tipo de dosis" type='number' placeholder='5' color='#fff' 
                        InputProps={{
                            startAdornment: 
                                <InputAdornment position="start">
                                    <Select
                                        labelId="demo-simple-select-label"
                                        placeholder='ml/l'
                                        id="demo-simple-select"
                                        color='#fff'
                                        onChange={e=>{
                                            setTipoDeDosis(e.target.value)
                                        }}
                                    >
                                        <MenuItem value={1}>gr/L</MenuItem>
                                        <MenuItem value={2}>ml/L</MenuItem>
                                    </Select>        
                                </InputAdornment>
                        }}
                        onChange={e=>{
                            setCantidad(parseFloat(e.target.value))
                        }}/>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">Tipo De Aplicacion</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                color='#fff'
                                id="demo-simple-select"
                                onChange={e=>{
                                    setTipoDeRiego(e.target.value)
                                }}
                            >
                                <MenuItem value={'Tierra'}>Tierra</MenuItem>
                                <MenuItem value={'Foliar'}>Foliar</MenuItem>
                            </Select>
                        </FormControl>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button 
                        disabled={etapa && cantidad && tipoDeDosis && tipoDeRiego?false:true}
                    onClick={()=>{
                        guardarDosis()
                        resetInputs()
                        handleClose()
                    }} color="primary" autoFocus>
                        Agregar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}