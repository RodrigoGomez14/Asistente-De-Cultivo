import React, {Component} from 'react'
import {Navbar as Nav,Hr} from './styles/NavbarStyle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes,faCogs } from '@fortawesome/free-solid-svg-icons'
import AccionesRapidas from '../components/AccionesRapidas'
import {connect} from 'react-redux'
class Navbar extends Component{
    render(){
        return(
            <Nav>
                <div className="container h-100">
                    <div className="row mt-4">
                        <div className="col text-left">
                            <FontAwesomeIcon icon={faCogs} className='alert-icon' onClick={e=>{
                                this.props.alertConfiguracion()
                            }}/>
                        </div>
                            <div className="col text-right">
                                <FontAwesomeIcon icon={faTimes} className='alert-icon' onClick={e=>{this.props.closeNavbar()}}/>
                            </div>
                        </div>
                        <Hr/>
                        {this.props.plantas?
                            <AccionesRapidas/>
                            :
                            null
                        }
                        <Hr/>
                        <div className="row d-flex flex-column justify-content-center">
                            <div className="col-auto">
                                <small>Aplicables</small>
                            </div>
                            <div className="col-auto form-group">
                                <button type='button' className='btn btn-outline-light'>Fertilizantes</button>
                            </div>
                            <div className="col-auto form-group">
                                <button type='button' className='btn btn-outline-light'>Insecticidas</button>
                            </div>
                        </div>
                </div>
            </Nav>
        )
    }
}
const mapStateToProps = state =>{
    return{
        plantas:state.plantas,
    }
}
export default connect(mapStateToProps,null)(Navbar)