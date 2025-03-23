import { useState, useEffect } from "react";
import { Container, Form, Button, Table, Row, Col, Alert } from "react-bootstrap";
import { buscarFontes, buscarReceitas, adicionarReceita, removerReceitaDoBanco } from "../utils/database";
import { anosDisponiveis, mesesDoAno } from "../utils/util";
import { confirmAlert } from "react-confirm-alert"; // Biblioteca para confirmação
import "react-confirm-alert/src/react-confirm-alert.css"; // Estilos padrão
import { FaTrash } from "react-icons/fa";
import { BiPencil } from "react-icons/bi";

const Receitas = () => {
  const [fontes, setFontes] = useState([]);
  const [fonteSelecionada, setFonteSelecionada] = useState(null);
  const [valor, setValor] = useState("");
  const [receitas, setReceitas] = useState([]);
  const [mesSelecionado, setMesSelecionado] = useState("");
  const [anoSelecionado, setAnoSelecionado] = useState("");
  const [mensagem, setMensagem] = useState(null);
  const [tipoMensagem, setTipoMensagem] = useState("success");

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

  const handleAdicionarReceita = async () => {
    if (!fonteSelecionada || !valor || !mesSelecionado) return;

    console.log(mesSelecionado);
    await adicionarReceita(fonteSelecionada.id, fonteSelecionada.nome, valor, mesSelecionado, anoSelecionado);

    // Atualizar lista após salvar no Firebase
    const dadosAtualizados = await buscarReceitas();
    setReceitas(dadosAtualizados);

    // Limpar campos
    setFonteSelecionada("");
    setValor("");
  };

  // Função que exibe o alerta de confirmação antes de excluir
      const confirmarRemocao = (item) => {
          confirmAlert({
              title: "Confirmar exclusão",
              message: "Deseja realmente excluir essa Receita?",
              buttons: [
                  {
                      label: "Sim",
                      onClick: () => removerReceita(item)
                  },
                  {
                      label: "Cancelar",
                      onClick: () => console.log("Remoção cancelada")
                  }
              ]
          });
      };

      const removerReceita = async (item) => {
              try {
                  await removerReceitaDoBanco(item.id);
      
                  // Atualiza a lista de fontes na tela removendo o item excluído
                  setReceitas((prevReceitas) => prevReceitas.filter((f) => f.id !== item.id));
      
                  mostrarMensagem(`Receita "${item.nome}" removida com sucesso!`, "success");
              } catch (error) {
                  mostrarMensagem("Erro ao remover Receita!", "danger");
                  console.error("Erro ao remover fonte:", error);
              }
          };

          const mostrarMensagem = (texto, tipo) => {
            setMensagem(texto);
            setTipoMensagem(tipo);
            setTimeout(() => setMensagem(null), 3000); // Oculta após 3 segundos
        };

  return (
    <Container className="mt-4">
      <h2>Controle de Receitas</h2>
      <Container className="bg-light border rounded p-4 mt-4">

        <Form>
          <Form.Group className="mb-3">
            <Row>
              <Col xs={12} md={4}>
                <Form.Label>Fonte</Form.Label>
                <Form.Select
                  value={fonteSelecionada ? fonteSelecionada.id : ""}
                  onChange={(e) => {
                    const fonte = fontes.find((f) => f.id === e.target.value);
                    setFonteSelecionada(fonte);
                  }}
                >
                  <option value="">Selecione uma fonte</option>
                  {fontes.map((fonte) => (
                    <option key={fonte.id} value={fonte.id}>
                      {fonte.nome}
                    </option>
                  ))}
                </Form.Select>
              </Col>

              <Col xs={12} md={4}>
                <Form.Label>Valor (R$)</Form.Label>
                <Form.Control
                  type="number"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                  placeholder="Ex: 500.00"
                />
              </Col>

              <Col xs={12} md={2}>
                <Form.Label>Mês</Form.Label>
                <Form.Select
                  value={mesSelecionado}
                  onChange={(e) => setMesSelecionado(e.target.value)}
                >
                  <option value="">Selecione um mês</option>
                  {mesesDoAno.map((mes) => (
                    <option key={mes.id} value={mes.nome}>
                      {mes.nome}
                    </option>
                  ))}
                </Form.Select>
              </Col>

              <Col xs={12} md={2}>
                <Form.Label>Ano</Form.Label>
                <Form.Select
                  value={anoSelecionado}
                  onChange={(e) => setAnoSelecionado(e.target.value)}
                >
                  <option value="">Ano</option>
                  {anosDisponiveis.map((ano) => (
                    <option key={ano.id} value={ano.ano}>
                      {ano.ano}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
          </Form.Group>
          <Button variant="success" onClick={handleAdicionarReceita}>Adicionar Receita</Button>
        </Form>
      </Container>

      {/* Exibe o alerta de sucesso/erro */}
      {mensagem && (
                <Alert variant={tipoMensagem} dismissible onClose={() => setMensagem(null)}>
                    {mensagem}
                </Alert>
            )}

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Fonte</th>
            <th>Valor</th>
            <th>Mês</th>
            <th>Ano</th>
          </tr>
        </thead>
        <tbody>
          {receitas.map((item, index) => (
            <tr key={item.id}>
              <td>{item.nome}</td>
              <td>R$ {parseFloat(item.valor).toFixed(2)}</td>
              <td>{item.mes}</td>
              <td>{item.ano}</td>
              <td className="text-center">
                <FaTrash
                  className="text-danger"
                  title="Deletar Fonte"
                  style={{ cursor: "pointer" }}
                  onClick={() => confirmarRemocao(item)}
                />
              </td>
              <td className="text-center">
                <BiPencil
                  className="text-muted"
                  title="Futura implementação"
                  style={{ cursor: "pointer" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Receitas;
