import React, {useState} from 'react'
import {Row,Col} from 'react-bootstrap'
import './styles/accion-card.css'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export const ElegirTipoDeRiego=({tipoDeRiego,cambiarTipoDeRiego})=>{
    return(
        <Row>
            <div className="cola-auto ml-auto mr-auto">
                <RadioGroup aria-label="position" name="position" value={tipoDeRiego} onChange={e=>{cambiarTipoDeRiego(e.target.value)}} row>
                    <FormControlLabel
                        value="top"
                        control={<Radio
                            value="Tierra" 
                            name="Tierra"
                            color='default'
                        />}
                        label='Tierra'
                        labelPlacement="top"
                    />
                    <FormControlLabel
                        value="top"
                        control={<Radio
                            value="Foliar"
                            name="Foliar"
                            color='default'
                        />}
                        label="Foliar"
                        labelPlacement="top"
                    />
                </RadioGroup>
            </div>
        </Row>
    )
}