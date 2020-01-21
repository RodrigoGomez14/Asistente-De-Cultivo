import React,{useState} from 'react'
import {Tabs,Tab,Row,Col} from 'react-bootstrap'
import {TableAditivos} from './TableAditivos'
export const TabAditivos = ({fertilizantes,insecticidas}) =>{
    const [key, setKey] = useState('Fertilizantes');
    return(
        <Row>
            <Col xs={{span:6,offset:3}}>
                <Tabs id="controlled-tab-example" activeKey={key} onSelect={k => setKey(k)}>
                    <Tab eventKey="Fertilizantes" title="Fertilizantes">
                        <TableAditivos title='Fertilizantes' aditivos={fertilizantes}/>
                    </Tab>
                    <Tab eventKey="Insecticidas" title="Insecticidas">
                        <TableAditivos title='Insecticidas' aditivos={insecticidas}/>
                    </Tab>
                </Tabs>
            </Col>
        </Row>
    )
}