import { useState, useEffect } from "react";
import { Container, Form, Table, Row, Col } from "react-bootstrap";
import { buscarReceitas, buscarFontes } from "../utils/database";
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from "recharts";

const Historico = () => {
  const [receitas, setReceitas] = useState([]);
  const [fontes, setFontes] = useState([]);
  const [filtroAno, setFiltroAno] = useState("");
  const [filtroMes, setFiltroMes] = useState("");
  const [filtroFonte, setFiltroFonte] = useState("");

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const receitasDoBanco = await buscarReceitas();
        const fontesDoBanco = await buscarFontes();
        setReceitas(receitasDoBanco);
        setFontes(fontesDoBanco);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };
    carregarDados();
  }, []);

  // Filtrando os dados conforme os filtros selecionados
  const receitasFiltradas = receitas.filter((item) => 
    (!filtroAno || item.ano === filtroAno) &&
    (!filtroMes || item.mes === filtroMes) &&
    (!filtroFonte || item.idFonte === filtroFonte)
  );

  // Criando dados para gráfico de barras (valores por Fonte)
  const dadosGraficoBarras = fontes.map((fonte) => {

    const receitasFonte = receitasFiltradas.filter((r) => String(r.idFonte) == String(fonte.id))
    const total = receitasFonte.reduce((acc, cur) => {
         return acc + parseFloat(cur.valor);
    }, 0);

    return { name: fonte.nome, total };
  });

  // Criando dados para gráfico de pizza (receitas por mês)
  const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const dadosGraficoPizza = meses.map((mes) => ({
    name: mes,
    value: receitasFiltradas
      .filter((r) => r.mes == mes)
      .reduce((acc, cur) => acc + parseFloat(cur.valor), 0),
  })).filter(d => d.value > 0); // Remove meses sem valores

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28AFF", "#FF6384", "#36A2EB", "#FFCD56"];

  return (
    <Container className="mt-4">
      <h2 className="text-center">Histórico de Receitas</h2>
      
      {/* Filtros */}
      <Row className="mb-4">
        <Col>
          <Form.Label>Ano</Form.Label>
          <Form.Select onChange={(e) => setFiltroAno(e.target.value)}>
            <option value="">Todos</option>
            {[...new Set(receitas.map((r) => r.ano))].map((ano) => (
              <option key={ano} value={ano}>{ano}</option>
            ))}
          </Form.Select>
        </Col>
        <Col>
          <Form.Label>Mês</Form.Label>
          <Form.Select onChange={(e) => setFiltroMes(e.target.value)}>
            <option value="">Todos</option>
            {meses.map((mes, index) => (
              <option key={index} value={mes}>{mes}</option>
            ))}
          </Form.Select>
        </Col>
        <Col>
          <Form.Label>Fonte Pagadora</Form.Label>
          <Form.Select onChange={(e) => setFiltroFonte(e.target.value)}>
            <option value="">Todas</option>
            {fontes.map((fonte) => (
              <option key={fonte.id} value={fonte.id}>{fonte.nome}</option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {/* Gráficos */}
      <Row className="mt-4 d-flex justify-content-center">
        <Col md={6} className="text-center">
          <h4>Valores por Fonte Pagadora</h4>
          <BarChart width={400} height={300} data={dadosGraficoBarras}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#8884d8" />
          </BarChart>
        </Col>
        
        <Col md={6} className="text-center">
          <h4>Receitas por Mês</h4>
          <PieChart width={400} height={300}>
            <Pie data={dadosGraficoPizza} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
              {dadosGraficoPizza.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </Col>
      </Row>
    </Container>
  );
};

export default Historico;

  