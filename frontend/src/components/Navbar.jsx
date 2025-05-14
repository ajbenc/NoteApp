import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function NavbarComponent() {
  const { user, logout } = useAuth()

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Notes App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            {user ? (
              <Button onClick={logout} variant="outline-light">
                Logout
              </Button>
            ) : (
              <Button as={Link} to="/login" variant="outline-light">
                Login
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}