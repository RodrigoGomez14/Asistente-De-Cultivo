import React from 'react';
import { makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles(theme=>({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
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
      background:theme.palette.secondary.main,
      color:theme.palette.secondary.contrastText,
      padding: theme.spacing(1)
  }
}));

export const ResumenAccion=({tipoDeRiego,plantas,aditivos,cantidadDeAgua,tipoDePoda,nuevaMaceta})=>{
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  return (
    <Grid item xs={12}>
        <Grid container justify="space-around" alignItems='center' className='mb-2' >
            <Grid item>     
                <Paper elevation={3} className={classes.paper}>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Plantas Seleccionadas
                    </Typography>
                    {plantas.map(planta => (
                        planta.selected?
                            <Typography className={classes.pos} color="textSecondary">
                                <strong>{planta.nombre}</strong>
                            </Typography>
                            :
                            null
                    ))}
                </Paper>
            </Grid>
            {tipoDeRiego &&
                <>  
                    <Grid item>      
                        <Paper elevation={6} className={classes.paper}>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Tipo De Riego
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                <strong>{tipoDeRiego}</strong>
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item>      
                        <Paper elevation={6} className={classes.paper}>
                            <Typography className={classes.pos} color="textSecondary">
                                <strong>{cantidadDeAgua} L de agua</strong>
                            </Typography>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Aditivos usados
                            </Typography>
                            {aditivos?
                                Object.keys(aditivos).map(aditivo=>{
                                    const dosis= aditivos[aditivo]
                                    return(
                                        <Typography className={classes.pos} color="textSecondary">
                                            <strong> {aditivo} {parseFloat(dosis.slice(0,dosis.indexOf(' '))*cantidadDeAgua).toFixed(2)} {dosis.slice(dosis.indexOf(' '),dosis.indexOf('/'))}</strong>
                                        </Typography>
                                    )
                                })
                                :
                                <Typography className={classes.pos} color="textSecondary">
                                    <strong>-</strong>
                                </Typography>
                            }
                        </Paper>
                    </Grid>
                </>
            }
            {tipoDePoda &&
                <Grid item>      
                    <Paper elevation={6} className={classes.paper}>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Tipo De Poda
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            <strong>{tipoDePoda}</strong>
                        </Typography>
                    </Paper>
                </Grid>
            }
            {nuevaMaceta &&
                <Grid item>      
                    <Paper elevation={6} className={classes.paper}>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Nuevo volumen de maceta
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            <strong>{nuevaMaceta} Lt</strong>
                        </Typography>
                    </Paper>
                </Grid>
            }
        </Grid>
    </Grid>
);
}