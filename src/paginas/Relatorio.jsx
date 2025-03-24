import { useState, useEffect } from "react";
import { Container, Form, Button, Table, Row, Col, Card } from "react-bootstrap";
import { buscarFontes, buscarReceitas, adicionarReceita, removerReceitaDoBanco } from "../utils/database";
import "react-confirm-alert/src/react-confirm-alert.css"; // Estilos padrão
import { gerarRelatorioPDF } from "../utils/gerarRelatorioPdf";
import { FaFilePdf } from "react-icons/fa";

const Relatorio = () => {
    const [fontes, setFontes] = useState([]);
    const [receitas, setReceitas] = useState([]);
    const [filtroAno, setFiltroAno] = useState("");

    useEffect(() => {
        const carregarDados = async () => {
            try {
                const fontesDoBanco = await buscarFontes();
                setFontes(fontesDoBanco);
                const receitasDoBanco = await buscarReceitas();
                setReceitas(receitasDoBanco);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        };

        carregarDados();
    }, []);

    const receitasFiltradas = receitas.filter((item) =>
        (!filtroAno || item.ano === filtroAno));

    // Criar um mapa para acessar as fontes rapidamente
    const mapaFontes = fontes.reduce((acc, fonte) => {
        acc[fonte.id] = fonte; // Associa id da fonte ao objeto completo
        return acc;
    }, {});

    // Processar as receitas agrupando por fonte
    const receitasPorFonte = receitasFiltradas.reduce((acc, receita) => {
        const fonte = mapaFontes[receita.idFonte]; // Buscar fonte correspondente

        if (!acc[receita.idFonte]) {
            acc[receita.idFonte] = {
                nome: fonte ? fonte.nome : "Desconhecido",
                cnpj: fonte ? fonte.cnpj : "N/A",
                total: 0,
                previsaoIR: 0,
                ano: receita.ano
            };
        }

        acc[receita.idFonte].total += parseFloat(receita.valor);
        acc[receita.idFonte].previsaoIR = acc[receita.idFonte].total * 0.15;

        return acc;
    }, {});

    const totalRecebido = Object.values(receitasPorFonte).reduce((acc, item) => acc + item.total, 0);
    const totalPrevisaoIR = totalRecebido * 0.15;

    const dadosTabela = Object.values(receitasPorFonte);


    return (
        <Container className="mt-4">
            <h2 className="text-center mb-4 text-primary fw-bold display-5">
                <span style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '1px' }}>📊 Relatório de Receitas</span>
            </h2>
            <Container className="bg-light border rounded p-4 mt-4 shadow-sm">
                <Row>
                    <Col xs={12} md={12}>
                        <Table striped bordered hover className="mt-4">
                            <thead>
                                <tr>
                                    <th>Fonte</th>
                                    <th>Cnpj</th>
                                    <th>Total Recebido</th>
                                    <th>Previsão IR</th>
                                    <th>Ano</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dadosTabela.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.nome}</td>
                                        <td>{item.cnpj}</td>
                                        <td>R$ {item.total.toFixed(2)}</td>
                                        <td>R$ {item.previsaoIR.toFixed(2)}</td>
                                        <td>{item.ano}</td>
                                    </tr>
                                ))}
                                {/* 🔹 Linha de totais */}
                                <tr className="fw-bold bg-light">
                                    <td>Total</td>
                                    <td>R$ {totalRecebido.toFixed(2)}</td>
                                    <td>R$ {totalPrevisaoIR.toFixed(2)}</td>
                                    <td>-</td>
                                </tr>
                            </tbody>
                        </Table>

                    </Col>
                </Row>
            </Container>
            <Card className="p-3 shadow-sm mb-4">
                <Row className="gy-3">
                    <Col md={4}>
                        <Form.Label className="fw-bold">📅 Ano</Form.Label>
                        <Form.Select className="shadow-sm" onChange={(e) => setFiltroAno(e.target.value)}>
                            <option value="">Todos</option>
                            {[...new Set(receitas.map((r) => r.ano))].map((ano) => (
                                <option key={ano} value={ano}>{ano}</option>
                            ))}
                        </Form.Select>
                    </Col>
                    <Col md={4} className="d-flex justify-content-center align-items-center h-100">
                        <Button
                            variant="primary"
                            className="d-flex align-items-center gap-2"
                            onClick={() => gerarRelatorioPDF(receitasPorFonte)} // 🔹 Agora só executa ao clicar
                        >
                            <FaFilePdf size={18} />
                            Gerar PDF
                        </Button>
                    </Col>
                </Row>
            </Card>
        </Container>
    );
};

export default Relatorio;
