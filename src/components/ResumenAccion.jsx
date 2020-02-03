import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles({
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
  },
  pos: {
    marginBottom: 12,
  },
});

export const ResumenAccion=({tipoDeRiego,plantas,aditivos,cantidadDeAgua,tipoDePoda})=>{
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  return (
    <Grid item xs={12}>
        <Grid container justify="space-around" className='mb-2' >
            <Grid item>     
                <Paper elevation={3}>
                    <Card className={classes.card} variant="outlined">
                        <CardContent>
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
                        </CardContent>
                    </Card>
                </Paper>
            </Grid>
            {tipoDeRiego?
                <>  
                    <Grid item>      
                        <Paper elevation={3}>
                            <Card className={classes.card} variant="outlined">
                                <CardContent>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        Tipo De Riego
                                    </Typography>
                                        <Typography className={classes.pos} color="textSecondary">
                                            <strong>{tipoDeRiego}</strong>
                                        </Typography>
                                </CardContent>
                            </Card>
                        </Paper>
                    </Grid>
                    <Grid item>      
                        <Paper elevation={3}>
                            <Card className={classes.card} variant="outlined">
                                <CardContent>
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
                                </CardContent>
                            </Card>
                        </Paper>
                    </Grid>
                </>
                :
                <Grid item>      
                    <Paper elevation={3}>
                        <Card className={classes.card} variant="outlined">
                            <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    Tipo De Poda
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                    <strong>{tipoDePoda}</strong>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Paper>
                </Grid>
            }
        </Grid>
    </Grid>
);
}