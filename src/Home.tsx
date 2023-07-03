import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import {  FaPlus } from 'react-icons/fa';
import { MdLocalDrink } from "react-icons/md";
import { GiHotMeal, GiCupcake } from "react-icons/gi";

import { NavLink } from 'react-router-dom';
import Feed from './Feed';
import { useState } from 'react';

function Home() {
  const [leftNavData, setLeftNavData] = useState<string>('meal')

  return ( 
  <>
    <UpperNavbar/>
      <div className='flex '>
        <LeftSidebar/>
        <Feed leftNavData={leftNavData} />
      </div>
  </>
  );
}

export default Home;

function UpperNavbar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" variant='success'>
      <Container fluid>
        <Navbar.Brand href="#" className='px-5 text-4xl font-semibold'>Foodie</Navbar.Brand>
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
        <Button variant="outline-secondary" className="d-flex align-items-center">
          <FaPlus size={15} className="me-1" />
          <span style={{ fontSize: "12px" }}>업로드</span>
        </Button>
        <Button variant="outline-success" className='mx-2'>Login</Button>{' '}
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
            <GiHotMeal/>
            <h1 className="px-4">Meal</h1>
          </NavLink>
          <NavLink
            to={'/dessert'}
            className="d-flex px-2 text-3xl align-items-center"
            style={({ isActive }) => {
              return {
                fontWeight: isActive ? "bold" : "",
                color: isActive ? "red" : "black",
              };
            }}
          >
            <GiCupcake />
            <h1 className="px-4">Dessert</h1>
          </NavLink>
          <NavLink
            to={'/beverage'}
            className="d-flex px-2 text-3xl align-items-center py-3"
            style={({ isActive }) => {
              return {
                fontWeight: isActive ? "bold" : "",
                color: isActive ? "red" : "black",
              };
            }}
          >
            < MdLocalDrink/>
            <h1 className="px-4">Drinks</h1>
          </NavLink>
        </div>
      </Container>
    </div>
  );
};
