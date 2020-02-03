import React,{useState} from 'react'
import {Row,Col} from 'react-bootstrap'
import {Tabs,Tab,Paper,Typography,Box} from '@material-ui/core'
import {TableAditivos} from './TableAditivos'
function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </Typography>
    );
  }
export const TabAditivos = ({fertilizantes,insecticidas,user}) =>{
    const [value, setValue] = useState(0);
    return(
        <Col xs={{span:12,offset:0}}>
            <Paper square elevation={2}>
                <Paper>
                    <Tabs
                        value={value}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={(e,value)=>{
                            setValue(value)
                        }}
                        aria-label="disabled tabs example"
                    >
                        <Tab label="Fertilizantes" />
                        <Tab label="Insecticidas" />
                    </Tabs>
                </Paper>
                <TabPanel value={value} index={0}>
                    <TableAditivos user={user} title='Fertilizantes' aditivos={fertilizantes}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <TableAditivos user={user} title='Insecticidas' aditivos={insecticidas}/>
                </TabPanel>
            </Paper>
        </Col>
    )
}