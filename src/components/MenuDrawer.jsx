import React from 'react'
import {auth} from 'firebase'
import {Card,CardMedia,IconButton} from '@material-ui/core'
import {HomeOutlined,NatureOutlined,ArrowBackOutlined} from '@material-ui/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTint, faCut , faBug , faCogs,faTimes } from '@fortawesome/free-solid-svg-icons'
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import {makeStyles} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Link} from 'react-router-dom'

const useStyles = makeStyles(theme=>({
    paper:{
        maxWidth:'280px',
        backgroundColor:theme.palette.type==='dark'?theme.palette.secondary.main:theme.palette.primary.main,
        overflow:'auto',
        height:'100%'
    },
    icon:{
        color:
            theme.palette.primary.contrastText
    },
    text:{
        color:theme.palette.primary.contrastText
    },
}))
export const MenuDrawer = ({menuOpened,setMenuOpened,image,history})=>{
    const classes = useStyles()
    return(
        <Drawer anchor="right" open={menuOpened}  onClose={e=>{setMenuOpened(false)}}>
            <Paper className={classes.paper} elevation={6}>
                <Card>
                    <CardMedia
                        component="img"
                        alt="Sea Of Green"
                        image={image}
                        title="Sea Of Green"
                    />
                </Card>
                <List>
                    <Link to='/' className='outline-none text-dark'>
                        <ListItem button key={'Armario'} >
                            <ListItemIcon className={classes.icon}><HomeOutlined/></ListItemIcon>
                            <ListItemText  className={classes.text} primary={'Armario'} />
                        </ListItem>
                    </Link>
                    <Link to='/Riego' className='outline-none text-dark'>
                        <ListItem button key={'Regar'} >
                            <ListItemIcon className={classes.icon}><FontAwesomeIcon icon={faTint}/></ListItemIcon>
                            <ListItemText  className={classes.text} primary={'Regar'} />
                        </ListItem>
                    </Link>
                    <Link to='/Poda' className='outline-none text-dark'>
                        <ListItem button key={'Podar'}>
                            <ListItemIcon className={classes.icon}><FontAwesomeIcon icon={faCut}/></ListItemIcon>
                            <ListItemText  className={classes.text} primary={'Podar'} />
                        </ListItem>
                    </Link>
                    <Link to='/Insecticida' className='outline-none text-dark'>
                        <ListItem button key={'Fumigar'}>
                            <ListItemIcon className={classes.icon}><FontAwesomeIcon icon={faBug}/></ListItemIcon>
                            <ListItemText  className={classes.text} primary={'Fumigar'} />
                        </ListItem>
                    </Link>
                    <Link to='/Transplante' className='outline-none text-dark'>
                        <ListItem button key={'Transplantar'}>
                            <ListItemIcon className={classes.icon}><FontAwesomeIcon icon={faBug}/></ListItemIcon>
                            <ListItemText  className={classes.text} primary={'Transplantar'} />
                        </ListItem>
                    </Link>
                    <Link to='/Aplicables' className='outline-none text-dark'>
                        <ListItem button key={'Aditivos'}>
                            <ListItemIcon className={classes.icon}><FontAwesomeIcon icon={faBug}/></ListItemIcon>
                            <ListItemText  className={classes.text} primary={'Aditivos'} />
                        </ListItem>
                    </Link>
                    <Link to='/Historial' className='outline-none text-dark'>
                        <ListItem button key={'Historial'}>
                            <ListItemIcon className={classes.icon}><NatureOutlined/></ListItemIcon>
                            <ListItemText  className={classes.text} primary={'Historial De Cosechas'} />
                        </ListItem>
                    </Link>
                    <Link to='/Aditivos' className='outline-none text-dark'>
                        <ListItem button key={'Carencias y Excesos'}>
                            <ListItemIcon className={classes.icon}><FontAwesomeIcon icon={faBug}/></ListItemIcon>
                            <ListItemText  className={classes.text} primary={'Carencias y Excesos'} />
                        </ListItem>
                    </Link>
                    <Link to='/Configuracion' className='outline-none text-dark'>
                        <ListItem button key={'Configuracion'}>
                            <ListItemIcon className={classes.icon}><FontAwesomeIcon icon={faCogs}/></ListItemIcon>
                            <ListItemText  className={classes.text} primary={'Configuracion'} />
                        </ListItem>
                    </Link>
                    <ListItem button key={'Cerrar Sesion'} className='text-danger' onClick={async e=>{
                            await auth().signOut()
                            history.replace('/')
                        }}>
                        <ListItemIcon><FontAwesomeIcon icon={faTimes} className='text-danger'/></ListItemIcon>
                        <ListItemText primary={'Cerrar Sesion'} />
                    </ListItem>
                </List>
            </Paper>
        </Drawer>
    )
}