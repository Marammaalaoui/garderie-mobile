import { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(onFinish, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/garderie.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Ma Garderie</Text>
      <Text style={styles.subtitle}>Bienvenue</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9EE',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  image: {
    width: 280,
    height: 280,
    marginBottom: 24,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#F2705B',
  },
  subtitle: {
    fontSize: 22,
    color: '#3B4A6B',
    marginTop: 8,
  },
});