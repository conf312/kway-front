import { Container, Nav, Navbar } from 'react-bootstrap';
import { kwayLogo } from '../../images';

function getMainPage() {
  window.location.href = "/";
}

function Header() {
  return (
    <header className="Issuemoa-header">
      <div>
        <Navbar bg="light" expand="lg">
          <Container fluid>
            <Navbar.Brand className="fw-bold" href="#" onClick={getMainPage}>
              <img src={kwayLogo} alt="logo" height={50} width={150}></img>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <Nav.Link href="/notice-list" className="fw-bold">공지사항</Nav.Link>
                <Nav.Link href="/faq" className="fw-bold">FAQ</Nav.Link>
                <Nav.Link href="/inquiry" className="fw-bold">문의하기</Nav.Link>
                <Nav.Link href="#" className="fw-bold">설정</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </header>
  );
}


export default Header;