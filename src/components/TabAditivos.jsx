import React,{useState} from 'react'
import {Tabs,Tab,Row,Col} from 'react-bootstrap'
import {TableAditivos} from './TableAditivos'
export const TabAditivos = ({fertilizantes,insecticidas,user}) =>{
    const [key, setKey] = useState('Fertilizantes');
    return(
        <Row>
            <Col xs={{span:12,offset:0}} sm={{span:10,offset:1}} md={{span:8,offset:2}} lg={{span:6,offset:3}}>
                <Tabs id="controlled-tab-example" activeKey={key} onSelect={k => setKey(k)}>
                    <Tab eventKey="Fertilizantes" title="Fertilizantes">
                        <TableAditivos user={user} title='Fertilizantes' aditivos={fertilizantes}/>
                    </Tab>
                    <Tab eventKey="Insecticidas" title="Insecticidas">
                        <TableAditivos user={user} title='Insecticidas' aditivos={insecticidas}/>
                    </Tab>
                </Tabs>
            </Col>
        </Row>
    )
}