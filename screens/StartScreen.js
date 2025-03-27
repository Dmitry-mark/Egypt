import React from 'react';
import { StyleSheet, View, ImageBackground, Image, TouchableOpacity } from 'react-native';
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
            source={require('../assets/Pyramidoria.gif')}
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
          {/* Mini Game button */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('MiniGameScreen')}
          >
            <Image
              source={require('../assets/Mini-game.png')}
              style={styles.buttonImage}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {/* Quiz button */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('QuizStartScreen')}
          >
            <Image
              source={require('../assets/quiz.png')}
              style={styles.buttonImage}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {/* Attractions button */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('AttractionsScreen')}
          >
            <Image
              source={require('../assets/Attractions.png')}
              style={styles.buttonImage}
              resizeMode="contain"
            />
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
    top: 150,
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
    transform: [{ translateY: -100 }],
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
  buttonImage: {
    width: 200,
    height: 40,
  },
});

export default StartScreen;
