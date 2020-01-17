import React , {Component} from 'react'

class Accion extends Component{
    state={
        tipoDeRiego:'Tierra',
        cantidadDeAgua:undefined,
        plantas: undefined
    }
    seleccionarPlanta=(id)=>{
        this.setState({
            plantas:{
                ...this.state.plantas,
                [id]:!this.state.plantas[id],
            }
        })
    }
    componentDidMount(){
        let plantas={}
        Object.keys(this.props.plantas).map(key=>{
            plantas={
                ...plantas,
                [key]:false,
            }
        })
        this.setState({
            plantas:plantas,
        })
    }
    confirmarAccion=(accion)=>confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <div className='custom-ui'>
                    <AlertConfirmarAccion
                        onClose={onClose}
                        accion={accion}
                        accionfn={this.regar}
                    />
                </div>
            );
        }
    })
    regar=()=>{
        Object.keys(this.state.plantas).map(planta=>{
            if(this.state.plantas[planta]){
                this.guardarRiegoBD(planta,this.state.cantidadDeAgua,this.state.tipoDeRiego,this.state.fertilizantes)
            }
        })
    }
    guardarRiegoBD= async (idPlanta,agua,tipoDeRiego,fertilizantes)=>{
        let fertilizantesFinal = {}
        Object.keys(fertilizantes).map(fertilizante=>{
            fertilizantesFinal={
                ...fertilizantesFinal,
                [fertilizante]:fertilizantes[fertilizante]
            }
        })
        await firebase.database().ref().child('plantas').child(idPlanta).child('riegos').push({
            agua:agua,
            tipoDeRiego:tipoDeRiego,
            fecha:moment().format('LLL'),
            fertilizantes:fertilizantesFinal
        })
    }
    cambiarTipoDeRiego=(tipoDeRiego)=>{
        this.setState({
            tipoDeRiego:tipoDeRiego
        })
    }
    cambiarLitrosDeAgua=(litros)=>{
        this.setState({
            cantidadDeAgua:litros
        })
    }
    cambiarAditivo=(fertilizante,cantidad)=>{
        this.setState({
            fertilizantes:{...this.state.fertilizantes,[fertilizante]:cantidad}
        })
    }
    render(){
        return(
            <div className="container-fluid accion">
                <NavBarAccion
                    title={this.props.tipoDeAccion}
                />
                <ElegirPlantaAccion
                    seleccionarPlanta={this.seleccionarPlanta}
                    plantas={this.state.plantas}
                />
                <ElegirTipoDeRiego
                    tipoDeRiego={this.state.tipoDeRiego}    
                    cambiarTipoDeRiego={this.cambiarTipoDeRiego}
                />
                <FormularioAccion
                    cambiarLitrosDeAgua={this.cambiarLitrosDeAgua}
                    cantidadDeAgua={this.state.cantidadDeAgua}
                    cambiarAditivo={this.cambiarAditivo}
                    adivito='Fertlizante'
                    aditivos={this.props.fertilizantes}
                />
                <BotoneraConfirmacionAccion
                    confirmarAccion={this.confirmarAccion}
                    aditivos={this.props.fertilizantes}
                />
            </div>
        )
    }
}
const mapStateToProps = state=>{
    return{
        plantas:state.plantas,
        fertilizantes:state.fertilizantes,
        insecticidas:state.insecticidas
    }
}
export default connect(mapStateToProps,null)(Riego)