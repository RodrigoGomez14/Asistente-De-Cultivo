import React,{useState} from 'react'
import {Tabs,Tab,Row,Col} from 'react-bootstrap'
export const TabAditivos = ({fertilizantes,insecticidas}) =>{
    const [key, setKey] = useState('Fertilizantes');
    return(
        <Row>
            <Col xs={{span:6,offset:3}}>
                <Tabs id="controlled-tab-example" activeKey={key} onSelect={k => setKey(k)}>
                    <Tab eventKey="Fertilizantes" title="Fertilizantes">
                        <ul>
                            {fertilizantes.map(fertilizante=>(
                                <li>{fertilizante}</li>
                            ))}
                        </ul>
                    </Tab>
                    <Tab eventKey="Insecticidas" title="Insecticidas">
                        <ul>
                            {insecticidas.map(insecticida=>(
                                <li>{insecticida}</li>
                            ))}
                        </ul>
                    </Tab>
                </Tabs>
            </Col>
        </Row>
    )
}