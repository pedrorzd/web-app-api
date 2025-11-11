import Card from 'react-bootstrap/Card';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react'; // 1. Importar os hooks
import { Alert, Spinner } from 'react-bootstrap'; // 2. Importar componentes de feedback

// 3. REMOVER a constante PRODUCTS_DATA
// const PRODUCTS_DATA = [ ... ];

const IdPage = () => {
    // Hooks do React
    const { id } = useParams(); // Pega o ID da URL (sem mudança)
    const [product, setProduct] = useState(null); // Guarda o produto vindo da API
    const [isLoading, setIsLoading] = useState(true); // Controla o loading
    const [error, setError] = useState(null); // Guarda mensagens de erro

    // URL da API
    const API = 'https://proweb.leoproti.com.br/produtos';

    // 4. useEffect para buscar os dados quando o componente carregar
    useEffect(() => {
        // Define a função de busca
        const fetchProduct = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const res = await fetch(`${API}/${id}`, { mode: 'cors' });

                if (res.ok) {
                    const data = await res.json();
                    setProduct(data); // Salva o produto no estado
                } else {
                    // Trata erros como 404 (Não Encontrado)
                    setError(`Produto com ID ${id} não encontrado!`);
                }
            } catch (e) {
                // Trata erros de rede (API offline, etc)
                setError('Erro de conexão. Não foi possível carregar o produto.');
            } finally {
                setIsLoading(false); // Para o loading em qualquer cenário
            }
        };

        fetchProduct(); // Executa a função de busca

    }, [id]); // O [id] garante que o hook rode novamente se o ID na URL mudar

    // 5. Renderização condicional (Loading, Erro, Sucesso)

    // Estado de Carregamento
    if (isLoading) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Carregando...</span>
                </Spinner>
                <p>Carregando produto...</p>
            </div>
        );
    }

    // Estado de Erro (API fora, produto não encontrado, etc)
    if (error) {
        return (
            <Alert variant="danger" className="mt-4">
                <Alert.Heading>Erro!</Alert.Heading>
                <p>{error}</p>
                <hr />
                <Link to="/home" className="btn btn-primary">Voltar para a Home</Link>
            </Alert>
        );
    }

    // Estado de Sucesso (Produto encontrado)
    // Usamos os nomes dos campos da API (nome, preco, descricao, estoque)
    return (
        <Card style={{ width: '18rem', margin: '2rem' }}>
            <Card.Body>
                <Card.Title>{product.nome}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    Preço: R$ {Number(product.preco).toFixed(2).replace('.', ',')}
                </Card.Subtitle>
                <Card.Text>
                    {product.descricao}
                    <br/>
                    <strong>Em estoque:</strong> {product.estoque} unidades.
                </Card.Text>
                <Card.Link as={Link} to="/home">Voltar para lista</Card.Link>
            </Card.Body>
        </Card>
    );
}

export default IdPage;