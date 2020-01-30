import React,{Fragment} from 'react'
import {Popover,OverlayTrigger,Table} from 'react-bootstrap'
import {Td,Th} from './styles/PopoverStyle'
export const PopOver = ({aditivo,cantidadDeAgua= 0}) =>{
    return(
        <OverlayTrigger trigger="hover" placement='right' overlay={
            <Popover  id="popover-basic">
                <Popover.Title as="h1" className='bg-dark text-light'>{aditivo.nombre}</Popover.Title>
                <Popover.Content>
                    <div className="container-fluid">
                        {aditivo?
                            <>
                                <div className="container-fluid mb-2">
                                    <div className="row">
                                        <div className="col text-left">
                                            <small>
                                                {aditivo.descripcion}
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                <hr/>
                                {Object.keys(aditivo.dosis).map((tipoDeDosis,j)=>(
                                    <Fragment key={'tipoDeDosis'+j}>
                                        <div className="row mb-2">
                                            <div className="col">
                                                <span className='badge badge-pill badge-dark p-2'>{tipoDeDosis}</span>
                                            </div>
                                        </div>
                                        <Table responsive striped variant='dark'>
                                            <thead>
                                                <Th>#</Th>
                                                <Th>Dosis</Th>
                                            </thead>
                                            {Object.keys(aditivo.dosis[tipoDeDosis]).map((dosis,k)=>(
                                                    <tbody>
                                                        <tr key={'dosis'+k}>
                                                            <Td className='text-left'>
                                                                {dosis}
                                                            </Td>
                                                            <Td className='text-right'>
                                                                {(parseFloat(aditivo.dosis[tipoDeDosis][dosis].slice(0,aditivo.dosis[tipoDeDosis][dosis].indexOf(' ')))*cantidadDeAgua).toFixed(2)} ml
                                                            </Td>
                                                        </tr>
                                                    </tbody>
                                            ))}
                                        </Table>
                                    </Fragment>
                                ))}
                            </>
                            :
                            null
                        }
                    </div>
                </Popover.Content>
            </Popover>}>
            <div className='text-dark'>
                {aditivo.nombre}
            </div>
        </OverlayTrigger>
    )
}