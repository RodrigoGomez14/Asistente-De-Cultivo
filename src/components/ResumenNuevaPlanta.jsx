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

export const ResumenNuevaPlanta=({})=>{
  const classes = useStyles();
  return (
    <div className={classes.root}>
        <List>
            <ListItem>
                <ListItemText className={classes.listItemText} primary='Tipo De Poda' />    
            </ListItem>
        </List>
    </div>
);
}