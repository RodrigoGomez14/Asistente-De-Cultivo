import React from 'react'
import {TextField,makeStyles} from '@material-ui/core'
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

export const FormNuevoAditivoCaracteristicas = ({updateState,dosis}) =>{
    const classes = useStyles()
    return(
        <div className={classes.root}>
            {console.log(dosis)}
            <div className={classes.form}>
                <TextField label="Nombre"  onChange={e=>{
                    updateState(e.target.value,'nombre')
                }}/>
                <TextField label="Marca"  onChange={e=>{
                    updateState(e.target.value,'marca')
                }}/>
                <TextField label="Descripcion"  multiline onChange={e=>{
                    updateState(e.target.value,'descripcion')
                }}/>
            </div>
        </div>
    )
}