import React from 'react';
import { StyleSheet, View, ImageBackground, Image, TouchableOpacity, Text } from 'react-native';
import LottieView from 'lottie-react-native';

function StartScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/egypt4.png')}
        style={styles.background}
      >
        {/* Logo at the top */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/Pyramidoria.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Lottie animation in the background */}
        <View style={styles.animationContainer}>
          <LottieView
            source={require('../assets/Animation.json')}
            autoPlay
            loop
            style={styles.animation}
          />
        </View>

        {/* Button container centered on the screen */}
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('MiniGameScreen')}
          >
            <Text style={styles.buttonText}>Mini Game</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('QuizStartScreen')}
          >
            <Text style={styles.buttonText}>Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('AttractionsScreen')}
          >
            <Text style={styles.buttonText}>Attractions</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  logoContainer: {
    position: 'absolute',
    top: 120,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  logo: {
    width: 375,
    height: 100,
  },
  animationContainer: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    alignItems: 'center',
    transform: [{ translateY: -175 }],
  },
  animation: {
    width: 350,
    height: 350,
  },
  buttonWrapper: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    alignItems: 'center',
    // Shift upward to center the container vertically
    transform: [{ translateY: -60 }],
  },
  button: {
    backgroundColor: 'rgba(0,0,0,0.5)', // semi-transparent background
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginVertical: 10,
    width: 300,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 25,
  },
});

export default StartScreen;
