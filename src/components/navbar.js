import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function MyNavbar() {
  return (
    <>

      <Navbar bg="primary" variant="white" fixed="top">
        <Container>
  <Nav >
          <Link to="/home"><h1>Home List</h1></Link>     
           <Link to="/home"><h1>Profile List</h1></Link>
            <Link to="/list"><h1>Message List</h1></Link>
            <Link to="/"><h1>LogOut List</h1></Link>
        </Nav>

        </Container>
        
      </Navbar>

    </>
  );
}

export default MyNavbar;