import { useState } from "react";
import { Container, Form, Button, Table } from "react-bootstrap";
import { formatCNPJ } from "../utils/util";

const Fonte = () => {
    const [descricao, setDescricao] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [fonte, setFonte] = useState([]);
    const [displayForm, setDisplayForm] = useState(false);

    const handleChange = (e) => {
        const formattedValue = formatCNPJ(e.target.value);
        setCnpj(formattedValue);
    };

    const adicionarFonte = () => {
        if (!descricao || !cnpj) return;
        setFonte([...fonte, { descricao, cnpj }]);
        setDescricao("");
        setCnpj("");
    };

    const exibirFormCadastro = () => {
        setDisplayForm(true);
    }

    return (
        <Container className="mt-4">
            <h2>Fontes Pagadoras</h2>

            {displayForm && 
            <Container className="bg-light border rounded p-4 mt-4" >
            <Form>
                <Form.Group className="mb-3">
                    <div className="d-flex gap-3"> {/* Flexbox para alinhar lado a lado */}
                        <div className="w-50">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                                placeholder="Ex: Pague Menos, Dot, Magalu..."
                            />
                        </div>

                        <div className="w-50">
                            <Form.Label>CNPJ</Form.Label>
                            <Form.Control
                                type="text"
                                value={cnpj}
                                onChange={handleChange}
                                placeholder="00.000.000/0001-91"
                                maxLength="18" // CNPJ tem 18 caracteres com a máscara
                            />
                        </div>
                    </div>
                </Form.Group>

                <Button variant="success" onClick={adicionarFonte}>Adicionar Fonte</Button>
            </Form> 
            </Container>}

            <Table striped bordered hover className="mt-4">
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th>CNPJ</th>
                    </tr>
                </thead>
                <tbody>
                    {fonte.map((item, index) => (
                        <tr key={index}>
                            <td>{item.descricao}</td>
                            <td>{item.cnpj}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Button className="d-flex justify-content-end" variant="success" size="sm" onClick={exibirFormCadastro}>Cadatrar Nova Fonte</Button>
        </Container>
    );
};

export default Fonte;
