// src/utils/format.test.js
import { describe, it, expect } from 'vitest';
import { formatMatricula } from '../format.js';

describe('Função: formatMatricula', () => {

    it('deve adicionar zeros à esquerda de matrículas curtas', () => {
        // Testamos vários casos
        expect(formatMatricula(123)).toBe('000123');
        expect(formatMatricula(9)).toBe('000009');
        expect(formatMatricula(12345)).toBe('012345');
    });

    it('não deve alterar matrículas com 6 dígitos ou mais', () => {
        expect(formatMatricula(123456)).toBe('123456');
        expect(formatMatricula(9876543)).toBe('9876543');
    });
});