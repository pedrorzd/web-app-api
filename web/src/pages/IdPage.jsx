import Card from 'react-bootstrap/Card';
import { useParams, Link } from 'react-router-dom';

const PRODUCTS_DATA = [
    { id: 1, name: 'Teclado', quantity: 8, price: '299,00', description: 'Descrição detalhada do produto Teste.' },
    { id: 2, name: 'Mouse sem fio', quantity: 10, price: '250,00', description: 'Mouse ergonômico com alta precisão.' },
    { id: 3, name: 'Headset', quantity: 5, price: '399,00', description: 'Headset com cancelamento de ruído e microfone integrado.' },
];

const IdPage = () => {
    const { id } = useParams();
    const product = PRODUCTS_DATA.find(p => p.id === Number(id));

    // 5. Verifique se o produto existe
    if (!product) {
        return (
            <div>
                <h2>Produto não encontrado!</h2>
                <Link to="/home">Voltar para a Home</Link>
            </div>
        );
    }
    return (
        <Card style={{ width: '18rem', margin: '2rem' }}>
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    Preço: R$ {product.price}
                </Card.Subtitle>
                <Card.Text>
                    {product.description}
                    <br/>
                    <strong>Em estoque:</strong> {product.quantity} unidades.
                </Card.Text>
                <Card.Link as={Link} to="/home">Voltar para lista</Card.Link>
            </Card.Body>
        </Card>
    );
}

export default IdPage;