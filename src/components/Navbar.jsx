import React, {Component} from 'react'
import {Navbar as Nav,Hr} from './styles/NavbarStyle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes,faCogs } from '@fortawesome/free-solid-svg-icons'
import AccionesRapidas from '../components/AccionesRapidas'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import {auth} from 'firebase'
import {Redirect} from 'react-router-dom'
class Navbar extends Component{
    signOut=async ()=>{
        await auth().signOut()
        return <Redirect to='/'/>
    }
    render(){
        return(
            <Nav>
                <div className="container h-100 d-flex flex-column justify-content-around">
                    <div className="row">
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
                    <div className="row justify-content-center">
                        <div className="col-auto">
                            <Link to='/Aplicables'>
                                <button type='button' className='btn btn-light'>Aditivos</button>
                            </Link>
                        </div>
                        <div className="col-auto">
                            <Link to='/Deficiencias-Carencias'>
                                <button type='button' className='btn btn-light'>Deficiencias y Carencias</button>
                            </Link>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-auto ml-auto mr-auto">
                            <Button variant="danger" onClick={e=>{this.signOut()}}>
                                Cerrar Sesion
                            </Button>
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