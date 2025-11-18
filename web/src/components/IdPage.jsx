import Card from 'react-bootstrap/Card';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react'; // Importar os hooks
import { Alert, Spinner } from 'react-bootstrap'; // Importar componentes de feedback

// 1. Recomendo renomear o componente para algo como 'DetalheAluno'
// mas manterei 'IdPage' para seguir seu padrão.
const IdPage = () => {
    // Hooks do React
    const { id } = useParams(); // Pega o ID da URL

    // 2. Estados adaptados para 'Aluno'
    const [aluno, setAluno] = useState(null); // Guarda o aluno vindo da API
    const [isLoading, setIsLoading] = useState(true); // Controla o loading
    const [error, setError] = useState(null); // Guarda mensagens de erro

    // URL da API (já está correta)
    const API = 'https://proweb.leoproti.com.br/alunos';

    // 3. useEffect para buscar os dados do aluno
    useEffect(() => {
        // Define a função de busca
        const fetchAluno = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const res = await fetch(`${API}/${id}`, { mode: 'cors' });

                if (res.ok) {
                    const data = await res.json();
                    setAluno(data); // Salva o aluno no estado
                } else {
                    // Trata erros como 404 (Não Encontrado)
                    setError(`Aluno com ID ${id} não encontrado!`);
                }
            } catch (e) {
                // Trata erros de rede (API offline, etc)
                setError('Erro de conexão. Não foi possível carregar o aluno.');
            } finally {
                setIsLoading(false); // Para o loading em qualquer cenário
            }
        };

        fetchAluno(); // Executa a função de busca

    }, [id]); // O [id] garante que o hook rode novamente se o ID na URL mudar

    // 4. Renderização condicional (Loading, Erro, Sucesso)

    // Estado de Carregamento
    if (isLoading) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Carregando...</span>
                </Spinner>
                <p>Carregando dados do aluno...</p>
            </div>
        );
    }

    // Estado de Erro
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

    // 5. Estado de Sucesso (Aluno encontrado e renderizado no Card)
    return (
        <Card style={{ width: '18rem', margin: '2rem' }}>
            <Card.Body>
                <Card.Title>{aluno.nome}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    Matrícula: {aluno.matricula}
                </Card.Subtitle>
                <Card.Text>
                    <strong>Curso:</strong> {aluno.curso}
                    <br/>
                    <strong>Turma:</strong> {aluno.turma}
                </Card.Text>
                <Card.Link as={Link} to="/home">Voltar para lista</Card.Link>
            </Card.Body>
        </Card>
    );
}

export default IdPage;