import React , {Component} from 'react'
import {Row,Col,Container} from 'react-bootstrap'
import {TextField,makeStyles} from '@material-ui/core'

const useStyles= makeStyles(theme=>({
    radio:{
        color:theme.palette.type==='dark'?theme.palette.primary.contrastText:theme.palette.secondary.light,
        '& .MuiIconButton-label':{
            color:theme.palette.type==='dark'?theme.palette.primary.contrastText:theme.palette.secondary.light,
        }
    }
}))

export const ElegirTipoDePoda=(props)=>{
    const classes = useStyles()
    return(
        <Container className='pt-4'>
            <Row>
                <Col sm={{span:8,offset:2}}>
                    <div className="row my-2 justify-content-center">
                        <div className="col-sm-6 col-md-4">
                            <TextField id="outlined-basic" 
                            value={props.tipoDePoda}
                            className={classes.radio}
                            label="Tipo de poda" 
                            variant="outlined"
                                onChange={e=>{
                                    props.handleChange(e.target.value)
                                }}
                            />
                        </div>
                    </div>
                    <div className="row my-2 justify-content-center">
                        <div className="col">
                            <TextField label="Descripcion"  multiline onChange={e=>{
                                props.handleChangeDescripcion(e.target.value)
                            }}/>
                        </div>
                    </div>
                    
                </Col>
            </Row>
        </Container>
    )
}