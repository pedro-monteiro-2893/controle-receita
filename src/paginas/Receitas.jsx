import { useState } from "react";
import { Container, Form, Button, Table } from "react-bootstrap";

const Receitas = () => {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [receitas, setReceitas] = useState([]);

  const adicionarReceita = () => {
    if (!descricao || !valor) return;
    setReceitas([...receitas, { descricao, valor }]);
    setDescricao("");
    setValor("");
  };

  return (
    <Container className="mt-4">
      <h2>Controle de Receitas</h2>
      <Form>
        <Form.Group className="mb-3">
          <div className="d-flex gap-3"> {/* Flexbox para alinhar lado a lado */}
            <div className="w-50">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                type="text"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Ex: Salário, Venda, Presente..."
              />
            </div>

            <div className="w-50">
              <Form.Label>Valor (R$)</Form.Label>
              <Form.Control
                type="number"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                placeholder="Ex: 500.00"
              />
            </div>
          </div>
        </Form.Group>
        <Button variant="success" onClick={adicionarReceita}>Adicionar Receita</Button>
      </Form>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {receitas.map((item, index) => (
            <tr key={index}>
              <td>{item.descricao}</td>
              <td>R$ {parseFloat(item.valor).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Receitas;
