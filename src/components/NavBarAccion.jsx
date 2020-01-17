import React , {Component} from 'react'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons'
class NavBarAccion extends Component{
    render(){
        return(
            <div className="row mt-4">
                <div className="col-2 text-left offset-1">
                    <Link to="/">
                        <FontAwesomeIcon icon={faArrowLeft} className='icon backIcon'/>
                    </Link>
                </div>
                <div className="col-6 text-center">
                    <h1 className='text-white'>{this.props.title}</h1>
                </div>
            </div>
        )
    }
}
export default NavBarAccion
