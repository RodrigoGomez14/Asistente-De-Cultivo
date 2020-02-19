import React,{useState} from 'react'
import {Row,Col} from 'react-bootstrap'
import {Tabs,Tab,Paper,Typography,Box} from '@material-ui/core'
import {TableAditivos} from './TableAditivos'
import { makeStyles,Theme } from '@material-ui/core/styles';
import {Grow} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    paperMain: {
      backgroundColor: 'transparent',
    },
    paperDark: {
    backgroundColor: theme.palette.primary.light,
    borderRadius:'0'
    },
    tabs:{
        "&.MuiTabs-scroller":{
            '&.MuiTabs-indicator':{
                color: '#fff'
            }
        },
    },
    tab:{
        "&.MuiTab-textColorPrimary.Mui-selected":{
            color: '#fff',
        }
    },
  }));

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
    const classes = useStyles()
    return(
        <div className="container-fluid overflow-auto">
            <div className="row">
                <div className="col-12 px-0">
                    <Paper className={classes.paperDark}>
                        <Tabs
                            value={value}
                            indicatorColor="primary"
                            textColor="primary"
                            onChange={(e,value)=>{
                                setValue(value)
                            }}
                            className={classes.tabs}
                            aria-label="disabled tabs example"
                        >
                            <Tab label="Fertilizantes" className={classes.tab}/>
                            <Tab label="Insecticidas" className={classes.tab}/>
                        </Tabs>
                    </Paper>
                    <TabPanel value={value} index={0}>
                        <TableAditivos user={user} title='Fertilizantes' aditivos={fertilizantes}/>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <TableAditivos user={user} title='Insecticidas' aditivos={insecticidas}/>
                    </TabPanel>
                </div>
            </div>
        </div>
    )
}