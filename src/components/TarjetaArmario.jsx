import React from 'react'
import {Paper,List,ListItem,ListItemText,makeStyles,Grow,Avatar} from '@material-ui/core'
import periodoImg from '../images/periodo.svg'
import reloj from '../images/reloj.svg'
import ciclo from '../images/ciclo.svg'

const useStyles=makeStyles(theme=>({
    paper:{
        backgroundColor:theme.palette.primary.main,
        padding:theme.spacing(1),
        flexGrow:'1',
        marginTop:theme.spacing(2),
        marginLeft:theme.spacing(1),
        marginRight:theme.spacing(1),
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:'180px'
    },
    listText:{
        color:theme.palette.primary.contrastText,
        '& .MuiTypography-colorTextSecondary':{
            color:theme.palette.primary.contrastText,
        }
    },
    itemList:{
        display:'flex',
        fleWrap:'nowrap',
        overflow:'auto',
        width:'100%',
        marginTop:theme.spacing(2)
    },
    paperMain:{
        display:'flex',
        width:'100%',
        padding:theme.spacing(1),
        backgroundColor:theme.palette.type==='dark'?theme.palette.secondary.main:theme.palette.primary.dark,
        borderRadius:'0'
    },
    avatar:{
        padding:theme.spacing(1),
        width:theme.spacing(7),
        height:theme.spacing(7)
    }
}))
export const TarjetaArmario = ({periodo,horaDeInicio,cicloLuminico})=>{
    const convertirHora=hora=>{
        if(hora<=24){
            return hora<10?`0${hora}:00 Hs`:`${hora}:00 Hs`
        }
        else{
            let newHora = hora-24
            return newHora<10?`0${newHora}:00 Hs +1`:`${newHora}:00 Hs +1`
        }
    }
    const classes = useStyles()
    return(
        <Grow in={true}
        {...(true ? { timeout: 1500 } : {})}>
            <>
                <div className="col-auto p-0">
                    <Paper elevation={3} className={classes.paper}>
                        <Avatar src={periodoImg} className={classes.avatar}/>
                        <ListItemText className={classes.listText} primary='Periodo' secondary={periodo}/>
                    </Paper>
                </div>
                <div className="col-auto p-0">
                    <Paper elevation={3} className={classes.paper}>
                        <Avatar src={ciclo} className={classes.avatar}/>
                        <ListItemText className={classes.listText} primary='Ciclo Luminico' secondary={convertirHora(cicloLuminico)}/>
                    </Paper>
                </div>
                <div className="col-auto p-0">
                    <Paper elevation={3} className={classes.paper}>
                        <Avatar src={reloj} className={classes.avatar}/>
                        <ListItemText className={classes.listText} primary='Hora De Inicio' secondary={convertirHora(horaDeInicio)}/>
                    </Paper>
                </div>
                <div className="col-auto p-0">
                    <Paper elevation={3} className={classes.paper}>
                        <Avatar src={reloj} className={classes.avatar}/>
                        <ListItemText className={classes.listText} primary='Hora De Final' secondary={convertirHora(horaDeInicio+cicloLuminico)}/>
                    </Paper>
                </div>
            </>
        </Grow>
    )
}