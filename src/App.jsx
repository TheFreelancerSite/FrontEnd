import { useState } from 'react'

import './App.css'
import Signup from './pages/Signup/signup'
import Signin from './pages/Signin/Signin'
import Home from './pages/home/Home'



function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
    {/* <Signup/> */}
    {/* <Signin/> */}
    <Home/>
   </div>
  )
}

export default App
