import { Card, Col, Row, Tab } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaPlus } from 'react-icons/fa';
import { Link, Route, Router } from 'react-router-dom';

function Home() {
  return ( 
  <>
    <UpperNavbar/>
    <RightSidebar/>
  </>
  );
}

export default Home;

function UpperNavbar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
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

const RightSidebar = () => {
  return (
      <Container fluid>
        <Row>
          <Col sm={4}>
            <div className="sidebar ">
              <ul>
                <li>
                  <Link to="/" className='text-3xl font-bold underline text-green-600'>메뉴1</Link>
                </li>
                <li>
                  <Link to="/menu2">메뉴2</Link>
                </li>
                <li>
                  <Link to="/menu3">메뉴3</Link>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
  );
};
