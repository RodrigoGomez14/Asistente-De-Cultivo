import React , {Component} from 'react'

class BreadcrumbPlanta extends Component{
    render(){
        return(
            <div className='breadcrumb bg-light text-dark'>
                <div className={this.props.item? 'breadcrumb-item':'breadcrumb-item active'} onClick={e=>{
                    this.props.return()
                }}>
                    {this.props.nombre}
                </div>
                {this.props.item?
                    <div className="breadcrumb-item active">
                        {this.props.item}
                    </div>
                    :
                    null
                }
            </div>
        )
    }
}
export default BreadcrumbPlanta