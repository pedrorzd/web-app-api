// src/utils/format.js
export const formatMatricula = (num) => {
    // Converte para string e adiciona zeros à esquerda até ter 6 dígitos
    return String(num).padStart(6, '0');
};