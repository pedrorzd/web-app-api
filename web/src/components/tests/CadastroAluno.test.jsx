// src/components/CadastroAluno.test.jsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import CadastroAluno from '../Cadastro.jsx'; // Ajuste o caminho se for diferente

// 'describe' agrupa uma suíte de testes
describe('Componente: CadastroAluno', () => {

    // 'it' é o caso de teste individual
    it('deve renderizar o título principal corretamente', () => {

        // 1. Arrange (Arrumar)
        // Nós "renderizamos" o componente.
        // Usamos <MemoryRouter> porque seu componente usa o 'useNavigate',
        // que precisa de um contexto de Roteador para funcionar.
        render(
            <MemoryRouter>
                <CadastroAluno />
            </MemoryRouter>
        );

        // 2. Act (Agir)
        // Procuramos pelo texto "Cadastrar Novo Aluno" na tela.
        const titulo = screen.getByText('Cadastrar Novo Aluno');

        // 3. Assert (Verificar)
        // Verificamos se o texto foi realmente encontrado no documento.
        expect(titulo).toBeInTheDocument();
    });
});