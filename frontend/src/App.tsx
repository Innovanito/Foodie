import { BrowserRouter as Router,Route, Routes  } from "react-router-dom";
// import {v4 as uuidV4} from 'uuid'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import Home from "./Home";
import Login from "./Login";
import Upload from "./Upload";

function App() {

  return (
    <>
      <Router>           
        <Routes>
          <Route  path="/" element={<Home/>} />   
          <Route path="/login" element={<Login/>} />
          <Route path='/upload' element={<Upload/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
