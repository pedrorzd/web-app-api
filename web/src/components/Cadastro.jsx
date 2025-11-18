import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Spinner, Container } from 'react-bootstrap';

// 1. Renomeei o componente de CadastroProduto para CadastroAluno
const CadastroAluno = () => {
    // URL da API
    const API = 'https://proweb.leoproti.com.br/alunos';

    // Hook para redirecionar após o cadastro
    const navigate = useNavigate();

    // Estados para os campos do formulário (agora corretos para Aluno)
    // Removi o 'id', pois ele não é enviado no cadastro (POST)
    const [nome, setNome] = useState('');
    const [turma, setTurma] = useState('');
    const [curso, setCurso] = useState('');
    const [matricula, setMatricula] = useState('');

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

        // 2. Montei o objeto do *novoAluno* com os dados de estado corretos
        // (Assumi que matrícula é um número, como 'estoque' era no seu código original)
        const novoAluno = {
            nome: nome,
            turma: turma,
            curso: curso,
            matricula: parseInt(matricula) // Converte a matrícula para número
        };

        try {
            // Faz a requisição POST para a API
            const res = await fetch(API, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novoAluno) // 3. Enviei o novoAluno
            });

            if (res.ok) {
                // Sucesso
                // 4. Mudei a mensagem de sucesso
                showMessage('Aluno cadastrado com sucesso!', 'success');
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

    // 5. Renderização do componente (atualizei todo o formulário)
    return (
        <Container className="mt-4">
            <h2>Cadastrar Novo Aluno</h2>
            <hr />

            {/* Alerta de feedback (sucesso ou erro) */}
            {message && (
                <Alert variant={message.type} onClose={() => setMessage(null)} dismissible>
                    {message.text}
                </Alert>
            )}

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formNome">
                    <Form.Label>Nome do Aluno</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ex: João da Silva"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formTurma">
                    <Form.Label>Turma</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ex: 10A"
                        value={turma}
                        onChange={(e) => setTurma(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCurso">
                    <Form.Label>Curso</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ex: Engenharia de Software"
                        value={curso}
                        onChange={(e) => setCurso(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formMatricula">
                    <Form.Label>Matrícula</Form.Label>
                    <Form.Control
                        type="number"
                        step="1" // Apenas números inteiros
                        placeholder="Ex: 123456"
                        value={matricula}
                        onChange={(e) => setMatricula(e.target.value)}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                            {' '}Salvando...
                        </>
                    ) : (
                        'Cadastrar Aluno' // 6. Mudei o texto do botão
                    )}
                </Button>
            </Form>
        </Container>
    );
};

export default CadastroAluno; // 7. Mudei o export