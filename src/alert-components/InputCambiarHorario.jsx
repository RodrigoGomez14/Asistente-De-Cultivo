import React from 'react'

const InputCambiarHorario = ()=>{
    return(
        <div className="row justify-content-center mt-4">
            <div className="col-2">
                <div className="input-group form-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            Hora
                        </span>
                    </div>
                    <input autoFocus type="number" min='0' max='24' id="inputHoras" className='form-control'/>
                </div>
            </div>
            <div className="col-2 ">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            Minutos
                        </span>
                    </div>
                    <input type="number" min='0' max='60' id="inputMinutos" className='form-control'/>
                </div>
            </div>
        </div>
    )
}
export default InputCambiarHorario