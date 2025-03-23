import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { Container, Form, Button, Table } from "react-bootstrap";
import { formatCNPJ } from "../utils/util";
import { adicionarFonte, buscarFontes, removerFonteDoBanco } from "../utils/database";

const Fonte = () => {
    const [descricao, setDescricao] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [fonte, setFonte] = useState([]);
    const [displayForm, setDisplayForm] = useState(false);

    useEffect(() => {
        const carregarFontes = async () => {
            const dados = await buscarFontes();
            setFonte(dados);
        };
        carregarFontes();
    }, []);

    const handleChange = (e) => {
        const formattedValue = formatCNPJ(e.target.value);
        setCnpj(formattedValue);
    };

    const handleAdicionarFonte = async () => {
        if (!descricao || !cnpj) return;

        await adicionarFonte(descricao, cnpj);

        // Atualizar lista após salvar no Firebase
        const dadosAtualizados = await buscarFontes();
        setFonte(dadosAtualizados);

        // Limpar campos
        setDescricao("");
        setCnpj("");
    };

    const removerFonte = async (item) => {
        try {
            // Removendo do Firestore
            await removerFonteDoBanco(item.id);

            // Atualizando o estado para refletir a remoção na UI
            setFonte((prevFontes) => prevFontes.filter((f) => f.id !== item.id));

            console.log(`Fonte ${item.descricao} removida com sucesso!`);
        } catch (error) {
            console.error("Erro ao remover fonte:", error);
        }
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

                        <Button variant="success" onClick={handleAdicionarFonte}>Adicionar Fonte</Button>
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
                    {fonte.map((item, index) => {
                        console.log("Item da lista:", item); // Loga cada item antes de renderizar
                        return (
                            <tr key={item.id || index}>
                                <td>{item.descricao}</td>
                                <td>{item.cnpj}</td>
                                <td className="text-center">
                                    <FaTrash
                                        className="text-danger"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => removerFonte(item)}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>

            <Button className="d-flex justify-content-end" variant="success" size="sm" onClick={exibirFormCadastro}>Cadatrar Nova Fonte</Button>
        </Container>
    );
};

export default Fonte;
