import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const championTags = ["Assassin", "Fighter", "Mage", "Marksman", "Support", "Tank"];
  const navigate = useNavigate();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand style={{marginLeft: "2rem"}} as={Link} to="/">League App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <NavDropdown title="Champions" id="champions-dropdown">
            {championTags.map((tag, index) => (
              <NavDropdown.Item key={index} as={Link} to={`/champions/tag/${tag}`}>
                {tag}
              </NavDropdown.Item>
            ))}
          </NavDropdown>
          <Nav.Link as={Link} to="/items">Objets</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
