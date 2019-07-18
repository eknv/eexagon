import React, { Component } from 'react';

import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { LinkContainer } from 'react-router-bootstrap';

interface IProps {}

interface IState {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  isOpen: boolean;
}

class Header extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: false,
      isOpen: false,
    };
  }

  toggle = () => {
    console.log('toggled...');
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    return (
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Eexagon</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <LinkContainer to="/entries">
                <NavItem>
                  <NavLink href="/entries/">Entries</NavLink>
                </NavItem>
              </LinkContainer>
              <LinkContainer to="/lists">
                <NavItem>
                  <NavLink href="/lists/">Lists</NavLink>
                </NavItem>
              </LinkContainer>
              <LinkContainer to="/reports">
                <NavItem>
                  <NavLink href="/reports/">Reports</NavLink>
                </NavItem>
              </LinkContainer>
            </Nav>
          </Collapse>
        </Navbar>
    );
  }
}

export default Header;
