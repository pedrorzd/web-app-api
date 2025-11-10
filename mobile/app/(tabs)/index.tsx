import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList, // O substituto da <table>
  Alert,    // O substituto do Alert do Bootstrap
  ActivityIndicator, // O substituto do <Spinner>
  SafeAreaView,
  TouchableOpacity // Uma alternativa melhor para botões customizados
} from 'react-native';
// Hook para navegação (substituto do <Link>)
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  // API (Idêntico)
  const API = 'https://proweb.leoproti.com.br/produtos';

  // Hook de navegação (Substituto do <Link> e useNavigate)
  const navigation = useNavigation();

  // --- 1. LÓGICA DE ESTADO (Idêntica) ---
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // (Removemos o 'message' pois o Alert nativo é uma função, não um componente)

  // --- 2. FUNÇÃO showMessage (Modificada) ---
  // No React Native, o Alert é uma função pop-up, não um componente na tela.
  const showMessage = (text, type = 'success') => {
    Alert.alert(
        type === 'success' ? 'Sucesso!' : 'Erro!',
        text
    );
  };

  // --- 3. FUNÇÃO fetchProducts (Idêntica) ---
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(API, { mode: 'cors' });
      const data = await res.json();

      if (res.ok && Array.isArray(data)) {
        setProducts(data);
      } else {
        setProducts([]);
        showMessage('Erro ao carregar dados da API.', 'danger');
      }
    } catch (e) {
      setProducts([
        { id: 1, nome: 'Notebook (exemplo)', preco: 2500 },
        { id: 2, nome: 'Mouse (exemplo)', preco: 89.9 }
      ]);
      showMessage('Modo offline: usando dados de exemplo', 'danger');
    } finally {
      setIsLoading(false);
    }
  };

  // --- 4. useEffect (Idêntico) ---
  useEffect(() => {
    fetchProducts();
  }, []);

  // --- 5. FUNÇÃO handleDelete (Modificada) ---
  // Usamos o Alert.alert nativo para confirmação (substituto do window.confirm)
  const handleDelete = (id, nome) => {
    Alert.alert(
        'Confirmar Exclusão', // Título
        `Você tem certeza que quer excluir "${nome}"?`, // Mensagem
        [
          // Botões
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Excluir',
            style: 'destructive',
            // Ação ao pressionar "Excluir"
            onPress: async () => {
              setIsLoading(true);
              try {
                const res = await fetch(`${API}/${id}`, {
                  method: 'DELETE',
                  mode: 'cors'
                });

                if (res.ok) {
                  showMessage('Produto excluído com sucesso!', 'success');
                  fetchProducts(); // Recarrega a lista
                } else {
                  const errorData = await res.text();
                  showMessage(`Erro ao excluir: ${errorData}`, 'danger');
                }
              } catch (e) {
                showMessage('Erro de conexão', 'danger');
              }
              // O loading vai parar no 'finally' do fetchProducts
            }
          }
        ]
    );
  };

  // --- 6. RENDERIZAÇÃO (JSX Traduzido) ---

  // Função que renderiza cada item da lista (substitui o <tr>)
  const renderProductItem = ({ item }) => (
      <View style={styles.itemContainer}>
        {/* View (div) para as informações */}
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.nome}</Text>
          <Text style={styles.itemPrice}>
            R$ {Number(item.preco).toFixed(2).replace('.', ',')}
          </Text>
        </View>

        {/* View (div) para os botões */}
        <View style={styles.itemActions}>
          <Button
              title="Editar"
              onPress={() => navigation.navigate('ProdutoDetalhe', { id: item.id })}
          />
          <View style={{width: 8}} /> {/* Espaçador */}
          <Button
              title="Excluir"
              color="#dc3545" // Cor vermelha (danger)
              onPress={() => handleDelete(item.id, item.nome)}
          />
        </View>
      </View>
  );

  // O JSX principal que é retornado
  return(
      // SafeAreaView é um <div> que respeita as áreas seguras do celular (notch, etc)
      <SafeAreaView style={styles.container}>
        {/* Botão de Cadastro (exemplo) */}
        <Button
            title="Cadastrar Novo Produto"
            onPress={() => navigation.navigate('CadastroProduto')}
        />

        {/* Feedback de Loading */}
        {isLoading ? (
            <ActivityIndicator size="large" color="#0d6efd" style={styles.loader} />
        ) : (
            // FlatList é o componente otimizado para renderizar listas (substituto da <table>)
            <FlatList
                data={products}
                renderItem={renderProductItem} // Função que renderiza cada item
                keyExtractor={item => item.id.toString()} // Define a 'key'
                ListEmptyComponent={<Text style={styles.emptyText}>Nenhum produto cadastrado</Text>}
                style={styles.list}
            />
        )}
      </SafeAreaView>
  )
}

// --- 7. ESTILOS (Substituto do Bootstrap/CSS) ---
// No React Native, usamos StyleSheet para estilizar
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa a tela inteira
    padding: 16,
    backgroundColor: '#fff',
  },
  list: {
    marginTop: 16,
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
    flexDirection: 'row', // Coloca os itens lado a lado
    justifyContent: 'space-between', // Espaço entre (info | ações)
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemInfo: {
    flex: 1, // Permite que o nome quebre a linha se for grande
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  itemPrice: {
    fontSize: 16,
    color: '#666',
  },
  itemActions: {
    flexDirection: 'row', // Botões lado a lado
  },
});

export default Home;