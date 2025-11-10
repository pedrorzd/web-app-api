import { useState } from 'react';
// Importa o hook de navegação do Expo Router
import { useRouter } from 'expo-router';
import {
    View,
    Text,
    TextInput,    // Substituto do <input> e <textarea>
    StyleSheet,
    Alert,        // Para feedback (sucesso/erro)
    ActivityIndicator, // O Spinner de loading
    ScrollView,   // Garante que o formulário não seja coberto pelo teclado
    TouchableOpacity, // Para criar um botão customizado
    SafeAreaView  // Para evitar o notch
} from 'react-native';

const CadastroProduto = () => {
    // API (Idêntico)
    const API = 'https://proweb.leoproti.com.br/produtos';

    // Hook para redirecionar (substituto do useNavigate)
    const router = useRouter();

    // --- 1. LÓGICA DE ESTADO (Idêntica) ---
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const [estoque, setEstoque] = useState('');
    const [descricao, setDescricao] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    // (Não precisamos do 'message', pois o Alert nativo é uma função)

    // --- 2. FUNÇÃO handleSubmit (Quase Idêntica) ---
    const handleSubmit = async () => {
        setIsLoading(true);

        // Monta o objeto (idêntico)
        const novoProduto = {
            nome: nome,
            preco: parseFloat(preco),
            estoque: parseInt(estoque),
            descricao: descricao
        };

        try {
            // Requisição POST (idêntica)
            const res = await fetch(API, {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(novoProduto)
            });

            if (res.ok) {
                // Sucesso: Mostra alerta nativo
                Alert.alert('Sucesso!', 'Produto cadastrado com sucesso!');
                // Redireciona para a home
                router.push('/home'); // (ou o nome da sua rota principal)
            } else {
                // Erro da API
                const errorData = await res.text();
                Alert.alert('Erro no Cadastro', `Erro ao cadastrar: ${errorData}`);
            }
        } catch (e) {
            // Erro de rede
            Alert.alert('Erro de Conexão', 'Não foi possível conectar à API.');
        } finally {
            setIsLoading(false);
        }
    };

    // --- 3. RENDERIZAÇÃO (JSX Traduzido) ---
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Cadastrar Novo Produto</Text>

                {/* Campo Nome */}
                <Text style={styles.label}>Nome do Produto</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ex: Teclado Mecânico"
                    value={nome}
                    onChangeText={setNome} // Equivalente ao onChange(e => set...)
                />

                {/* Campo Preço */}
                <Text style={styles.label}>Preço (R$)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ex: 299.90"
                    value={preco}
                    onChangeText={setPreco}
                    keyboardType="decimal-pad" // Mostra teclado numérico
                />

                {/* Campo Estoque */}
                <Text style={styles.label}>Estoque (unidades)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ex: 50"
                    value={estoque}
                    onChangeText={setEstoque}
                    keyboardType="number-pad" // Mostra teclado numérico
                />

                {/* Campo Descrição */}
                <Text style={styles.label}>Descrição</Text>
                <TextInput
                    style={styles.textArea} // Estilo diferente para altura
                    placeholder="Descrição detalhada do produto..."
                    value={descricao}
                    onChangeText={setDescricao}
                    multiline={true}  // Permite múltiplas linhas
                    numberOfLines={4} // Altura inicial
                />

                {/* Botão de Enviar (Customizado) */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Cadastrar Produto</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

// --- 4. ESTILOS (Substituto do Bootstrap/CSS) ---
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#f5f5f5',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        marginBottom: 16,
    },
    textArea: {
        backgroundColor: '#f5f5f5',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        marginBottom: 20,
        height: 100, // Altura fixa para textarea
        textAlignVertical: 'top', // Começa a digitar do topo (Android)
    },
    button: {
        backgroundColor: '#007bff', // Azul (primary)
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CadastroProduto;