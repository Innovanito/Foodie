import { BrowserRouter as Router,Route, Routes  } from "react-router-dom";
// import {v4 as uuidV4} from 'uuid'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./Home";
import Login from "./Login";
import './index.css'

function App() {

  return (
    <>
      <Router>           
        <Routes>
          <Route  path="/" element={<Home/>} />   
          <Route path="/login" element={<Login/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
