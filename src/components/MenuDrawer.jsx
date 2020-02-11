import React from 'react'
import foto from '../images/cannabis.jpg'
import {auth} from 'firebase'
import {Card,CardMedia,} from '@material-ui/core'
import {HomeOutlined,NatureOutlined} from '@material-ui/icons'
import {BottomNavigation,BottomNavigationAction} from '@material-ui/core'
import FolderIcon from '@material-ui/icons/Folder';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTint, faCut , faBug , faCogs, faAlignRight, faTimes} from '@fortawesome/free-solid-svg-icons'
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import {makeStyles} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Link} from 'react-router-dom'

const useStyles = makeStyles(theme=>({
    drawer:{
        maxWidth:'300px',
        height:'100%',
    },
    icon:{
        color:theme.palette.type==='dark'?
            theme.palette.primary.contrastText:
            theme.palette.secondary.contrastText
    },
    text:{
        color:theme.palette.type==='dark'?
            theme.palette.primary.contrastText:
            theme.palette.secondary.contrastText
    },
}))
export const MenuDrawer = ({menuOpened,setMenuOpened,})=>{
    const classes = useStyles()
    return(
        <Drawer anchor="right" open={menuOpened}  onClose={e=>{setMenuOpened(false)}}>
            <div className={classes.drawer}>
                <Card>
                    <CardMedia
                        component="img"
                        alt="Sea Of Green"
                        image={foto}
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
                        }}>
                        <ListItemIcon><FontAwesomeIcon icon={faTimes} className='text-danger'/></ListItemIcon>
                        <ListItemText primary={'Cerrar Sesion'} />
                    </ListItem>
                </List>
            </div>
        </Drawer>
    )
}