import React, {useState} from 'react'
import {Row,Col,Container} from 'react-bootstrap'
import './styles/accion-card.css'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {makeStyles} from '@material-ui/core'

const useStyles= makeStyles(theme=>({
    radio:{
        color:theme.palette.type==='dark'?theme.palette.primary.contrastText:theme.palette.secondary.light,
        '& .MuiIconButton-label':{
            color:theme.palette.type==='dark'?theme.palette.primary.contrastText:theme.palette.secondary.light,
        }
    }
}))


export const ElegirTipoDeRiego=({tipoDeRiego,cambiarTipoDeRiego})=>{
    const classes = useStyles()
    return(
        <Container className='pt-4'>
            <Row>
                <div className="col-auto ml-auto mr-auto">
                    <RadioGroup aria-label="position" name="position" value={tipoDeRiego} onChange={e=>{cambiarTipoDeRiego(e.target.value)}} row>
                        <FormControlLabel
                            className={classes.radio}
                            value="top"
                            control={<Radio
                                value="Tierra" 
                                name="Tierra"
                                color='primary'
                            />}
                            label='Tierra'
                            labelPlacement="top"
                        />
                        <FormControlLabel
                            value="top"
                            className={classes.radio}
                            control={<Radio
                                value="Foliar"
                                name="Foliar"
                                color='primary'
                            />}
                            label="Foliar"
                            labelPlacement="top"
                        />
                    </RadioGroup>
                </div>
            </Row>
        </Container>
    )
}