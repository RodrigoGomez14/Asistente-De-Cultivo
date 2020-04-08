import React from 'react'
import {Row,Col} from 'react-bootstrap'
import {makeStyles,FormControlLabel,Checkbox,FormGroup} from '@material-ui/core'
import {Alert,AlertTitle} from '@material-ui/lab/'
import {Link} from 'react-router-dom'
const useStyles = makeStyles(theme => ({
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    alert:{
        alignItems:'center',
    },
    formControl:{
        margin: theme.spacing(1),
        minWidth: 120,
        width:"100% !important",
        display:'flex',
        justifyContent:'center',
        color:theme.palette.type==='dark'?theme.palette.primary.contrastText:theme.palette.secondary.light,
        '& .MuiIconButton-label':{
            color:theme.palette.type==='dark'?theme.palette.primary.contrastText:theme.palette.secondary.light,
        }
    }
}));
export const ElegirPlantaAccion=({plantas,seleccionarPlanta})=>{
    const classes = useStyles()
    return(
        <Row>
            <Col sm={{span:8,offset:2}}>
                <div className="container pt-4">
                    <div className="row my-2 justify-content-center">
                        {plantas.length?
                        <FormGroup row>
                            {plantas.map((planta,i)=>(
                                <FormControlLabel
                                className={classes.formControl}
                                control={
                                    <Checkbox color='primary'  checked={planta.selected} onChange={e=>{
                                        seleccionarPlanta(i)}}
                                    value={planta.nombre} />
                                }
                                label={planta.nombre}
                                />
                            ))}
                        </FormGroup>
                        :
                        <div className="col-12">
                            <Alert severity="warning" variant='outlined' className={classes.alert}> <AlertTitle>No hay Plantas En el Armario - <Link to='/Nueva-Planta'>Agrega una ahora!</Link> </AlertTitle> </Alert>
                        </div>
                        }
                    </div>
                </div>
            </Col>
        </Row>
    )
}
export default ElegirPlantaAccion