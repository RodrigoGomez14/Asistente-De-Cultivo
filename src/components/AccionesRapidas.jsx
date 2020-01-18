import React from 'react'
import {Link} from 'react-router-dom'

const AccionesRapidas=()=>{
        return(
            <div className="row d-flex flex-column h-100 justify-content-center" role='group'>
                <div className="col-auto form-group">
                    <Link to='/Riego'>
                        <button type='button' className="btn btn-outline-light">Riego</button>
                    </Link>
                </div>
                <div className="col-auto form-group">
                    <Link to='/Poda'>
                        <button type='button' className="btn btn-outline-light">Poda</button>
                    </Link>
                </div>
                <div className="col-auto form-group">
                    <Link to='/Insecticida'>
                        <button type='button' className="btn btn-outline-light">Insecticida</button>
                    </Link>
                </div>
            </div>
        )
    }
export default AccionesRapidas