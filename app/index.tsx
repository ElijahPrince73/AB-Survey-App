import { router } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Logo from '../assets/images/Anheuser-Busch-Logo.png';

export default function Index() {
  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoSection}>
        <Image source={Logo} style={styles.logo} resizeMode="contain" />
      </View>
      {/* Text Section */}
      <View style={styles.textSection}>
        <Text style={styles.title}>Welcome to the Anheuser-Busch Survey!</Text>
        <Text style={styles.subtitle}>
          We value your feedback and appreciate your time in providing valuable
          insights to help us improve our services.
        </Text>
      </View>
      {/* Button Section */}
      <View style={styles.buttonSection}>
        <Pressable style={styles.button} onPress={() => router.push('/login')}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 80,
    backgroundColor: '#F5F5F5',
  },
  logoSection: {
    alignItems: 'center',
  },
  logo: {
    width: 180,
    height: 120,
  },
  textSection: {
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5,
  },
  buttonSection: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#E5B611',
    paddingVertical: 16,
    paddingHorizontal: 50,
    borderRadius: 8,
  },
  buttonText: {
    fontWeight: '700',
    fontSize: 16,
  },
});
