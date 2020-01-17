import React, {Component} from 'react'
class TempreaturaYHumedad extends Component{
    render(){
        return(
            <div className="container">
                <div className="row align-items-center">
                    <div className="col text-center">
                        <h4>
                            <span className='badge badge-pill badge-info'>
                                - C
                            </span>
                        </h4>
                    </div>
                    <div className="col">
                        <h4>
                            <span className='badge badge-pill badge-info'>
                                h - %
                            </span>
                        </h4>
                    </div>
                </div>
            </div>
        )
    }
}
export default TempreaturaYHumedad