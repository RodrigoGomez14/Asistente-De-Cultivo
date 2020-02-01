import React , {Component} from 'react'
import {Row,Col} from 'react-bootstrap'
import {TextField} from '@material-ui/core'
class ElegirTipoDePoda extends Component{
    render(){
        return(
            <Row>
                <Col sm={{span:8,offset:2}}>
                    <div className="row my-2 justify-content-center">
                        <div className="col-4">
                            <TextField id="outlined-basic" 
                            value={this.props.tipoDePoda} 
                            label="Tipo de poda" 
                            variant="outlined"
                                onChange={e=>{
                                    this.props.handleChange(e.target.value)
                                }}
                            />
                        </div>
                    </div>
                </Col>
            </Row>
        )
    }
}

export default ElegirTipoDePoda