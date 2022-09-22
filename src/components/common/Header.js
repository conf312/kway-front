import { Button } from 'react-bootstrap';
import { Cookies } from "react-cookie";
import * as AxiosUtil from '../../lib/AxiosUtil';
import { Container, Form, Nav, Navbar, Card } from 'react-bootstrap';

function getMainPage() {
  window.location.href = "/";
}

function getSignInPage() {
  window.location.href = "/sign-in";
}

function getSignUpPage() {
  window.location.href = "/sign-up";
}

function getMyPage() {
  window.location.href = "/my-page";
}

function getLogout() {
  AxiosUtil.send("GET", "/issuemoa/users/logout", "", "", (e) => { window.location.href="/"; });
}


const IsEligible = () => {
  return (
  <>
    <Button variant="link" className="link-light btn float-end fw-bold" onClick={getLogout}>Logout</Button>
    <Button variant="link" className="link-light border border-primary btn float-end fw-bold" onClick={getMyPage}>MyPage</Button>
  </>
  );
}

const NotEligible = () => {  
  return (
    <>
      <Button variant="link" className="link-light border border-primary btn float-end fw-bold" onClick={getSignUpPage}>Sign Up</Button>
      <Button variant="link" className="link-light btn float-end fw-bold" onClick={getSignInPage}>Sign In</Button>
    </>
  );
}

function Header() {
  let auth = new Cookies().get("accessToken") ? true : false;
  return (
    <header className="Issuemoa-header">
      <div>
        <Navbar bg="light" expand="lg">
          <Container fluid>
            <Navbar.Brand className="fw-bold" href="#" onClick={getMainPage}>케이웨이</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <Nav.Link href="/notice">공지사항</Nav.Link>
                <Nav.Link href="/faq">FAQ</Nav.Link>
                <Nav.Link href="/inquiry">문의하기</Nav.Link>
                <Nav.Link href="#">설정</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </header>
  );
}


export default Header;