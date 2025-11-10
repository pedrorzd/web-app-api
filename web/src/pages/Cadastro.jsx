import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Spinner, Container } from 'react-bootstrap';

const CadastroProduto = () => {
    // URL da API
    const API = 'https://proweb.leoproti.com.br/produtos';

    // Hook para redirecionar após o cadastro
    const navigate = useNavigate();

    // Estados para os campos do formulário
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const [estoque, setEstoque] = useState('');
    const [descricao, setDescricao] = useState('');

    // Estados de feedback
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null); // { text: '...', type: 'success' | 'danger' }

    // Função para mostrar mensagens (feedback)
    const showMessage = (text, type = 'success') => {
        setMessage({ text, type });
        // Limpa a mensagem após 3 segundos
        setTimeout(() => setMessage(null), 3000);
    };

    // Função chamada ao enviar o formulário
    const handleSubmit = async (event) => {
        // Impede o recarregamento padrão do formulário HTML
        event.preventDefault();

        setIsLoading(true);

        // Monta o objeto do novo produto com os dados do estado
        const novoProduto = {
            nome: nome,
            preco: parseFloat(preco), // Converte o texto "preco" para número
            estoque: parseInt(estoque), // Converte o texto "estoque" para número
            descricao: descricao
        };

        try {
            // Faz a requisição POST para a API
            const res = await fetch(API, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novoProduto) // Envia o objeto como JSON
            });

            if (res.ok) {
                // Sucesso
                showMessage('Produto cadastrado com sucesso!', 'success');
                // Redireciona para a home após 1.5 segundos
                setTimeout(() => {
                    navigate('/home');
                }, 1500);
            } else {
                // Erro da API
                const errorData = await res.text();
                showMessage(`Erro ao cadastrar: ${errorData}`, 'danger');
            }
        } catch (e) {
            // Erro de rede (conexão, etc)
            showMessage('Erro de conexão com a API.', 'danger');
        } finally {
            // Garante que o loading pare, mesmo se der erro
            setIsLoading(false);
        }
    };

    // Renderização do componente (o que aparece na tela)
    return (
        <Container className="mt-4">
            <h2>Cadastrar Novo Produto</h2>
            <hr />

            {/* Alerta de feedback (sucesso ou erro) */}
            {message && (
                <Alert variant={message.type} onClose={() => setMessage(null)} dismissible>
                    {message.text}
                </Alert>
            )}

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formNome">
                    <Form.Label>Nome do Produto</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ex: Teclado Mecânico"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)} // Atualiza o estado 'nome'
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPreco">
                    <Form.Label>Preço (R$)</Form.Label>
                    <Form.Control
                        type="number"
                        step="0.01" // Permite casas decimais
                        placeholder="Ex: 299.90"
                        value={preco}
                        onChange={(e) => setPreco(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEstoque">
                    <Form.Label>Estoque (unidades)</Form.Label>
                    <Form.Control
                        type="number"
                        step="1" // Apenas números inteiros
                        placeholder="Ex: 50"
                        value={estoque}
                        onChange={(e) => setEstoque(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formDescricao">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Descrição detalhada do produto..."
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                            {' '}Salvando...
                        </>
                    ) : (
                        'Cadastrar Produto'
                    )}
                </Button>
            </Form>
        </Container>
    );
};

export default CadastroProduto;