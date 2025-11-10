import Table from "react-bootstrap/Table";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
// Importando componentes do React-Bootstrap para Feedback
import { Alert, Button, Spinner } from 'react-bootstrap';

const Home = () => {
    // A URL da API, como no seu script.js
    const API = 'https://proweb.leoproti.com.br/produtos';

    // 1. VARIÁVEIS DE ESTADO
    // Em vez de manipular o DOM, usamos 'useState' para guardar os dados
    const [products, setProducts] = useState([]); // Guarda a lista de produtos
    const [isLoading, setIsLoading] = useState(false); // Controla o spinner de loading
    const [message, setMessage] = useState(null); // Guarda a mensagem de sucesso/erro

    // Função utilitária para mostrar mensagens (como no seu script.js)
    const showMessage = (text, type = 'success') => {
        setMessage({ text, type });
        // Limpa a mensagem após 3 segundos
        setTimeout(() => {
            setMessage(null);
        }, 3000);
    };

    // 2. FUNÇÃO PARA CARREGAR PRODUTOS (o seu 'carregarProdutos')
    const fetchProducts = async () => {
        setIsLoading(true); // Mostra o loading
        try {
            const res = await fetch(API, { mode: 'cors' });
            const data = await res.json();

            if (res.ok && Array.isArray(data)) {
                setProducts(data); // Coloca os produtos no estado
            } else {
                setProducts([]); // Limpa a lista em caso de erro de API
                showMessage('Erro ao carregar dados da API.', 'danger');
            }
        } catch (e) {
            // Modo offline (como no seu script.js)
            setProducts([
                { id: 1, nome: 'Notebook (exemplo)', preco: 2500 },
                { id: 2, nome: 'Mouse (exemplo)', preco: 89.9 }
            ]);
            showMessage('Modo offline: usando dados de exemplo', 'danger');
        } finally {
            setIsLoading(false); // Esconde o loading
        }
    };

    // 3. EFFECT (o seu 'DOMContentLoaded')
    // Roda a função 'fetchProducts' UMA vez, quando o componente é montado
    useEffect(() => {
        fetchProducts();
    }, []); // O array vazio [] significa "rodar só na montagem"

    // 4. FUNÇÃO PARA EXCLUIR PRODUTO (o seu 'excluirProduto')
    const handleDelete = async (id, nome) => {
        // Confirmação (como no seu script.js)
        if (window.confirm(`Excluir "${nome}"?`)) {
            setIsLoading(true); // Ativa o loading
            try {
                const res = await fetch(`${API}/${id}`, {
                    method: 'DELETE',
                    mode: 'cors'
                });

                if (res.ok) {
                    showMessage('Produto excluído com sucesso!', 'success');
                    // Após excluir, busca a lista de produtos atualizada
                    fetchProducts();
                } else {
                    const errorData = await res.text();
                    showMessage(`Erro ao excluir: ${errorData}`, 'danger');
                }
            } catch (e) {
                showMessage('Erro de conexão', 'danger');
            }
            // 'finally' não é necessário aqui, pois 'fetchProducts' já
            // vai desativar o loading no final
        }
    };

    // 5. RENDERIZAÇÃO (o JSX que será mostrado)

    // Função helper para renderizar o corpo da tabela
    const renderTableBody = () => {
        // Se estiver carregando, mostra um Spinner
        if (isLoading) {
            return (
                <tr>
                    <td colSpan="4" className="text-center">
                        <Spinner animation="border" />
                    </td>
                </tr>
            );
        }

        // Se não houver produtos, mostra mensagem (como no seu script.js)
        if (!products || products.length === 0) {
            return (
                <tr>
                    <td colSpan="4" className="text-center text-muted py-4">
                        Nenhum produto cadastrado
                    </td>
                </tr>
            );
        }

        // Se houver produtos, mapeia e cria as linhas
        return products.map((product) => (
            <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                    <Link to={`/produto/${product.id}`}>
                        {product.nome}
                    </Link>
                </td>
                <td>
                    {/* Formatando o preço como no seu script.js */}
                    R$ {Number(product.preco).toFixed(2).replace('.', ',')}
                </td>
                <td>
                    {/* Botões de Ação */}
                    <Button
                        as={Link}
                        to={`/form.html?id=${product.id}`} // Link para form.html (como no script.js)
                        variant="primary"
                        size="sm"
                        className="me-2"
                    >
                        Editar
                    </Button>
                    <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(product.id, product.nome)}
                    >
                        Excluir
                    </Button>
                </td>
            </tr>
        ));
    };

    // O JSX principal que é retornado
    return(
        <>
            {/* Renderiza a mensagem de Alerta se ela existir */}
            {message && (
                <Alert variant={message.type} onClose={() => setMessage(null)} dismissible>
                    {message.text}
                </Alert>
            )}

            <div className="d-flex justify-content-end mb-3">
                <Button as={Link} to="/cadastro" variant="success">
                    Cadastrar Novo Produto
                </Button>
            </div>

            <Table striped bordered hover>
                <thead>
                <tr>
                    {/* Corrigi os headers para bater com os dados (ID, Nome, Preço, Ações) */}
                    <th className="cabecalho">ID</th>
                    <th className="cabecalho">Nome produto</th>
                    <th className="cabecalho">Preço</th>
                    <th className="cabecalho">Ações</th>
                </tr>
                </thead>
                <tbody>
                {/* Chama a função que decide o que renderizar no corpo */}
                {renderTableBody()}
                </tbody>
            </Table>
        </>
    )
}

export default Home;