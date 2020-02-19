import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import './components/styles/home.css'
import {HashRouter,Route,Switch} from 'react-router-dom'
import Armario from './Pages/Armario'
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
import {PantallaDeCarga} from './Pages/PantallaDeCarga';
import Configuracion from './Pages/Configuracion';
import Historial from './Pages/Historial';
import Planta from './Pages/Planta'
import PlantaHistorial from './Pages/PlantaHistorial'
import PlantaRiegos from './Pages/PlantaRiegos'
import PlantaFumigaciones from './Pages/PlantaFumigaciones'
import PlantaTransplantes from './Pages/PlantaTransplantes'
import PlantaPodas from './Pages/PlantaPodas'
import PlantaTimeLine from './Pages/PlantaTimeLine'
import PlantaHistorialTimeLine from './Pages/PlantaHistorialTimeLine'
import PlantaHistorialRiegos from './Pages/PlantaHistorialRiegos'
import PlantaHistorialFumigaciones from './Pages/PlantaHistorialFumigaciones'
import PlantaHistorialTransplantes from './Pages/PlantaHistorialTransplantes'
import PlantaHistorialPodas from './Pages/PlantaHistorialPodas'
import {NotFound} from './Pages/NotFound'
import Transplante from './Pages/Transplante'
import NuevaPlanta from './Pages/NuevaPlanta'
import NuevoAditivo from './Pages/NuevoAditivo'
import { createMuiTheme,ThemeProvider } from '@material-ui/core/styles';

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
class App extends Component {
  state={
    loading:true,
    theme:localStorage.getItem('theme')?localStorage.getItem('theme'):'light'
  }
  async componentDidMount(){
    firebase.auth().onAuthStateChanged(async user=>{
      if(user){
        const databaseRef = await firebase.database().ref().child(user.uid)
        databaseRef.on('value', snapshot=>{
          data= snapshot.val()
          store=createStore(reducer, {user:user,data:data})
          this.setState({store,user:user,loading:false})
        })
      }
      else{
        this.setState({user:null,loading:false})
      }
    })
    const theme = localStorage.getItem('theme')
    console.log(theme)
    if(!theme){
        localStorage.setItem('theme','light')
    }
  }
  
setTheme=theme=>{
  console.log(theme)
  this.setState({theme:theme})
}
  render(){
    const themeProvider = createMuiTheme({
      palette: {
          white:'#fff',
          primary: {
          light: '#48a999',
          main: '#00796b',
          dark: '#004c40',
          contrastText: '#fff',
          },
          secondary: {
          light: '#4f5b62',
          main: '#263238',
          dark: '#000a12',
          contrastText: '#000',
          },
          danger:'#c62828',
          type:this.state.theme
      },
  });
    if(this.state.loading){
      return(
        <div className="App justify-content-center">
          <ThemeProvider theme={themeProvider}>
              <PantallaDeCarga/>
          </ThemeProvider>
        </div>
      )
    }
    else{
      if(this.state.user){
        return (
          <ThemeProvider theme={themeProvider}>
              <Provider store={this.state.store}>
                <HashRouter>
                  <Switch>
                    <Route exact path='/' component={Armario}/>
                    <Route exact path='/Riego' component={Riego}/>
                    <Route exact path='/Poda' component={Poda}/>
                    <Route exact path='/Transplante' component={Transplante}/>
                    <Route exact path='/Insecticida' component={Insecticida}/>
                    <Route exact path='/Aplicables' component={Aplicables}/>
                    <Route exact path='/Configuracion' render={(props) => <Configuracion {...props} setTheme={this.setTheme} />}/>
                    <Route exact path='/Historial' component={Historial}/>
                    <Route exact path='/Planta' component={Planta}/>
                    <Route exact path='/Historial/Planta' component={PlantaHistorial}/>
                    <Route exact path='/Nueva-Planta' component={NuevaPlanta}/>
                    <Route exact path='/Nuevo-Aditivo' component={NuevoAditivo}/>
                    <Route exact path='/Planta/Riegos' component={PlantaRiegos}/>
                    <Route exact path='/Planta/Timeline' component={PlantaTimeLine}/>
                    <Route exact path='/Planta/Podas' component={PlantaPodas}/>
                    <Route exact path='/Planta/Transplantes' component={PlantaTransplantes}/>
                    <Route exact path='/Planta/Fumigaciones' component={PlantaFumigaciones}/>
                    <Route exact path='/Historial/Planta/Riegos' component={PlantaHistorialRiegos}/>
                    <Route exact path='/Historial/Planta/Timeline' component={PlantaHistorialTimeLine}/>
                    <Route exact path='/Historial/Planta/Podas' component={PlantaHistorialPodas}/>
                    <Route exact path='/Historial/Planta/Transplantes' component={PlantaHistorialTransplantes}/>
                    <Route exact path='/Historial/Planta/Fumigaciones' component={PlantaHistorialFumigaciones}/>
                    <Route exact path='/Deficiencias-Carencias' component={Aplicables}/>
                  </Switch>
                </HashRouter>
              </Provider>
            </ThemeProvider>
        )
      }
      else{
        return (
          <ThemeProvider theme={themeProvider}>
            <HashRouter>
              <Switch>
                <Route exact path='/' component={SignInPage}/>
                <Route exact path='/Login' component={LogInPage}/>
                <Route  component={NotFound}/>
              </Switch>
            </HashRouter>
          </ThemeProvider>
        )
      }
    }
  }
}

export default App;
