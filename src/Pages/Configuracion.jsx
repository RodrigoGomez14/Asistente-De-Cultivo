import React from 'react'
import {Layout} from './Layout'
export const Configuracion =({history})=>{
    return(
        <Layout history={history} page='Configuracion'>
            <div className="container-fluid accion">
                <div className="row">
                    <div className="col">
                        Configuracion
                    </div>
                </div>
            </div>
        </Layout>
    )
}