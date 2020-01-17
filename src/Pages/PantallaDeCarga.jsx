import React , {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCannabis} from '@fortawesome/free-solid-svg-icons'
import './styles/loading.css'
class PantallaDeCarga extends Component{
    render(){
        return(
            <div className="App justify-content-center">
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 text-center'>
                            <h1>Cargando</h1>
                        </div>
                    </div>
                    <div className="row justify-content-center mt-4">
                        <div className="col-auto">
                            <h2>
                                <FontAwesomeIcon icon={faCannabis} className='loading-icon' id='loading-icon1'/>
                            </h2>
                        </div>
                        <div className="col-auto">
                            <h2>
                                <FontAwesomeIcon icon={faCannabis} className='loading-icon' id='loading-icon2'/>
                            </h2>
                        </div>
                        <div className="col-auto">
                            <h2>
                                <FontAwesomeIcon icon={faCannabis} className='loading-icon' id='loading-icon3'/>
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default PantallaDeCarga