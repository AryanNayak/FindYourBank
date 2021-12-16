import React from "react";
import { Button, Nav, Navbar, Container } from "react-bootstrap";
import Label from "@material-ui/core";
import "./nav.css";
import "./loader.css";
import logo from "./logo.png";
function NavBar() {
  return (
    <Navbar style={{ background: "#D8F2FF" }}>
      <Container>
        <centre>
          <Navbar.Brand href="#home">
            <img src={logo}></img>
          </Navbar.Brand>
        </centre>
      </Container>
    </Navbar>
  );
}

export default NavBar;
