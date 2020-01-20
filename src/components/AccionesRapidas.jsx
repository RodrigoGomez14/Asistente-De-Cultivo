import React from 'react'
import {Link} from 'react-router-dom'

const AccionesRapidas=()=>{
        return(
            <div className="row d-flex flex-column justify-content-center" role='group'>
                <div className="col-auto text-center">
                    <small>Acciones</small>
                </div>
                <div className="col-auto form-group">
                    <Link to='/Riego'>
                        <button type='button' className="btn btn-outline-light">Regar</button>
                    </Link>
                </div>
                <div className="col-auto form-group">
                    <Link to='/Poda'>
                        <button type='button' className="btn btn-outline-light">Podar</button>
                    </Link>
                </div>
                <div className="col-auto form-group">
                    <Link to='/Insecticida'>
                        <button type='button' className="btn btn-outline-light">Fumigar</button>
                    </Link>
                </div>
            </div>
        )
    }
export default AccionesRapidas