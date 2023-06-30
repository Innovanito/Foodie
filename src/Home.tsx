import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaCompass, FaHome, FaPlus } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

function Home() {
  return ( 
  <>
    <UpperNavbar/>
    <LeftSidebar/>
  </>
  );
}

export default Home;

function UpperNavbar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" variant='success'>
      <Container fluid>
        <Navbar.Brand href="#" className='px-5'>Foodie</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          
          <Form className="d-flex"  style={{ width: '50%' }}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 "
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          
          <Nav
            className=" my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >  
          </Nav>
        </Navbar.Collapse>
        <Button variant="secondary" className="d-flex align-items-center">
          <FaPlus size={15} className="me-1" />
          <span style={{ fontSize: "12px" }}>업로드</span>
        </Button>
        <Button variant="success" className='mx-2'>Login</Button>{' '}
      </Container>
    </Navbar>
  )
}

const LeftSidebar = () => {
  return (
    <div className="vh-100">
      <Container fluid className="h-100">
        <div className="d-flex flex-column bg-white shadow-xl h-100 w-64 mt-4">
          <NavLink
            to={'/'}
            className="d-flex px-2 text-3xl my-3 align-items-center"
            style={({ isActive }) => {
              return {
                fontWeight: isActive ? "bold" : "",
                color: isActive ? "red" : "black",
              };
            }}
          >
            <FaHome />
            <h1 className="px-4">Your pick</h1>
          </NavLink>
          <NavLink
            to={'/explore'}
            className="d-flex px-2 text-3xl align-items-center"
            style={({ isActive }) => {
              return {
                fontWeight: isActive ? "bold" : "",
                color: isActive ? "red" : "black",
              };
            }}
          >
            <FaCompass />
            <h1 className="px-4">Find more</h1>
          </NavLink>
        </div>
      </Container>
    </div>
  );
};
