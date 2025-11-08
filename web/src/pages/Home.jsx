import Table from "react-bootstrap/Table";
import { Link } from 'react-router-dom';

const PRODUCTS_DATA = [
    { id: 1, name: 'Teclado', quantity: 8, price: '299,00' },
    { id: 2, name: 'Mouse sem fio', quantity: 10, price: '250,00' },
    { id: 3, name: 'Headset', quantity: 5, price: '399,00' },
];
const Home = () => {
    return(
        <>
            <Table striped bordered hover>
                <thead>
                <tr>
                    {/* Lembre-se: Use className, não class */}
                    <th className="cabecalho">ID</th>
                    <th className="cabecalho">Nome produto</th>
                    <th className="cabecalho">Quantidade</th>
                    <th className="cabecalho">Preço</th>
                </tr>
                </thead>
                <tbody>
                {PRODUCTS_DATA.map((product) => (
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>
                            <Link to={`/produto/${product.id}`}>
                                {product.name}
                            </Link>
                        </td>
                        <td>{product.quantity}</td>
                        <td>{product.price}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </>
    )
}

export default Home;