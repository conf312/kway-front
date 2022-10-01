import { Container, Nav, Navbar } from 'react-bootstrap';
import { kwayLogo } from '../../images';

function getMainPage() {
  window.location.href = "/";
}

function Header() {
  return (
    <header>
      <div>
        <Navbar bg="light" expand="lg">
          <Container fluid>
            <Navbar.Brand className="fw-bold" href="#" onClick={getMainPage}>
              <img src={kwayLogo} alt="logo" height={30} width={130}></img>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <Nav.Link href="/notice-list" className="ft-gm">공지사항</Nav.Link>
                <Nav.Link href="/faq" className="ft-gm">FAQ</Nav.Link>
                <Nav.Link href="/inquiry" className="ft-gm">문의하기</Nav.Link>
                <Nav.Link href="#" className="ft-gm">설정</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </header>
  );
}


export default Header;