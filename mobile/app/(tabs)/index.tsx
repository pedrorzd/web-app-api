// 1. Importe os componentes corretos do react-native
import { StyleSheet, View, Text, ScrollView } from 'react-native';
// 2. Use o Link do EXPO ROUTER (que usa 'href', não 'to')
import { Link } from 'expo-router';

// Seus dados (estão perfeitos)
const PRODUCTS_DATA = [
  { id: 1, name: 'Teclado', quantity: 8, price: '299,00' },
  { id: 2, name: 'Mouse sem fio', quantity: 10, price: '250,00' },
  { id: 3, name: 'Headset', quantity: 5, price: '399,00' },
];

// REMOVIDOS: 'react-bootstrap/Table' e 'react-router-dom'

export default function HomeScreen() {
  return (
      // 3. Use ScrollView para listas e View como contêiner principal
      <ScrollView style={styles.container}>

        {/* 4. Tabela é feita com Views. Esta é a linha do CABEÇALHO */}
        <View style={styles.tableRowHeader}>
          {/* 5. Estilos vêm do StyleSheet. 'cabecalho' virou 'tableHeader' */}
          <Text style={[styles.tableHeader, styles.cellId]}>ID</Text>
          <Text style={[styles.tableHeader, styles.cellName]}>Nome produto</Text>
          <Text style={[styles.tableHeader, styles.cellQtd]}>Qtd</Text>
          <Text style={[styles.tableHeader, styles.cellPrice]}>Preço</Text>
        </View>

        {/* 6. Mapeie os dados para criar as LINHAS da tabela */}
        {PRODUCTS_DATA.map((product) => (
            <View style={styles.tableRow} key={product.id}>

              {/* Células de dados */}
              <Text style={[styles.tableCell, styles.cellId]}>{product.id}</Text>

              {/* 7. Célula do Link */}
              <View style={[styles.tableCell, styles.cellName]}>
                {/* O Link do Expo usa 'href' e 'asChild' para estilizar o Text */}
                <Link href={`/produto/${product.id}`} asChild>
                  <Text style={styles.linkText}>{product.name}</Text>
                </Link>
              </View>

              <Text style={[styles.tableCell, styles.cellQtd]}>{product.quantity}</Text>
              <Text style={[styles.tableCell, styles.cellPrice]}>{product.price}</Text>
            </View>
        ))}
      </ScrollView>
  );
}

// 8. Defina TODOS os seus estilos aqui
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  tableRowHeader: {
    flexDirection: 'row', // Alinha os itens lado a lado
    backgroundColor: '#f1f1f1', // Um fundo para o cabeçalho
    borderBottomWidth: 2,
    borderColor: '#ddd',
    paddingVertical: 8,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingVertical: 10,
    alignItems: 'center', // Alinha verticalmente
  },
  tableHeader: {
    fontWeight: 'bold', // Seu estilo 'cabecalho'
    fontSize: 15,
    color: '#333',
  },
  tableCell: {
    fontSize: 14,
    color: '#555',
  },

  // --- Definição das larguras das colunas ---
  // (A soma deve ser ~100%)
  cellId: {
    width: '10%',
    textAlign: 'center',
  },
  cellName: {
    width: '40%',
    paddingLeft: 5,
  },
  cellQtd: {
    width: '15%',
    textAlign: 'center',
  },
  cellPrice: {
    width: '35%',
    textAlign: 'right',
    paddingRight: 5,
    fontWeight: 'bold',
  },
  // --- Estilo para o Link ---
  linkText: {
    color: '#007bff', // Cor azul de link
    textDecorationLine: 'underline',
  },
});