import React from 'react'
import {Paper,List,ListItem,ListItemText,makeStyles,Grow} from '@material-ui/core'
const useStyles=makeStyles(theme=>({
    paper:{
        backgroundColor:theme.palette.primary.dark
    },
    listText:{
        color:theme.palette.primary.contrastText,
        '& .MuiTypography-colorTextSecondary':{
            color:theme.palette.primary.contrastText,
        }
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
            <Paper elevation={3} className={classes.paper}>
                <List>
                    <ListItem>
                        <ListItemText className={classes.listText} primary='Periodo' secondary={periodo}/>
                    </ListItem>
                    <ListItem>
                        <ListItemText className={classes.listText} primary='Ciclo Luminico' secondary={convertirHora(cicloLuminico)}/>
                    </ListItem>
                    <ListItem>
                        <ListItemText className={classes.listText} primary='Hora De Inicio' secondary={convertirHora(horaDeInicio)}/>
                    </ListItem>
                    <ListItem>
                        <ListItemText className={classes.listText} primary='Hora De Final' secondary={convertirHora(horaDeInicio+cicloLuminico)}/>
                    </ListItem>
                </List>
            </Paper>
        </Grow>
    )
}