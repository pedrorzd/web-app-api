// app/index.js

import { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    FlatList,
    Alert,
    ActivityIndicator,
    SafeAreaView
} from 'react-native';
import { useRouter } from 'expo-router';

const Home = () => {
    const API = 'https://proweb.leoproti.com.br/alunos';
    const router = useRouter();

    const [alunos, setAlunos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const showMessage = (text, type = 'success') => {
        Alert.alert(type === 'success' ? 'Sucesso!' : 'Erro!', text);
    };

    // 1. A função fetchAlunos() já está pronta para ser chamada
    const fetchAlunos = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(API, { mode: 'cors' });
            const data = await res.json();
            if (res.ok && Array.isArray(data)) {
                setAlunos(data);
            } else {
                setAlunos([]);
                showMessage('Erro ao carregar dados da API.', 'danger');
            }
        } catch (e) {
            setAlunos([
                { id: 1, nome: 'João (exemplo)', turma: '10A', curso: 'Eng. Software' },
                { id: 2, nome: 'Maria (exemplo)', turma: '10B', curso: 'Direito' }
            ]);
            showMessage('Modo offline: usando dados de exemplo', 'danger');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAlunos();
    }, []);

    const handleDelete = (id, nome) => {
        Alert.alert(
            'Confirmar Exclusão',
            `Você tem certeza que quer excluir "${nome}"?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Excluir',
                    style: 'destructive',
                    onPress: async () => {
                        setIsLoading(true);
                        try {
                            const res = await fetch(`${API}/${id}`, {
                                method: 'DELETE',
                                mode: 'cors'
                            });
                            if (res.ok) {
                                showMessage('Aluno excluído com sucesso!', 'success');
                                fetchAlunos();
                            } else {
                                const errorData = await res.text();
                                showMessage(`Erro ao excluir: ${errorData}`, 'danger');
                                setIsLoading(false);
                            }
                        } catch (e) {
                            showMessage('Erro de conexão', 'danger');
                            setIsLoading(false);
                        }
                    }
                }
            ]
        );
    };

    const renderAlunoItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.nome}</Text>
                <Text style={styles.itemSubtitle}>
                    {item.curso} - {item.turma}
                </Text>
            </View>

            <View style={styles.itemActions}>
                <Button
                    title="Ver"
                    onPress={() => router.push(`/aluno/${item.id}`)}
                />
                <View style={{width: 8}} />
                <Button
                    title="Excluir"
                    color="#dc3545"
                    onPress={() => handleDelete(item.id, item.nome)}
                />
            </View>
        </View>
    );

    return(
        <SafeAreaView style={styles.container}>

            {/* 2. ÁREA DOS BOTÕES SUPERIORES */}
            <View style={styles.buttonContainer}>
                <Button
                    title="Recarregar Lista 🔄"
                    onPress={fetchAlunos} // <--- A MUDANÇA ESTÁ AQUI
                    color="#0d6efd" // Azul
                />
                <Button
                    title="Cadastrar Novo"
                    onPress={() => router.push('/cadastro')}
                    color="#198754" // Verde
                />
            </View>

            {isLoading ? (
                <ActivityIndicator size="large" color="#0d6efd" style={styles.loader} />
            ) : (
                <FlatList
                    data={alunos}
                    renderItem={renderAlunoItem}
                    keyExtractor={item => item.id.toString()}
                    ListEmptyComponent={<Text style={styles.emptyText}>Nenhum aluno cadastrado</Text>}
                    style={styles.list}
                />
            )}
        </SafeAreaView>
    )
}

// 3. ESTILOS ATUALIZADOS
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    // Novo estilo para organizar os botões
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    list: {
        // marginTop: 16, // Removido para dar espaço ao container de botões
    },
    loader: {
        marginTop: 40,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 40,
        fontSize: 16,
        color: '#888',
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    itemInfo: {
        flex: 1,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    itemSubtitle: {
        fontSize: 16,
        color: '#666',
    },
    itemActions: {
        flexDirection: 'row',
    },
});

export default Home;