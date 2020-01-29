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
                                            {aditivo.descripcion}
                                        </div>
                                    </div>
                                </div>
                                <Table responsive striped variant='dark'>
                                    <thead>
                                        <Th>#</Th>
                                        <Th>Dosis</Th>
                                    </thead>
                                    <tbody>
                                        {Object.keys(aditivo.dosis).map((tipoDeDosis,j)=>(
                                            <Fragment key={'tipoDeDosis'+j}>
                                                <tr>
                                                    <Td colSpan='2' className='py-1'>
                                                        <div className="container">
                                                            <div className="row">
                                                                <div className="col text-center">
                                                                    <span className='badge badge-pill badge-light p-2 ml-auto mr-auto'>{tipoDeDosis}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Td>
                                                </tr>
                                                {Object.keys(aditivo.dosis[tipoDeDosis]).map((dosis,k)=>(
                                                    <tr key={'dosis'+k}>
                                                        <Td className='text-left'>
                                                            {dosis}
                                                        </Td>
                                                        <Td className='text-right'>
                                                            {parseInt(aditivo.dosis[tipoDeDosis][dosis].slice(0,aditivo.dosis[tipoDeDosis][dosis].indexOf(' ')))*cantidadDeAgua} ml
                                                        </Td>
                                                    </tr>
                                                ))}
                                            </Fragment>
                                        ))}
                                    </tbody>
                                </Table>
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