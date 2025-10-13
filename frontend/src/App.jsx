import { Outlet } from "react-router-dom"
import Nav from './components/nav'


function App() {
   
  return (
    <>
    <Nav></Nav>
   <div className="mt-20">
    <Outlet></Outlet>
   </div>
    
    </>
  )
}

export default App
