import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
// 1. Importar os hooks de estado e efeito
import { useState, useEffect } from 'react';
import { useLocalSearchParams, Link } from 'expo-router';

// 2. REMOVER a constante PRODUCTS_DATA
// const PRODUCTS_DATA = [ ... ];

// 3. Este é o seu componente de página
export default function ProdutoDetalhe() {
    // 4. Use o hook para pegar o ID da URL (sem mudança)
    const { id } = useLocalSearchParams();

    // 5. Adicionar a URL da API e os estados
    const API = 'https://proweb.leoproti.com.br/produtos';
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // 6. useEffect para buscar os dados quando o componente carregar
    useEffect(() => {
        const fetchProduct = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const res = await fetch(`${API}/${id}`, { mode: 'cors' });

                if (res.ok) {
                    const data = await res.json();
                    setProduct(data); // Salva o produto no estado
                } else {
                    setError(`Produto com ID ${id} não encontrado!`);
                }
            } catch (e) {
                setError('Erro de conexão. Não foi possível carregar o produto.');
            } finally {
                setIsLoading(false); // Para o loading
            }
        };

        fetchProduct(); // Executa a função de busca

    }, [id]); // O [id] garante que o hook rode novamente se o ID na URL mudar

    // 7. Renderização condicional (Loading, Erro, Sucesso)

    // Estado de Carregamento
    if (isLoading) {
        return (
            <View style={[styles.container, styles.center]}>
                <ActivityIndicator size="large" color="#007bff" />
                <Text style={{ marginTop: 10 }}>Carregando produto...</Text>
            </View>
        );
    }

    // Estado de Erro (API fora, produto não encontrado, etc)
    if (error) {
        return (
            <View style={[styles.container, styles.center]}>
                <Text style={styles.errorText}>{error}</Text>
                <Link href="/" asChild>
                    <Text style={styles.link}>Voltar para a lista</Text>
                </Link>
            </View>
        );
    }

    // Se, por algum motivo, não estiver carregando, sem erro, mas sem produto
    if (!product) {
        return null; // Não renderiza nada
    }

    // 8. Estado de Sucesso (Produto encontrado)
    // Usamos os nomes dos campos da API (nome, preco, descricao, estoque)
    return (
        <ScrollView style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>{product.nome}</Text>
                <Text style={styles.cardSubtitle}>
                    Preço: R$ {Number(product.preco).toFixed(2).replace('.', ',')}
                </Text>

                <View style={styles.divider} />

                <Text style={styles.cardText}>{product.descricao}</Text>
                <Text style={styles.cardText}>
                    Em estoque: {product.estoque} unidades
                </Text>

                <Link href="/" asChild>
                    <Text style={styles.link}>Voltar para a lista</Text>
                </Link>
            </View>
        </ScrollView>
    );
}

// 9. Estilos (Adicionei um 'center' para o loading/erro)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#222',
    },
    cardSubtitle: {
        fontSize: 18,
        color: '#555',
        marginBottom: 15,
    },
    divider: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 15,
    },
    cardText: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
        marginBottom: 10,
    },
    link: {
        marginTop: 20,
        color: '#007bff',
        fontSize: 16,
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
        marginBottom: 20,
    }
});