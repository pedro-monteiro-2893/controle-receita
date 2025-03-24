import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="navbar-custom">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">Doidinha de Bairro Finanças</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/controle-receita">Home</Nav.Link>
            <Nav.Link as={Link} to="/historico">Histórico</Nav.Link>
            <Nav.Link as={Link} to="/receitas">Receitas</Nav.Link>
            <Nav.Link as={Link} to="/fonte">Fontes</Nav.Link>
            <Nav.Link as={Link} to="/relatorio">Relatorio</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
