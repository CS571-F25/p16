import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router";
import "./NavigationBar.css";
import left from "./imgs/SVLogo-L.png";
import right from "./imgs/SVLogo-R.png";

function NavigationBar() {
  // MUST React Bootstrapify
  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="sm" fixed="top">
      {/* <Navbar.Brand href="#home" id="brand">Sneaker Vault</Navbar.Brand> */}
      <img src = {left} alt = "Sneaker Vault Logo" width = "100" height = "80" id = "svl-logo"/>
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav id="links">
            <Nav.Link as={Link} to="/trending">Trending Products</Nav.Link>
            <Nav.Link as={Link} to="/sneakers">All Sneakers</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as = {Link} to = "/contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <img src = {right} alt = "Sneaker Vault Logo" width = "100" height = "80" id = "svr-logo"/>
    </Navbar>
  )
}

export default NavigationBar;
