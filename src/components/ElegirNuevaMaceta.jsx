import React , {Component} from 'react'
import {Row,Col,Container} from 'react-bootstrap'
import {TextField,makeStyles,InputAdornment} from '@material-ui/core'

const useStyles= makeStyles(theme=>({
    radio:{
        color:theme.palette.primary.contrastText,
        '& .MuiIconButton-label':{
            color: theme.palette.primary.contrastText
        }
    }
}))

export const ElegirNuevaMaceta=(props)=>{
    const classes = useStyles()
    return(
        <Container className='pt-4'>
            <Row>
                <Col sm={{span:8,offset:2}}>
                    <div className="row my-2 justify-content-center">
                        <div className="col-4">
                            <TextField id="outlined-basic" 
                            value={props.nuevoVolumen}
                            className={classes.radio}
                            type='number'
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    Lt
                                </InputAdornment>
                                ),
                            }}
                            label="Nueva Maceta" 
                            variant="outlined"
                                onChange={e=>{
                                    props.handleChange(e.target.value)
                                }}
                            />
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}