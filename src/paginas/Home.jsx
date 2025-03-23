import { Row, Col, Container } from "react-bootstrap";
import Carrossel from "./Components/Carousel";


const Home = () => {
    return (
        <Row className="d-flex justify-content-center align-items-center">
            <Col className="d-flex justify-content-center">
                <Carrossel />
            </Col>
            <Col>
                <Container className="bg-light border rounded p-4 mt-4 text-center shadow">
                    <h2 className="fw-bold">Gerencie Suas Receitas com Facilidade</h2>
                    <h4 className="mt-3 text-secondary">
                        Organize suas <strong>fontes de renda</strong> e acompanhe todas as receitas em um só lugar.
                        Tenha mais controle financeiro e facilite a <strong>declaração do Imposto de Renda</strong>.
                    </h4>
                </Container>
            </Col>
        </Row>

    );
};

export default Home;
