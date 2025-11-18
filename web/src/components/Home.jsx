import Table from "react-bootstrap/Table";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
// Importando componentes do React-Bootstrap para Feedback
import { Alert, Button, Spinner } from 'react-bootstrap';

const Home = () => {
    // A URL da API
    const API = 'https://proweb.leoproti.com.br/alunos';

    // 1. VARIÁVEIS DE ESTADO (Adaptadas para Alunos)
    const [alunos, setAlunos] = useState([]); // Guarda a lista de alunos
    const [isLoading, setIsLoading] = useState(false); // Controla o spinner de loading
    const [message, setMessage] = useState(null); // Guarda a mensagem de sucesso/erro

    // Função utilitária para mostrar mensagens
    const showMessage = (text, type = 'success') => {
        setMessage({ text, type });
        setTimeout(() => {
            setMessage(null);
        }, 3000);
    };

    // 2. FUNÇÃO PARA CARREGAR ALUNOS
    const fetchAlunos = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(API, { mode: 'cors' });
            const data = await res.json();

            if (res.ok && Array.isArray(data)) {
                setAlunos(data); // Coloca os alunos no estado
            } else {
                setAlunos([]); // Limpa a lista em caso de erro
                showMessage('Erro ao carregar dados da API.', 'danger');
            }
        } catch (e) {
            // Modo offline (com dados de exemplo de Alunos)
            setAlunos([
                { id: 1, nome: 'João (exemplo)', turma: '10A', curso: 'Eng. Software', matricula: 123 },
                { id: 2, nome: 'Maria (exemplo)', turma: '10B', curso: 'Direito', matricula: 456 }
            ]);
            showMessage('Modo offline: usando dados de exemplo', 'danger');
        } finally {
            setIsLoading(false); // Esconde o loading
        }
    };

    // 3. EFFECT (Roda UMA vez na montagem)
    useEffect(() => {
        fetchAlunos(); // Chama a função de carregar alunos
    }, []); // O array vazio [] significa "rodar só na montagem"

    // 4. FUNÇÃO PARA EXCLUIR ALUNO
    const handleDelete = async (id, nome) => {
        if (window.confirm(`Excluir "${nome}"?`)) {
            setIsLoading(true);
            try {
                const res = await fetch(`${API}/${id}`, {
                    method: 'DELETE',
                    mode: 'cors'
                });

                if (res.ok) {
                    showMessage('Aluno excluído com sucesso!', 'success');
                    fetchAlunos(); // Busca a lista de alunos atualizada
                } else {
                    const errorData = await res.text();
                    showMessage(`Erro ao excluir: ${errorData}`, 'danger');
                }
            } catch (e) {
                showMessage('Erro de conexão', 'danger');
                setIsLoading(false); // Garante que o loading saia em caso de erro de conexão
            }
        }
    };

    // 5. RENDERIZAÇÃO (o JSX que será mostrado)

    // Função helper para renderizar o corpo da tabela
    const renderTableBody = () => {
        if (isLoading) {
            return (
                <tr>
                    {/* Ajustado para 6 colunas */}
                    <td colSpan="6" className="text-center">
                        <Spinner animation="border" />
                    </td>
                </tr>
            );
        }

        if (!alunos || alunos.length === 0) {
            return (
                <tr>
                    {/* Ajustado para 6 colunas */}
                    <td colSpan="6" className="text-center text-muted py-4">
                        Nenhum aluno cadastrado
                    </td>
                </tr>
            );
        }

        // Mapeia os alunos para as linhas da tabela
        return alunos.map((aluno) => (
            <tr key={aluno.id}>
                <td>{aluno.id}</td>
                <td>
                    {/* Link para uma página de detalhes (se existir) */}
                    <Link to={`/aluno/${aluno.id}`}>
                        {aluno.nome}
                    </Link>
                </td>
                {/* Novas colunas de Aluno */}
                <td>{aluno.turma}</td>
                <td>{aluno.curso}</td>
                <td>{aluno.matricula}</td>
                <td>
                    {/* Botões de Ação */}
                    <Button
                        as={Link}
                        // Ajustei o link para um padrão React Router (ex: /editar/1)
                        to={`/editar/${aluno.id}`}
                        variant="primary"
                        size="sm"
                        className="me-2"
                    >
                        Editar
                    </Button>
                    <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(aluno.id, aluno.nome)}
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
                {/* Link para o seu componente CadastroAluno */}
                <Button as={Link} to="/cadastro" variant="success">
                    Cadastrar Novo Aluno
                </Button>
            </div>

            <Table striped bordered hover>
                <thead>
                <tr>
                    {/* Cabeçalhos atualizados para Aluno */}
                    <th className="cabecalho">ID</th>
                    <th className="cabecalho">Nome</th>
                    <th className="cabecalho">Turma</th>
                    <th className="cabecalho">Curso</th>
                    <th className="cabecalho">Matrícula</th>
                    <th className="cabecalho">Ações</th>
                </tr>
                </thead>
                <tbody>
                {renderTableBody()}
                </tbody>
            </Table>
        </>
    )
}

export default Home;