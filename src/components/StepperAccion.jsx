import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {BotoneraConfirmacionAccion} from './BotoneraConfirmacionAccion'
import {Grow} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height:'100%',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  buttonPrimary:{
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    backgroundColor:theme.palette.secondary.main,
    color:theme.palette.secondary.contrastText,
    '& :hover':{
      color:theme.palette.primary.contrastText,
    }
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  paperSecondary:{
    paddingBottom:theme.spacing(2),
    paddingTop:theme.spacing(2),
    backgroundColor:theme.palette.primary.dark,
  },
  padding:{
    paddingBottom:theme.spacing(1),
    backgroundColor:theme.palette.secondary.light,
    color:theme.palette.secondary.contrastText
  },
  stepper:{
    backgroundColor:'transparent'
  },
  stepTitle:{
    '& .MuiStepLabel-label':{
      color:theme.palette.primary.contrastText
    },
  },
  resetContainer:{
    background:'linear-gradient(transparent 15%, #000)',
    height:'100%',
    paddingTop:theme.spacing(1)
  }
}));


export const  StepperAccion=({steps,cantidadDeAgua,tipoDeRiego,confirmarAccion,resumenAccion,tipoDeAccion,tipoDePoda,selectedPlants})=>{
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const setDisabled=(activeStep,tipoDeRiego,cantidadDeAgua)=>{
    if(activeStep===0){
      return selectedPlants.length?false:true
    }
    else if(activeStep===1){
      if(tipoDeAccion==='Poda'){
        return tipoDePoda?false:true
      }
      else{
        return tipoDeRiego?false:true
      }
    }
    else if(activeStep===2){
        return cantidadDeAgua?false:true
    }
  }
  return (
    <Grow in={true}
      {...(true ? { timeout: 1500 } : {})}>
      <div className={classes.root}>
          <Stepper activeStep={activeStep} orientation="vertical" className={classes.stepper}>
            {steps.map((step, index) => (
              step?
                    <Step key={step.title}>
                      <Paper elevation={3} className={classes.paperSecondary}>
                        <StepLabel className={classes.stepTitle}>{step.title}</StepLabel>
                      </Paper>
                      <StepContent>
                        <Paper elevation={6} className={classes.padding}>
                            <Typography>{step.content}</Typography>
                            <div className={classes.actionsContainer}>
                                <div>
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    className={classes.button}
                                >
                                    Atras
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleNext}
                                    className={classes.buttonPrimary}
                                    disabled={setDisabled(activeStep,tipoDeRiego,cantidadDeAgua)}
                                >
                                    {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
                                </Button>
                                </div>
                            </div>
                          </Paper>
                        </StepContent>
                    </Step>
                    :
                    null
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={6} className={classes.resetContainer}>
                {resumenAccion}
                <BotoneraConfirmacionAccion
                    accion={tipoDeAccion}
                    handleBack={handleBack}
                    confirmarAccion={confirmarAccion}
                />
            </Paper>
          )}
      </div>
    </Grow>
  );
}