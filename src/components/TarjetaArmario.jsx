import React from 'react'
import {Paper,List,ListItem,ListItemText,makeStyles,Grow} from '@material-ui/core'
const useStyles=makeStyles(theme=>({
    paper:{
        flexGrow:'1',
        marginLeft:theme.spacing(1),
        marginRight:theme.spacing(1),
        backgroundColor:theme.palette.primary.main,
    },
    listText:{
        color:theme.palette.primary.contrastText,
        '& .MuiTypography-colorTextSecondary':{
            color:theme.palette.primary.contrastText,
        }
    },
    itemList:{
        display:'flex',
        justifyContent:'space-around',
        width:'100%',
        marginTop:theme.spacing(2)
    },
    paperMain:{
        display:'flex',
        width:'100%',
        padding:theme.spacing(1),
        backgroundColor:theme.palette.type==='dark'?theme.palette.secondary.main:theme.palette.primary.dark,
        borderRadius:'0'
    }
}))
export const TarjetaArmario = ({periodo,horaDeInicio,cicloLuminico})=>{
    const convertirHora=hora=>{
        return hora<10?`0${hora}:00 Hs`:`${hora}:00 Hs`
    }
    const classes = useStyles()
    return(
        <Grow in={true}
            {...(true ? { timeout: 1500 } : {})}>
            <div className={classes.itemList}>
                <Paper elevation={3} className={classes.paper}>
                    <ListItemText className={classes.listText} primary='Periodo' secondary={periodo}/>
                </Paper>
                <Paper elevation={3} className={classes.paper}>
                    <ListItemText className={classes.listText} primary='Ciclo Luminico' secondary={convertirHora(cicloLuminico)}/>
                </Paper>
                <Paper elevation={3} className={classes.paper}>
                    <ListItemText className={classes.listText} primary='Hora De Inicio' secondary={convertirHora(horaDeInicio)}/>
                </Paper>
                <Paper elevation={3} className={classes.paper}>
                    <ListItemText className={classes.listText} primary='Hora De Final' secondary={convertirHora(horaDeInicio+cicloLuminico)}/>
                </Paper>
            </div>
        </Grow>
    )
}