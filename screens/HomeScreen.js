import { useRef, useState } from 'react';
import {
  Animated,
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

      {/* Espace réservé à la liste d'activités */}
      <View style={styles.content}>
        <Text style={styles.placeholder}>
          La liste des activités s'affichera ici
        </Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  placeholder: {
    fontSize: 16,
    color: '#6B7A99',
    textAlign: 'center',
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