import React , {useState} from 'react'
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
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Link} from 'react-router-dom'
import {auth} from 'firebase'
import {AppBar,Toolbar,IconButton,Typography,Menu} from '@material-ui/core'
import {Menu as MenuIcon,ArrowBackRounded,AccountCircle,HomeOutlined} from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));
export const Layout=({page,children,history})=>{
    const classes = useStyles();
    let [menuOpened,setMenuOpened]=useState(false)
    let [selectedTabs,setSelectedTabs]=useState('recents')
        return(
            <div className="App d-flex flex-column justify-content-between">
                <div className="container-fluid px-0">
                    <Drawer anchor="right" open={menuOpened} onClose={e=>{setMenuOpened(false)}}>
                        <div className="container d-flex flex-column h-100 justify-content-between">
                            <div>
                                <List>
                                    <Link to='/' className='outline-none text-dark'>
                                        <ListItem button key={'Armario'} >
                                            <ListItemIcon><HomeOutlined/></ListItemIcon>
                                            <ListItemText primary={'Armario'} />
                                        </ListItem>
                                    </Link>
                                </List>
                                <Divider />
                                <List>
                                    <Link to='Riego' className='outline-none text-dark'>
                                        <ListItem button key={'Regar'} >
                                            <ListItemIcon><FontAwesomeIcon icon={faTint}/></ListItemIcon>
                                            <ListItemText primary={'Regar'} />
                                        </ListItem>
                                    </Link>
                                </List>
                                <Divider />
                                <List>
                                    <Link to='Poda' className='outline-none text-dark'>
                                        <ListItem button key={'Podar'}>
                                            <ListItemIcon><FontAwesomeIcon icon={faCut}/></ListItemIcon>
                                            <ListItemText primary={'Podar'} />
                                        </ListItem>
                                    </Link>
                                </List>
                                <Divider />
                                <List>
                                    <Link to='Insecticida' className='outline-none text-dark'>
                                        <ListItem button key={'Fumigar'}>
                                            <ListItemIcon><FontAwesomeIcon icon={faBug}/></ListItemIcon>
                                            <ListItemText primary={'Fumigar'} />
                                        </ListItem>
                                    </Link>
                                </List>
                                <Divider />
                            </div>
                            <div>
                                <Divider />
                                <List>
                                    <Link to='/Aplicables' className='outline-none text-dark'>
                                        <ListItem button key={'Aditivos'}>
                                            <ListItemIcon><FontAwesomeIcon icon={faBug}/></ListItemIcon>
                                            <ListItemText primary={'Aditivos'} />
                                        </ListItem>
                                    </Link>
                                </List>
                                <Divider />
                                <List>
                                    <Link to='/Aditivos' className='outline-none text-dark'>
                                        <ListItem button key={'Carencias y Excesos'}>
                                            <ListItemIcon><FontAwesomeIcon icon={faBug}/></ListItemIcon>
                                            <ListItemText primary={'Carencias y Excesos'} />
                                        </ListItem>
                                    </Link>
                                </List>
                                <Divider />
                                <List>
                                    <Link to='/Configuracion' className='outline-none text-dark'>
                                        <ListItem button key={'Configuracion'}>
                                            <ListItemIcon><FontAwesomeIcon icon={faCogs}/></ListItemIcon>
                                            <ListItemText primary={'Configuracion'} />
                                        </ListItem>
                                    </Link>
                                </List>
                                <Divider />
                                <List>
                                    <ListItem button key={'Cerrar Sesion'} className='text-danger' onClick={async e=>{
                                            await auth().signOut()
                                        }}>
                                        <ListItemIcon><FontAwesomeIcon icon={faTimes} className='text-danger'/></ListItemIcon>
                                        <ListItemText primary={'Cerrar Sesion'} />
                                    </ListItem>
                                </List>
                            </div>
                        </div>
                    </Drawer>
                    <div className="row">
                        <div className="col">
                        <AppBar position="static">
                            <Toolbar>
                            {page!=='Armario'?
                                <IconButton edge="end" className={classes.menuButton} onClick={e=>{
                                    history.goBack()
                                }} color="inherit" aria-label="menu">
                                    <ArrowBackRounded />
                                </IconButton>
                                :
                                <IconButton edge="end" className={classes.menuButton} onClick={e=>{
                                    
                                }} color="inherit" aria-label="menu">
                                    <AccountCircle />
                                </IconButton>
                            }
                            <Typography variant="h6" className={classes.title} >
                                {page}
                            </Typography>
                            <IconButton edge="end" className={classes.menuButton} onClick={e=>{
                                setMenuOpened(true)
                            }} color="inherit" aria-label="menu">
                                <MenuIcon />
                            </IconButton>
                            </Toolbar>
                        </AppBar>
                        </div>
                    </div>
                </div>
                {children}
            </div>
        )
    }
/*
                            <BottomNavigation value={this.state.selectedTab} onChange={(e,value)=>{
                                this.setState({selectedTab:value})
                                if(value==='recents'){
                                    this.props.history.push('/')
                                }
                                else if(value==='favorites'){
                                    this.props.history.push('/Riego')
                                }
                                else if(value==='nearby'){
                                    this.props.history.push('/Aplicables')
                                }
                            }}>
                                <BottomNavigationAction label="Recents" value="recents" icon={<RestoreIcon />} />
                                <BottomNavigationAction label="Favorites" value="favorites" icon={<FavoriteIcon />} />
                                <BottomNavigationAction label="Nearby" value="nearby" icon={<LocationOnIcon />} />
                                <BottomNavigationAction label="Folder" value="folder" icon={<FolderIcon />} />
                            </BottomNavigation>

*/