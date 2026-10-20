import { useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const DRAWER_WIDTH = 270;
const TOP_PADDING = Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 0;

const ACTIVITES = [
  {
    id: 1,
    titre: 'Dessin et coloriage',
    description: 'Développement de la créativité',
    icone: '🎨',
  },
  {
    id: 2,
    titre: 'Jeux éducatifs',
    description: 'Apprentissage par le jeu',
    icone: '🧩',
  },
  {
    id: 3,
    titre: 'Musique et chansons',
    description: 'Éveil musical des enfants',
    icone: '🎵',
  },
  {
    id: 4,
    titre: 'Lecture de contes',
    description: 'Découverte des histoires',
    icone: '📚',
  },
  {
    id: 5,
    titre: 'Activités sportives',
    description: 'Développement de la motricité',
    icone: '⚽',
  },
];

const MENU = [
  { key: 'Accueil', label: 'Accueil', icone: '🏠' },
  { key: 'Activités', label: 'Activités', icone: '🎨' },
  { key: 'À propos', label: 'À propos', icone: 'ℹ️' },
];

export default function HomeScreen() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const slide = useRef(new Animated.Value(-DRAWER_WIDTH)).current;

  const ouvrirDrawer = () => {
    setDrawerOpen(true);
    Animated.timing(slide, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const fermerDrawer = () => {
    Animated.timing(slide, {
      toValue: -DRAWER_WIDTH,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setDrawerOpen(false));
  };

  const renderActivite = ({ item }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.7}>
      <View style={styles.cardIconBox}>
        <Text style={styles.cardIcon}>{item.icone}</Text>
      </View>
      <View style={styles.cardTextBox}>
        <Text style={styles.cardTitle}>{item.titre}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
      </View>
      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>
      {/* AppBar */}
      <View style={styles.appBar}>
        <TouchableOpacity onPress={ouvrirDrawer} style={styles.appBarBtn}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.appBarTitle}>Ma Garderie</Text>
        <View style={styles.appBarBtn} />
      </View>

      {/* Liste des activités */}
      <View style={styles.content}>
        <FlatList
          data={ACTIVITES}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderActivite}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <View style={styles.greeting}>
              <Text style={styles.greetingSmall}>BONJOUR !</Text>
              <Text style={styles.greetingBig}>
                Quelle activité aujourd'hui ?
              </Text>
            </View>
          }
        />
      </View>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={() => {}}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>

      {/* Drawer */}
      {drawerOpen && (
        <View style={StyleSheet.absoluteFill}>
          <Pressable style={styles.backdrop} onPress={fermerDrawer} />
          <Animated.View
            style={[styles.drawer, { transform: [{ translateX: slide }] }]}
          >
            <Text style={styles.drawerTitle}>Ma Garderie</Text>
            {MENU.map((item) => (
              <TouchableOpacity
                key={item.key}
                style={styles.drawerItem}
                onPress={fermerDrawer}
              >
                <Text style={styles.drawerIcon}>{item.icone}</Text>
                <Text style={styles.drawerLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </Animated.View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#5B9BE6',
    paddingTop: TOP_PADDING,
  },
  appBar: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#5B9BE6',
    paddingHorizontal: 8,
  },
  appBarBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: {
    fontSize: 26,
    color: '#fff',
  },
  appBarTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    backgroundColor: '#F4F8FD',
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  greeting: {
    backgroundColor: '#E3EEFB',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  greetingSmall: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#6B7A99',
    marginBottom: 4,
  },
  greetingBig: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2A44',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardIconBox: {
    width: 54,
    height: 54,
    borderRadius: 12,
    backgroundColor: '#EEF4FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  cardIcon: {
    fontSize: 28,
  },
  cardTextBox: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1F2A44',
  },
  cardDescription: {
    fontSize: 14,
    color: '#6B7A99',
    marginTop: 2,
  },
  chevron: {
    fontSize: 28,
    color: '#A0AABF',
    marginLeft: 8,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 28,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#3B82E6',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  fabIcon: {
    fontSize: 32,
    color: '#fff',
    marginTop: -2,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: DRAWER_WIDTH,
    backgroundColor: '#fff',
    paddingTop: TOP_PADDING + 40,
  },
  drawerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3B82E6',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  drawerIcon: {
    fontSize: 22,
    marginRight: 16,
  },
  drawerLabel: {
    fontSize: 18,
    color: '#1F2A44',
  },
});