import React , {Component} from 'react'
import fotoPlanta from '../images/apple cookies.jpg'
import moment from 'moment'
import {Table,Row,Col,Container,Image} from 'react-bootstrap'
class DetallePlanta extends Component{
    render(){
        return(
            <Row className="mt-4 mb-4 align-items-center">
                <Col xs={{span:8,offset:2}} sm={{span:6,offset:3}} md={{span:4,offset:0}} className="text-center mb-2">
                    <Image src={fotoPlanta} className='w-100' alt="" roundedCircle/>
                </Col>
                <Col md={8} className="align-self-center">
                    <Container className="container">
                        <Table striped hover variant='dark' >
                            <tbody>
                                <tr>
                                    <td>
                                        <h6 className=''>Genetica</h6>
                                    </td>
                                    <td>
                                        <h6 className='text-right '>{this.props.genetica}</h6>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h6 className=''>Edad</h6>
                                    </td>
                                    <td>
                                        <h6 className='text-right '>{this.props.edad} Dias</h6>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h6 className=''>Fecha de Germinacion</h6>
                                    </td>
                                    <td>
                                        <h6 className='text-right '>{this.props.nacimiento} ({moment().diff(moment(this.props.nacimiento),'days')} Dias)</h6>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h6 className=''>Inicio de Vegetativo</h6>
                                    </td>
                                    <td>
                                        <h6 className='text-right '>{
                                            this.props.inicioVegetativo?
                                                `${this.props.inicioVegetativo} (${moment().diff(moment(this.props.inicioVegetativo),'days')} Dias)`
                                                :
                                                '--/--/----'
                                            }</h6>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h6 className=''>Inicio de Floracion</h6>
                                    </td>
                                    <td>
                                        <h6 className='text-right '>{
                                            this.props.inicioFloracion?
                                            `${this.props.inicioFloracion}  (${moment().diff(moment(this.props.inicioFloracion),'days')} Dias)`
                                            :
                                            '--/--/----'
                                        }</h6>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Container>
                </Col>
            </Row>
        )
    }
}
export default DetallePlanta