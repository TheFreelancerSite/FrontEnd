import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {configureStore} from "@reduxjs/toolkit"
import { Provider } from 'react-redux'
import  useReducer  from './components/feautures/user.js'
import signupReducer from './components/feautures/signup.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css"


const store = configureStore({
  reducer:{
    user : useReducer,
    signup : signupReducer
  }
})
ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
     <Provider store={store}>
     <App />
     </Provider>
    
  </React.StrictMode>,
)
