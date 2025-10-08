import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import semua screen
import RuanganScreen from './ruangan';
import DokterScreen from './dokters';
import PasienScreen from './pasiens';

const { width, height } = Dimensions.get('window');

// Home Screen Component
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.scaleAnims = {
      dokter: new Animated.Value(1),
      pasien: new Animated.Value(1),
      ruangan: new Animated.Value(1),
    };
  }

  handlePressIn(key) {
    Animated.spring(this.scaleAnims[key], {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  }

  handlePressOut(key) {
    Animated.spring(this.scaleAnims[key], {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }

  render() {
    return (
      <ScrollView
        style={styles.homeContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.homeContentContainer}
      >
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Selamat Datang</Text>
          <Text style={styles.welcomeSubtitle}>Hospital Management System</Text>
          <Text style={styles.welcomeDescription}>
            Pilih menu untuk mengelola data rumah sakit
          </Text>
        </View>

        <View style={styles.menuGrid}>
          {/* Dokter Card */}
          <TouchableOpacity
            activeOpacity={1}
            onPressIn={() => this.handlePressIn('dokter')}
            onPressOut={() => this.handlePressOut('dokter')}
            onPress={() => this.props.onNavigate('dokter')}
          >
            <Animated.View
              style={[
                styles.menuCard,
                styles.dokterCard,
                { transform: [{ scale: this.scaleAnims.dokter }] },
              ]}
            >
              <View style={styles.iconCircle}>
                <Text style={styles.menuIcon}>👨‍⚕️</Text>
              </View>
              <Text style={styles.menuTitle}>Dokter</Text>
              <Text style={styles.menuDescription}>
                Kelola data dokter dan spesialisasi
              </Text>
              <View style={styles.arrowContainer}>
                <Text style={styles.arrow}>→</Text>
              </View>
            </Animated.View>
          </TouchableOpacity>

          {/* Pasien Card */}
          <TouchableOpacity
            activeOpacity={1}
            onPressIn={() => this.handlePressIn('pasien')}
            onPressOut={() => this.handlePressOut('pasien')}
            onPress={() => this.props.onNavigate('pasien')}
          >
            <Animated.View
              style={[
                styles.menuCard,
                styles.pasienCard,
                { transform: [{ scale: this.scaleAnims.pasien }] },
              ]}
            >
              <View style={styles.iconCircle}>
                <Text style={styles.menuIcon}>🤒</Text>
              </View>
              <Text style={styles.menuTitle}>Pasien</Text>
              <Text style={styles.menuDescription}>
                Kelola data pasien dan riwayat medis
              </Text>
              <View style={styles.arrowContainer}>
                <Text style={styles.arrow}>→</Text>
              </View>
            </Animated.View>
          </TouchableOpacity>

          {/* Ruangan Card */}
          <TouchableOpacity
            activeOpacity={1}
            onPressIn={() => this.handlePressIn('ruangan')}
            onPressOut={() => this.handlePressOut('ruangan')}
            onPress={() => this.props.onNavigate('ruangan')}
          >
            <Animated.View
              style={[
                styles.menuCard,
                styles.ruanganCard,
                { transform: [{ scale: this.scaleAnims.ruangan }] },
              ]}
            >
              <View style={styles.iconCircle}>
                <Text style={styles.menuIcon}>🏥</Text>
              </View>
              <Text style={styles.menuTitle}>Ruangan</Text>
              <Text style={styles.menuDescription}>
                Kelola ruangan dan ketersediaan
              </Text>
              <View style={styles.arrowContainer}>
                <Text style={styles.arrow}>→</Text>
              </View>
            </Animated.View>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2024 Hospital Management System
          </Text>
        </View>
      </ScrollView>
    );
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScreen: 'home',
    };
    this.fadeAnim = new Animated.Value(1);
  }

  handleNavigate = screen => {
    // Fade out animation
    Animated.timing(this.fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      this.setState({ currentScreen: screen }, () => {
        // Fade in animation
        Animated.timing(this.fadeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }).start();
      });
    });
  };

  handleBackToHome = () => {
    this.handleNavigate('home');
  };

  renderScreen() {
    switch (this.state.currentScreen) {
      case 'home':
        return <HomeScreen onNavigate={this.handleNavigate} />;
      case 'ruangan':
        return <RuanganScreen />;
      case 'dokter':
        return <DokterScreen />;
      case 'pasien':
        return <PasienScreen />;
      default:
        return <HomeScreen onNavigate={this.handleNavigate} />;
    }
  }

  render() {
    const isHome = this.state.currentScreen === 'home';

    return (
      <SafeAreaProvider>
        <View style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />

          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              {!isHome && (
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={this.handleBackToHome}
                  activeOpacity={0.7}
                >
                  <Text style={styles.backIcon}>←</Text>
                  <Text style={styles.backText}>Back to Home</Text>
                </TouchableOpacity>
              )}
              <Text style={styles.headerTitle}>Hospital</Text>
              <Text style={styles.headerSubtitle}>Management System</Text>
            </View>
          </View>

          {/* Content Screen with fade effect */}
          <Animated.View
            style={[styles.screenContainer, { opacity: this.fadeAnim }]}
          >
            {this.renderScreen()}
          </Animated.View>
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  header: {
    backgroundColor: '#1a1a2e',
    paddingTop: 50,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  headerContent: {
    paddingHorizontal: 24,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#a0a0c0',
    marginTop: 4,
    fontWeight: '500',
    letterSpacing: 1,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  backIcon: {
    fontSize: 20,
    color: '#00d4ff',
    marginRight: 8,
  },
  backText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  // Home Screen Styles
  homeContainer: {
    flex: 1,
  },
  homeContentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  welcomeSection: {
    marginTop: 20,
    marginBottom: 30,
    paddingHorizontal: 4,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#00d4ff',
    fontWeight: '600',
    marginBottom: 8,
  },
  welcomeDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  menuGrid: {
    marginBottom: 20,
  },
  menuCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    position: 'relative',
    overflow: 'hidden',
  },
  dokterCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  pasienCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  ruanganCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#f0f4f8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  menuIcon: {
    fontSize: 36,
  },
  menuTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 8,
  },
  menuDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  arrowContainer: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#00d4ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#999',
  },
});
