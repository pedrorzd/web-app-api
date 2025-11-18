// app/cadastro.js

import { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    Alert,
    ActivityIndicator,
    SafeAreaView,
    TextInput
} from 'react-native';
// 1. Importar o hook de roteamento do Expo
import { useRouter } from 'expo-router';

const CadastroAluno = () => {
    const API = 'https://proweb.leoproti.com.br/alunos';

    // 2. Pegar o roteador
    const router = useRouter();

    const [nome, setNome] = useState('');
    const [turma, setTurma] = useState('');
    const [curso, setCurso] = useState('');
    const [matricula, setMatricula] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const showMessage = (text, type = 'success') => {
        Alert.alert(type === 'success' ? 'Sucesso!' : 'Erro!', text);
    };

    const handleSubmit = async () => {
        // Validação simples
        if (!nome || !turma || !curso || !matricula) {
            showMessage('Todos os campos são obrigatórios!', 'danger');
            return;
        }

        setIsLoading(true);

        const novoAluno = {
            nome: nome,
            turma: turma,
            curso: curso,
            matricula: parseInt(matricula)
        };

        try {
            const res = await fetch(API, {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(novoAluno)
            });

            if (res.ok) {
                showMessage('Aluno cadastrado com sucesso!', 'success');
                // 3. Voltar para a tela anterior (a lista)
                router.back();
            } else {
                const errorData = await res.text();
                showMessage(`Erro ao cadastrar: ${errorData}`, 'danger');
            }
        } catch (e) {
            showMessage('Erro de conexão com a API.', 'danger');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Cadastrar Novo Aluno</Text>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Nome do Aluno</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ex: João da Silva"
                    value={nome}
                    onChangeText={setNome}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Turma</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ex: 10A"
                    value={turma}
                    onChangeText={setTurma}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Curso</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ex: Engenharia de Software"
                    value={curso}
                    onChangeText={setCurso}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Matrícula</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ex: 123456"
                    value={matricula}
                    onChangeText={setMatricula}
                    keyboardType="number-pad"
                />
            </View>

            {isLoading ? (
                <ActivityIndicator size="large" color="#0d6efd" style={styles.loader} />
            ) : (
                <Button title="Cadastrar Aluno" onPress={handleSubmit} />
            )}
        </SafeAreaView>
    );
};

// Estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        fontSize: 16,
    },
    loader: {
        marginTop: 20,
    }
});

export default CadastroAluno;