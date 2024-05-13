import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {CgProfile} from 'react-icons/cg';
import './appBar.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const AppBar = ({user, setUser}) => {
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('user') && !user){
      setUser(JSON.parse(localStorage.getItem('user')));
    }
  }, [user, setUser]);
    return (
        <Navbar style={{justifyContent: "end"}} expand="lg" bg="success">
          <Container>
            <Navbar.Brand className='text-primary-emphasis' href="/">Live Football</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link className='text-white' href="/matches">Live Matches</Nav.Link>
                {user ? <NavDropdown className='right-aligned' title={<CgProfile className='text-white' size="26"/>} id="basic-nav-dropdown">
                  <NavDropdown.Item href="profile">Your Profile</NavDropdown.Item>
                  <NavDropdown.Item onClick={
                    (e) => {localStorage.removeItem('user'); setUser(null); navigate("/")}
                    }>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown> : <NavDropdown className='right-aligned' title={<CgProfile className='text-white' size="26"/>} id="basic-nav-dropdown">
                  <NavDropdown.Item href="loginu">Login</NavDropdown.Item>
                  <NavDropdown.Item href="register">
                    Register
                  </NavDropdown.Item>
                </NavDropdown>}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
}

export default AppBar