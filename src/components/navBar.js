import React, {Component} from 'react';
import {Navbar, NavItem, Nav} from 'react-bootstrap';
import { Link } from 'react-router';
import styles from '../app.css';
import { LinkContainer } from 'react-router-bootstrap';

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
            <LinkContainer to="/add">
               <NavItem eventKey={1}>Add</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
