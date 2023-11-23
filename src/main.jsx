import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {configureStore} from "@reduxjs/toolkit"
import { Provider } from 'react-redux'
import  useReducer  from './components/feautures/user.js'
import signupReducer from './components/feautures/signup.js';

// import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css"
import { Elements } from '@stripe/react-stripe-js';

const STRIPE_KEY='pk_test_51OD5wrASPyD5fiiJWseGxeKC1CyWAVuQNhMlZ9jd7s4b718VDVQ6Sbeeosf8hGgQsAcXaZkatGx8iHmnkTrt7oqk00mKYeqGl5'

const store = configureStore({
  reducer:{
    user : useReducer,
    signup : signupReducer
  }
})
ReactDOM.createRoot(document.getElementById('root')).render(
  
  // <React.StrictMode>
     <Provider store={store}>
      {/* <Elements publishableKey={STRIPE_KEY} > */}
          <App />
      {/* </Elements> */}
     
     </Provider>
    
  // </React.StrictMode>,
)
