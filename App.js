import 'react-native-gesture-handler';
import React, { useLayoutEffect } from 'react';
import { View, Text, FlatList, Image, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

const DADOS = {
  Tecnologia: [
    { id: '1', cat: 'TECNOLOGIA', titulo: 'Ryzen 7 9800X3D lidera testes de desempenho', resumo: 'Novo processador da AMD com 3D V-Cache de segunda geração bate recordes...', texto: 'O novo processador AMD Ryzen 7 9800X3D estabeleceu novos padrões de desempenho e eficiência energética. Com o cache empilhado posicionado abaixo dos núcleos da CPU, o chip alcança frequências mais altas e temperaturas menores sob carga intensa.' },
    { id: '2', cat: 'TECNOLOGIA', titulo: 'NVIDIA anuncia série RTX 50 com memória GDDR7', resumo: 'Nova arquitetura Blackwell traz salto expressivo de largura de banda e eficiência...', texto: 'As novas placas de vídeo da linha GeForce RTX 50 estreiam a arquitetura Blackwell equipada com memórias GDDR7 ultrarrápidas. O avanço proporciona um ganho massivo em ray tracing e processamento pesado de gráficos em 4K.' },
    { id: '3', cat: 'TECNOLOGIA', titulo: 'SSDs PCIe 5.0 ultrapassam 14.000 MB/s de leitura', resumo: 'Novos controladores de última geração reduzem o aquecimento e dobram a velocidade...', texto: 'A nova geração de SSDs NVMe PCIe 5.0 chegou ao mercado atingindo velocidades sequenciais superiores a 14.000 MB/s, utilizando controladores mais eficientes que dispensam dissipadores ativos.' },
    { id: '4', cat: 'TECNOLOGIA', titulo: 'Memórias DDR5 CAMM2 prometem revolucionar placas-mãe', resumo: 'Novo formato compacto substitui os tradicionais pentes DIMM com frequências maiores...', texto: 'O padrão de memória CAMM2 está ganhando espaço nas placas-mãe de desktop, permitindo trilhas mais curtas com o processador, suporte a frequências acima de 8000MHz e melhor fluxo de ar no gabinete.' },
    { id: '5', cat: 'TECNOLOGIA', titulo: 'Monitores QD-OLED de 3ª geração focam em durabilidade', resumo: 'Novos painéis trazem brilho superior e proteção avançada contra burn-in...', texto: 'Os novos monitores com tecnologia QD-OLED de terceira geração contam com algoritmos térmicos aprimorados e dissipação em grafeno, entregando contraste infinito, taxas de até 360Hz e maior vida útil.' },
  ],
  Esportes: [
    { id: '1', cat: 'ESPORTES', titulo: 'Vexame histórico: Vasco é humilhado pelo Boca no Maracanã', resumo: 'Em noite desastrosa pela Sul-Americana, Cruzmaltino sofre goleada vexatória em casa...', texto: 'Em uma atuação irreconhecível diante de um Maracanã lotado, o Vasco da Gama protagonizou uma derrota vexatória por 4 a 0 para o Boca Juniors pela Copa Sul-Americana. Com falhas grotescas do sistema defensivo desde os primeiros minutos e total apatia em campo, o time carioca viu os argentinos passearem no gramado e saiu sob fortes protestos da torcida.' },
    { id: '2', cat: 'ESPORTES', titulo: 'Brasileirão: disputa pela liderança pega fogo na reta final', resumo: 'Rodada de clássicos embolou o G-4 e deixou a briga pelo título ainda mais aberta...', texto: 'A rodada do fim de semana do Campeonato Brasileiro Série A incendiou a tabela de classificação. Com tropeços na ponta e vitórias dramáticas nos acréscimos, a diferença entre os quatro primeiros colocados caiu para apenas dois pontos faltando poucas rodadas para o fim.' },
    { id: '3', cat: 'ESPORTES', titulo: 'Copa do Brasil: finalistas são definidos após noite de pênaltis', resumo: 'Semifinais eletrizantes consagram goleiros e prometem decisão milionária...', texto: 'As semifinais da Copa do Brasil entregaram emoção até o último segundo. Após empates tensos no tempo regulamentar, as vagas para a grande decisão foram decididas nas cobranças de pênaltis, garantindo uma premiação histórica para os clubes finalistas.' },
    { id: '4', cat: 'ESPORTES', titulo: 'Libertadores: clubes brasileiros dominam as semifinais', resumo: 'Equipes do Brasil impõem força em casa e ficam a um passo da Glória Eterna...', texto: 'Mais uma vez os times brasileiros mostraram hegemonia na Copa Libertadores da América. Com atuações dominantes nos jogos de ida das semifinais e estádios pulsando, as equipes do país abriram vantagem importante rumo à grande final continental.' },
    { id: '5', cat: 'ESPORTES', titulo: 'Sul-Americana: brasileiros buscam recuperação após tropeços', resumo: 'Enquanto o Vasco amarga vexame no Maracanã, outros clubes tentam avançar no torneio...', texto: 'A semana da Copa Sul-Americana foi marcada pelo contraste entre os representantes do país. Enquanto a derrota vexatória do Vasco para o Boca Juniors no Maracanã chocou o continente, os demais clubes brasileiros entraram em campo pressionados para garantir a classificação fora de casa.' },
  ],
};

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function CardNoticia({ item, onPress }) {
  return (
    <TouchableOpacity style={s.card} onPress={onPress}>
      <Text style={s.cat}>{item.cat}</Text>
      <Text style={s.titulo}>{item.titulo}</Text>
      <Text style={s.resumo}>{item.resumo}</Text>
    </TouchableOpacity>
  );
}

function ListaScreen({ navigation, route }) {
  const { categoria } = route.params;
  return (
    <SafeAreaView style={s.flex} edges={['bottom']}>
      <FlatList
        contentContainerStyle={s.pad}
        data={DADOS[categoria]}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <CardNoticia item={item} onPress={() => navigation.navigate('Detalhes', { item })} />
        )}
      />
    </SafeAreaView>
  );
}

