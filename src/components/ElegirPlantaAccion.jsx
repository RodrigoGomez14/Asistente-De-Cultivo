import React , {Component} from 'react'
import CheckboxPlanta from './CheckboxPlanta'
class ElegirPlantaAccion extends Component{
    render(){
        return(
            <div className="row mt-4 justify-content-center">
                <div className="col-12 text-center">
                    <p className='text-white'>Elegir las plantas</p>
                </div>
                {this.props.plantas?
                    Object.keys(this.props.plantas).map(key=>(
                        <CheckboxPlanta checked={this.props.plantas[key]} llave={key} handleClick={e=>{
                            this.props.seleccionarPlanta(key)
                        }}/>
                    ))
                :
                null
                }
            </div>
        )
    }
}
export default ElegirPlantaAccion