import { Container, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar bg="white" variant="white" expand="lg">
        <Container>
          <Navbar.Brand onClick={() => navigate("/")}>Champions</Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
