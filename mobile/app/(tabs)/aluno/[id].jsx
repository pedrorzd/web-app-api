// app/aluno/[id].js

import { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    ActivityIndicator,
    SafeAreaView,
    Button
} from 'react-native';
// 1. Importar hooks para ler o ID da URL e para navegação
import { useLocalSearchParams, useRouter } from 'expo-router';

const DetalheAluno = () => {
    const API = 'https://proweb.leoproti.com.br/alunos';

    // 2. Pegar o ID da URL e o roteador
    const { id } = useLocalSearchParams();
    const router = useRouter();

    const [aluno, setAluno] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            const fetchAluno = async () => {
                setIsLoading(true);
                setError(null);
                try {
                    const res = await fetch(`${API}/${id}`, { mode: 'cors' });
                    if (res.ok) {
                        const data = await res.json();
                        setAluno(data);
                    } else {
                        setError(`Aluno com ID ${id} não encontrado!`);
                    }
                } catch (e) {
                    setError('Erro de conexão. Não foi possível carregar o aluno.');
                } finally {
                    setIsLoading(false);
                }
            };
            fetchAluno();
        }
    }, [id]);

    // Renderização condicional
    if (isLoading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#0d6efd" />
                <Text>Carregando dados do aluno...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Erro!</Text>
                <Text style={styles.errorText}>{error}</Text>
                <Button title="Voltar para a Lista" onPress={() => router.back()} />
            </SafeAreaView>
        );
    }

    if (!aluno) {
        return null; // Caso algo inesperado ocorra
    }

    // Renderização de Sucesso
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>{aluno.nome}</Text>

            <View style={styles.infoBox}>
                <Text style={styles.infoLabel}>Matrícula:</Text>
                <Text style={styles.infoContent}>{aluno.matricula}</Text>
            </View>

            <View style={styles.infoBox}>
                <Text style={styles.infoLabel}>Curso:</Text>
                <Text style={styles.infoContent}>{aluno.curso}</Text>
            </View>

            <View style={styles.infoBox}>
                <Text style={styles.infoLabel}>Turma:</Text>
                <Text style={styles.infoContent}>{aluno.turma}</Text>
            </View>

            <Button title="Voltar" onPress={() => router.back()} />
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
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    infoBox: {
        marginBottom: 15,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
    },
    infoLabel: {
        fontSize: 16,
        color: '#666',
    },
    infoContent: {
        fontSize: 20,
        color: '#000',
        fontWeight: '500',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
        marginBottom: 20,
    }
});

export default DetalheAluno;