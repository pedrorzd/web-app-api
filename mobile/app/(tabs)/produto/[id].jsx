import { View, Text, StyleSheet, ScrollView } from 'react-native';
// 1. Importe o hook para ler parâmetros e o Link para voltar
import { useLocalSearchParams, Link } from 'expo-router';

// 2. Defina ou importe os mesmos dados
const PRODUCTS_DATA = [
    { id: 1, name: 'Teclado', quantity: 8, price: '299,00', description: 'Teclado mecânico ABNT2.' },
    { id: 2, name: 'Mouse sem fio', quantity: 10, price: '250,00', description: 'Mouse ergonômico com alta precisão.' },
    { id: 3, name: 'Headset', quantity: 5, price: '399,00', description: 'Headset com cancelamento de ruído.' },
];

// 3. Este é o seu componente de página
export default function ProdutoDetalhe() {
    // 4. Use o hook para pegar o ID da URL
    const { id } = useLocalSearchParams();

    // 5. Encontre o produto (o ID vem como string)
    const product = PRODUCTS_DATA.find(p => p.id === Number(id));

    // 6. Trate o caso de produto não encontrado
    if (!product) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Produto não encontrado!</Text>
                <Link href="/" style={styles.link}>
                    <Text>Voltar</Text>
                </Link>
            </View>
        );
    }

    // 7. Renderize o "Card" com os detalhes
    return (
        <ScrollView style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>{product.name}</Text>
                <Text style={styles.cardSubtitle}>Preço: R$ {product.price}</Text>

                <View style={styles.divider} />

                <Text style={styles.cardText}>{product.description}</Text>
                <Text style={styles.cardText}>
                    Em estoque: {product.quantity} unidades
                </Text>

                <Link href="/" asChild>
                    {/* O 'asChild' permite que o Link use um
                        componente customizado (como o <Text>)
                        em vez de renderizar seu próprio <Text>
                    */}
                    <Text style={styles.link}>Voltar para a lista</Text>
                </Link>
            </View>
        </ScrollView>
    );
}

// 8. Estilos para o Card (feito com Views)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // Sombra para Android
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
    }
});