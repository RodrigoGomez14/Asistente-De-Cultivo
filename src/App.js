import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import './components/styles/home.css'
import {HashRouter,Route,Switch,Redirect} from 'react-router-dom'
import Armario from './Pages/Armario'
import Layout from './Pages/Layout'
import Riego from './Pages/Riego'
import Insecticida from './Pages/Insecticida'
import Aplicables from './Pages/Aplicables'
import {SignInPage} from './Pages/SignIn'
import {LogInPage} from './Pages/Login'
import Poda from './Pages/Poda'
import {Provider} from 'react-redux'
import reducer from './reducers'
import {createStore} from 'redux'
import * as firebase from 'firebase'
import PantallaDeCarga from './Pages/PantallaDeCarga';
import { Configuracion } from './Pages/Configuracion';
import Historial from './Pages/Historial';
import {Planta} from './Pages/Planta'
import {PlantaRiegos} from './Pages/PlantaRiegos'
import {PlantaPodas} from './Pages/PlantaPodas'
import {PlantaFumigaciones} from './Pages/PlantaFumigaciones'
import { createMuiTheme, ThemeProvider, hexToRgb } from '@material-ui/core/styles';

let store 
let data
const config = {
  apiKey: "AIzaSyCeZGOm5SWYvdx-0etcSR4Z82MipUFPakc",
  authDomain: "asistente-de-cultivo.firebaseapp.com",
  databaseURL: "https://asistente-de-cultivo.firebaseio.com",
  projectId: "asistente-de-cultivo",
  storageBucket: "asistente-de-cultivo.appspot.com",
  messagingSenderId: "89543318439",
  appId: "1:89543318439:web:ad0692faa495a539"
}
firebase.initializeApp(config)
const theme = createMuiTheme({
  palette: {
    white:'#fff',
    primary: {
      light: '#48a999',
      main: '#00796b',
      dark: '#004c40',
      contrastText: '#fff',
    },
    secondary: {
      light: '#519657',
      main: '#81c784',
      dark: '#b2fab4',
      contrastText: '#000',
    },
    danger:'#c62828'
  },
});
class App extends Component {
  state={
    loading:true
  }
  cambiarPeriodo(nuevoPeriodo){
    this.setState({
      periodo:nuevoPeriodo
    })
  }
  async componentDidMount(){
    firebase.auth().onAuthStateChanged(async user=>{
      if(user){
        const databaseRef = await firebase.database().ref().child(user.uid)
        databaseRef.on('value', snapshot=>{
          data= snapshot.val()
          store=createStore(reducer, {user:user.uid,data:data})
          this.setState({store,user:user,loading:false})
        })
      }
      else{
        this.setState({user:null,loading:false})
      }
    })
  }
  render(){
    if(this.state.loading){
      return(
        <div className="App justify-content-center">
          <PantallaDeCarga/>
        </div>
      )
    }
    else{
      if(this.state.user){
        return (
          <ThemeProvider theme={theme}>
            <Provider store={this.state.store}>
              <HashRouter>
                <Switch>
                  <Route exact path='/' component={Armario}/>
                  <Route exact path='/Riego' component={Riego}/>
                  <Route exact path='/Poda' component={Poda}/>
                  <Route exact path='/Insecticida' component={Insecticida}/>
                  <Route exact path='/Aplicables' component={Aplicables}/>
                  <Route exact path='/Configuracion' component={Configuracion}/>
                  <Route exact path='/Historial' component={Historial}/>
                  <Route exact path='/Planta' component={Planta}/>
                  <Route exact path='/Historial/Planta' component={Planta}/>
                  <Route exact path='/Planta/Riegos' component={PlantaRiegos}/>
                  <Route exact path='/Planta/Podas' component={PlantaPodas}/>
                  <Route exact path='/Planta/Fumigaciones' component={PlantaFumigaciones}/>
                  <Route exact path='/Historial/Planta/Riegos' component={PlantaRiegos}/>
                  <Route exact path='/Historial/Planta/Podas' component={PlantaPodas}/>
                  <Route exact path='/Historial/Planta/Fumigaciones' component={PlantaFumigaciones}/>
                  <Route exact path='/Deficiencias-Carencias' component={Aplicables}/>
                </Switch>
              </HashRouter>
            </Provider>
          </ThemeProvider>
        )
      }
      else{
        return (
          <ThemeProvider theme={theme}>
            <HashRouter>
              <Switch>
                <Route exact path='/' component={SignInPage}/>
                <Route exact path='/Login' component={LogInPage}/>
              </Switch>
            </HashRouter>
          </ThemeProvider>
        )
      }
    }
  }
}

export default App;
