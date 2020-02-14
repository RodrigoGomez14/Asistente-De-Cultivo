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
  root:{
    height:'100%',
    width:'100%',
    display:'flex',
    flexDirection:'column',
    justifyContent:'space.around',
    overflow:'auto',
    backgroundColor:theme.palette.type==='dark'?theme.palette.secondary.main:theme.palette.primary.dark,
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  buttonPrimary:{
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  paperSecondary:{
    backgroundColor:theme.palette.type==='dark'?theme.palette.primary.dark:theme.palette.primary.main,
    paddingBottom:theme.spacing(2),
    paddingTop:theme.spacing(2),
  },
  padding:{
    paddingBottom:theme.spacing(1),
    color:theme.palette.primary.contrastText,
    backgroundColor:theme.palette.secondary.light
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
    backgroundColor:theme.palette.secondary.light,
    width:'500px'
  },
  rootLastStep:{
    display:'flex',
    justifyContent:'center'
  }
}));


export const  StepperAccion=({steps,cantidadDeAgua,tipoDeRiego,confirmarAccion,resumenAccion,tipoDeAccion,tipoDePoda,selectedPlants,nuevaMaceta})=>{
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
      else if(tipoDeAccion==='Transplante'){
        return nuevaMaceta?false:true
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
    <Paper className={classes.root}>
    <Grow in={true}
      {...(true ? { timeout: 1500 } : {})}>
        <div>
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
            <Grow in={true}
            {...(true ? { timeout: 1500 } : {})}>
              <div className={classes.rootLastStep}>
                <Paper square elevation={6} className={classes.resetContainer}>
                    {resumenAccion}
                    <BotoneraConfirmacionAccion
                        accion={tipoDeAccion}
                        handleBack={handleBack}
                        confirmarAccion={confirmarAccion}
                    />
                </Paper>
              </div>
            </Grow>
          )}
        </div>
      </Grow>
    </Paper>
  );
}