function DetalhesScreen({ navigation, route }) {
  const { item } = route.params;
  useLayoutEffect(() => {
    navigation.setOptions({ title: item.titulo });
  }, [navigation, item]);

  return (
    <SafeAreaView style={[s.flex, s.pad]}>
      <Text style={s.cat}>{item.cat}</Text>
      <Text style={s.h1}>{item.titulo}</Text>
      <Text style={s.p}>{item.texto}</Text>
    </SafeAreaView>
  );
}

function CategoriaStack({ categoria }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Lista" component={ListaScreen} initialParams={{ categoria }} options={{ title: categoria }} />
      <Stack.Screen name="Detalhes" component={DetalhesScreen} />
    </Stack.Navigator>
  );
}

function NoticiasTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Tecnologia"
        children={() => <CategoriaStack categoria="Tecnologia" />}
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="hardware-chip-outline" size={size} color={color} /> }}
      />
      <Tab.Screen
        name="Esportes"
        children={() => <CategoriaStack categoria="Esportes" />}
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="trophy-outline" size={size} color={color} /> }}
      />
    </Tab.Navigator>
  );
}

function SobreScreen({ navigation }) {
  return (
    <SafeAreaView style={[s.flex, s.sobre]}>
      <View style={s.center}>
        <Text style={s.h1}>Sobre</Text>
        <Image
          source={{ uri: 'https://avatars.fastly.steamstatic.com/def3ffbfe15ca115ae41240bd7ae448928b6329c_full.jpg' }}
          style={s.img}
          resizeMode="contain"
        />
        <View style={s.hr} />
        <Text style={s.p}>
          Esse é o Mini App de Notícias de Don Passaron (Imagem acima)
          {"\n"}
      
          Notícias desatualizadas e repetitivas, apenas aqui no STG news!
        
        </Text>
      </View>
      <Button title="VOLTAR" onPress={() => navigation.navigate('Notícias')} />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Drawer.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
          <Drawer.Screen
            name="Notícias"
            component={NoticiasTabs}
            options={{ drawerIcon: ({ color, size }) => <Ionicons name="newspaper-outline" size={size} color={color} /> }}
          />
          <Drawer.Screen
            name="Sobre"
            component={SobreScreen}
            options={{ drawerIcon: ({ color, size }) => <Ionicons name="information-circle-outline" size={size} color={color} /> }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const s = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#f5f5f5' },
  pad: { padding: 16 },
  sobre: { padding: 16, justifyContent: 'space-between' },
  center: { alignItems: 'center' },
  img: { width: 140, height: 140, marginVertical: 12 },
  hr: { width: '100%', height: 1, backgroundColor: '#111827', marginVertical: 12 },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 12, elevation: 2 },
  cat: { fontSize: 12, color: '#6b7280', fontWeight: '600', marginBottom: 4 },
  titulo: { fontSize: 16, fontWeight: 'bold', color: '#111827', marginBottom: 6 },
  resumo: { fontSize: 14, color: '#4b5563' },
  h1: { fontSize: 22, fontWeight: 'bold', color: '#111827', marginBottom: 12 },
  p: { fontSize: 16, color: '#374151', lineHeight: 24, alignSelf: 'stretch' },
});
