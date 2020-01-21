import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import './components/styles/home.css'
import {HashRouter,Route,Switch} from 'react-router-dom'
import Armario from './Pages/Armario'
import Layout from './Pages/Layout'
import Riego from './Pages/Riego'
import Insecticida from './Pages/Insecticida'
import Aplicables from './Pages/Aplicables'
import Poda from './Pages/Poda'
import {Provider} from 'react-redux'
import reducer from './reducers'
import {createStore} from 'redux'
import * as firebase from 'firebase'
import PantallaDeCarga from './Pages/PantallaDeCarga';

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
    loading:true
  }
  cambiarPeriodo(nuevoPeriodo){
    this.setState({
      periodo:nuevoPeriodo
    })
  }
  async componentDidMount(){
    const databaseRef = await firebase.database().ref()
    databaseRef.on('value', snapshot=>{
      data= snapshot.val()
      store=createStore(reducer, data)
      this.setState({loading:false})
    })
  }
  render(){
    if(this.state.loading){
      return(
        <PantallaDeCarga/>
      )
    }
    else{
      return (
        <Provider store={store}>
          <Layout>
            <HashRouter>
              <Switch>
                <Route exact path='/' component={Armario}/>
                <Route exact path='/Riego' component={Riego}/>
                <Route exact path='/Poda' component={Poda}/>
                <Route exact path='/Insecticida' component={Insecticida}/>
                <Route exact path='/Aplicables' component={Aplicables}/>
              </Switch>
            </HashRouter>
          </Layout>
        </Provider>
      );
    }
  }
}

export default App;
