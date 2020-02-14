import React , {useState}from 'react'
import {makeStyles, Hidden} from '@material-ui/core'
import {AppBar,Toolbar,IconButton,Typography,Card,CardMedia,Paper,Switch,FormControlLabel,Avatar,Menu,MenuItem} from '@material-ui/core'
import {Menu as MenuIcon,ArrowBackRounded,AccountCircle,HomeOutlined,NatureOutlined} from '@material-ui/icons'
import {auth} from 'firebase'
import {connect} from 'react-redux'
const useStyles = makeStyles( theme=>({
    appBar:{
        backgroundColor:theme.palette.primary.main,
        color:theme.palette.primary.contrastText
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    avatar:{
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.dark,
    },
    danger:{
        color:theme.palette.error.main
    }
}))

const NavBar = ({page,planta,history,setRedirect,setMenuOpened,user}) =>{
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };
    return(
        <AppBar className={classes.appBar} position="static" >
            <Toolbar>
            {page!=='Armario'?
                <IconButton edge="end" className={classes.menuButton} onClick={e=>{
                    if(!planta){
                        if(history.location.pathname==='/Planta'){
                            history.replace('/')
                        }
                        else{
                            history.goBack()
                        }
                    }
                    else{
                        setRedirect(true)
                    }
                }} color="inherit" aria-label="menu">
                    <ArrowBackRounded />
                </IconButton>
                :
                <div>
                    <IconButton edge="end" className={classes.menuButton} onClick={e=>{handleMenu(e)}} color="inherit" aria-label="menu">
                        <Avatar className={classes.avatar}>
                            {user.displayName.slice(0,1)}
                        </Avatar>
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={e=>{auth().signOut()}} className={classes.danger}>Cerrar Sesion</MenuItem>
                    </Menu>
                </div>
            }
            <Typography variant="h6" className={classes.title} >
                {page}
            </Typography>
            <IconButton edge="end" className={classes.menuButton} onClick={e=>{
                setMenuOpened(true)
            }} color="inherit" aria-label="menu" size='large'>
                <MenuIcon />
            </IconButton>
            </Toolbar>
        </AppBar>
    )
}
const mapStateToProps=state=>({
    user:state.user
})
export default connect(mapStateToProps,null)(NavBar)