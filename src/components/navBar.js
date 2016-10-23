import React, {Component} from 'react';
import {Navbar, NavItem, Nav} from 'react-bootstrap';
import { Link } from 'react-router';

export default class NavBar extends Component {
  render() {
    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Cleanify</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} ><Link to="/add">Add</Link></NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
