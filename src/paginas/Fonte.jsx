import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { Container, Form, Button, Table, Row, Col, Alert } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert"; // Biblioteca para confirmação
import "react-confirm-alert/src/react-confirm-alert.css"; // Estilos padrão
import { formatCNPJ } from "../utils/util";
import { adicionarFonte, buscarFontes, removerFonteDoBanco } from "../utils/database";
import { BiPencil } from "react-icons/bi";

const Fonte = () => {
    const [descricao, setDescricao] = useState("");
    const [nome, setNome] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [fonte, setFonte] = useState([]);
    const [displayForm, setDisplayForm] = useState(false);
    const [mensagem, setMensagem] = useState(null);
    const [tipoMensagem, setTipoMensagem] = useState("success");
        
    // Callback para exibir a mensagem após a remoção
    const mostrarMensagem = (texto, tipo) => {
        setMensagem(texto);
        setTipoMensagem(tipo);
        setTimeout(() => setMensagem(null), 3000); // Oculta após 3 segundos
    };

    // Função que exibe o alerta de confirmação antes de excluir
    const confirmarRemocao = (item) => {
        confirmAlert({
            title: "Confirmar exclusão",
            message: "Deseja realmente excluir essa fonte?",
            buttons: [
                {
                    label: "Sim",
                    onClick: () => removerFonte(item)
                },
                {
                    label: "Cancelar",
                    onClick: () => console.log("Remoção cancelada")
                }
            ]
        });
    };


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

        await adicionarFonte(nome, descricao, cnpj);

        // Atualizar lista após salvar no Firebase
        const dadosAtualizados = await buscarFontes();
        setFonte(dadosAtualizados);

        // Limpar campos
        setDescricao("");
        setCnpj("");
    };

    const removerFonte = async (item) => {
        try {
            await removerFonteDoBanco(item.id);

            // Atualiza a lista de fontes na tela removendo o item excluído
            setFonte((prevFontes) => prevFontes.filter((f) => f.id !== item.id));

            mostrarMensagem(`Fonte "${item.nome}" removida com sucesso!`, "success");
        } catch (error) {
            mostrarMensagem("Erro ao remover fonte!", "danger");
            console.error("Erro ao remover fonte:", error);
        }
    };

    const editarFonte = async (item) => {
        console.log(item);
    }

    const exibirFormCadastro = () => {
        setDisplayForm(true);
    }

    return (
        <Container className="mt-4">
            <h2>Fontes Pagadoras</h2>

            {displayForm &&
                <Container className="bg-light border rounded p-4 mt-4">
                <Form>
                    <Form.Group className="mb-3">
                        <Row className="justify-content-center g-3"> {/* Centraliza e adiciona espaçamento */}
                            <Col xs={12} md={4}> {/* Ocupa 4 colunas no md+ e 12 em telas menores */}
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    required={true}
                                    type="text"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    placeholder="Ex: Pague Menos, Dot, Magalu..."
                                />
                            </Col>
            
                            <Col xs={12} md={4}>
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={descricao}
                                    onChange={(e) => setDescricao(e.target.value)}
                                    placeholder="Ex: Breve descrição..."
                                />
                            </Col>
            
                            <Col xs={12} md={4}>
                                <Form.Label>CNPJ</Form.Label>
                                <Form.Control
                                    required={true}
                                    type="text"
                                    value={cnpj}
                                    onChange={handleChange}
                                    placeholder="00.000.000/0001-91"
                                    maxLength="18"
                                />
                            </Col>
                        </Row>
                    </Form.Group>
            
                    <div className="text-center"> {/* Centraliza o botão */}
                        <Button variant="success" onClick={handleAdicionarFonte}>Adicionar Fonte</Button>
                    </div>
                </Form>
            </Container>}

            {/* Exibe o alerta de sucesso/erro */}
            {mensagem && (
                <Alert variant={tipoMensagem} dismissible onClose={() => setMensagem(null)}>
                    {mensagem}
                </Alert>
            )}

            <Table striped bordered hover className="mt-4">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>CNPJ</th>
                    </tr>
                </thead>
                <tbody>
                    {fonte.map((item, index) => {
                        return (
                            <tr key={item.id || index}>
                                <td>{item.nome}</td>
                                <td>{item.descricao}</td>
                                <td>{item.cnpj}</td>
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
                        );
                    })}
                </tbody>
            </Table>

            <Button className="d-flex justify-content-end" variant="success" size="sm" onClick={exibirFormCadastro}>Cadatrar Nova Fonte</Button>
        </Container>
    );
};

export default Fonte;
