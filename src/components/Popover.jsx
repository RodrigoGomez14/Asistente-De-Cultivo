import React,{Fragment} from 'react'
import {Popover,OverlayTrigger,Table} from 'react-bootstrap'
import {Td,Th} from './styles/PopoverStyle'
export const PopOver = ({aditivo,cantidadDeAgua= 0}) =>{
    return(
        <OverlayTrigger trigger="hover" placement='top' overlay={
            <Popover  id="popover-basic">
                <Popover.Title as="h1" className='bg-dark text-light'>{aditivo.nombre}</Popover.Title>
                <Popover.Content>
                    <div className="container-fluid">
                        <div className="container-fluid mb-2">
                            <div className="row">
                                <div className="col text-left">
                                    {aditivo.descripcion}
                                </div>
                            </div>
                        </div>
                    </div>
                </Popover.Content>
            </Popover>}>
            <div className='text-dark'>
                {aditivo.nombre}
            </div>
        </OverlayTrigger>
    )
}