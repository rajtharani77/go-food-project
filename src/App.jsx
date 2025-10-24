//import './App.css'
import Home from './screens/Home'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Login from './screens/Login.jsx';
import SIgnup from './screens/SIgnup.jsx';
import { CartProvider } from './components/ContectReduces.jsx';
import MyOrder from './components/MyOrder.jsx';
function App() {

  return (
    <CartProvider><Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/Login" element={<Login/>}/>
          <Route exact path="/createuser" element={<SIgnup/>}/>
          <Route exact path="/MyOrder" element={<MyOrder/>}/>
        </Routes>
      </div>
    </Router></CartProvider>
    
  )
}

export default App
