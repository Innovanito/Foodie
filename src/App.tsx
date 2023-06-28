import { BrowserRouter as Router,Route, Routes  } from "react-router-dom";
// import {v4 as uuidV4} from 'uuid'
import "react-bootstrap"
import Home from "./Home";
import Login from "./Login";

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
