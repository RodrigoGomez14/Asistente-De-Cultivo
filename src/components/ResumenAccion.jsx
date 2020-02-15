import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { makeStyles,Paper,List,ListItem,ListItemText } from '@material-ui/core';

const useStyles = makeStyles(theme=>({
  card: {
    minWidth: 275,
  },
  root:{
      margin:'0'
  },
  title: {
    fontSize: 14,
    color:theme.palette.secondary.contrastText,
  },
  pos: {
    marginBottom: 12,
    color:theme.palette.secondary.contrastText,
  },
  paper:{
    backgroundColor:theme.palette.type==='dark'&&theme.palette.secondary.light,
    color:theme.palette.secondary.contrastText,
    padding: theme.spacing(1)
},
containerPlantas:{
    textAlign:'left',
    paddingLeft:theme.spacing(2),
    paddingTop:theme.spacing(2)
},
listItemText:{
    color:theme.palette.type==='dark'?theme.palette.primary.contrastText:theme.palette.secondary.light,
    '& .MuiTypography-colorTextSecondary':{
        color:theme.palette.type==='dark'?theme.palette.primary.contrastText:theme.palette.secondary.light,
    },
},
title:{
    color:theme.palette.type==='dark'?theme.palette.primary.contrastText:theme.palette.secondary.light,
}
}));

export const ResumenAccion=({tipoDeRiego,plantas,aditivos,cantidadDeAgua,tipoDePoda,nuevaMaceta})=>{
  const classes = useStyles();
  return (
    <div className={classes.root}>
            {tipoDePoda &&
                <List>
                    <ListItem>
                        <ListItemText className={classes.listItemText} primary='Tipo De Poda' secondary={tipoDePoda}/>    
                    </ListItem>
                </List>
            }
            {nuevaMaceta &&  
                <List>
                    <ListItem>
                        <ListItemText className={classes.listItemText} primary='Nuevo Volumen De Maceta' secondary={`${nuevaMaceta} Lt`}/>    
                    </ListItem>
                </List>
            }
            {tipoDeRiego&&cantidadDeAgua&&
                <List>
                    <ListItem>
                        <ListItemText className={classes.listItemText}  primary='Tipo De Riego' secondary={tipoDeRiego}/>    
                    </ListItem>
                    <ListItem>
                        <ListItemText className={classes.listItemText} primary='Cantidad De Agua' secondary={`${cantidadDeAgua} Lt`}/>    
                    </ListItem>
                </List>
            }
            <Divider/>
            <div className={classes.containerPlantas}>
                <Typography className={classes.title} variant='h6'>
                    Plantas Seleccionadas
                </Typography>
                <List>
                    {plantas.map(planta => (
                        planta.selected &&
                        <ListItem>
                            <ListItemText className={classes.listItemText} primary={planta.nombre}/>    
                        </ListItem>
                    ))}
                </List>
            </div>
            <Divider/>
            {tipoDeRiego &&
                <div className={classes.containerPlantas}>
                    <Typography className={classes.title} variant='h6'>
                        Aditivos Usados
                    </Typography>
                    <List>
                        {aditivos?
                            Object.keys(aditivos).map(aditivo=>{
                                const dosis= aditivos[aditivo]
                                return(
                                    <ListItem>
                                        <ListItemText className={classes.listItemText} primary={aditivo} secondary={`${parseFloat(dosis.slice(0,dosis.indexOf(' '))*cantidadDeAgua).toFixed(2)} ${dosis.slice(dosis.indexOf(' '),dosis.indexOf('/'))}`}/>    
                                    </ListItem>
                                )
                            })
                            :
                            <ListItem>
                                <ListItemText className={classes.listItemText} primary='-'/>    
                            </ListItem>
                        }
                    </List>
                </div>
            }
    </div>
);
}