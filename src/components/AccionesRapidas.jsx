import React from 'react'
import {Link} from 'react-router-dom'

const AccionesRapidas=()=>{
        return(
            <div className="row justify-content-center" role='group'>
                <div className="col-auto">
                    <Link to='/Riego'>
                        <button type='button' className="btn btn-outline-light">Riego</button>
                    </Link>
                </div>
                <div className="col-auto">
                    <Link to='/Poda'>
                        <button type='button' className="btn btn-outline-light">Poda</button>
                    </Link>
                </div>
                <div className="col-auto">
                    <Link to='/Insecticida'>
                        <button type='button' className="btn btn-outline-light">Insecticida</button>
                    </Link>
                </div>
            </div>
        )
    }
export default AccionesRapidas