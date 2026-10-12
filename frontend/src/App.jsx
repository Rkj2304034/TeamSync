
import './App.css'
import {Route, Routes} from "react-router-dom"
import Home from './Pages/Home'
import Register from './Pages/register'
import Login from './Pages/login'
import  Dashboard  from './Pages/DashboardComponents/Dashboard'
import ProjectWorkspace from './Pages/Workspace/ProjectWorkspace'

function App() {
 return(

  <Routes>

  <Route path="/" element={<Home/>} />
  <Route path="/register" element={<Register/>} />
  <Route path="/login" element={<Login/>} />
  <Route path='/dashboard' element={<Dashboard/>} />
  <Route path='/project/:projectId' element={ <ProjectWorkspace/> }  ></Route>

  </Routes>

 )
}

export default App
