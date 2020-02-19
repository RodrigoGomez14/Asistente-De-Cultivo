import React from 'react'
import {makeStyles,Typography,ExpansionPanel,ExpansionPanelSummary,ExpansionPanelDetails,TextField,InputAdornment,Button} from '@material-ui/core'
import {CheckCircle,ExpandMore} from '@material-ui/icons'
const useStyles = makeStyles(theme=>({
    root:{
        width:'100%',
        display:'flex',
        justifyContent:'center',
        marginTop:theme.spacing(1)
    },
    expansionPanel:{
        width:'50%'
    },
    ExpansionPanelDetails:{
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
    },
    button:{
        marginTop:theme.spacing(1)
    }
}))
export const InputCantidadCosechada = ({inputCantidad,setInputCantidad,guardarCantidadCosechada}) =>{
    const classes = useStyles()
    return(
        <div className={classes.root}>
            <ExpansionPanel className={classes.expansionPanel}>
                <ExpansionPanelSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                    <Typography className={classes.heading}>Ingresar Cantidad Cosechada</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.ExpansionPanelDetails}>
                    <TextField id="outlined-basic" 
                        value={inputCantidad}
                        type='number'
                        label="Cantidad Cosechada"
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                gr
                            </InputAdornment>
                            ),
                        }}
                        variant="outlined"
                        onChange={e=>{
                            setInputCantidad(e.target.value)
                        }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={e=>{
                            guardarCantidadCosechada()
                        }}
                        endIcon={
                            <CheckCircle/>
                        }
                        >
                        Guardar 
                    </Button>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    )
}
