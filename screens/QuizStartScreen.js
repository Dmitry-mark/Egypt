import React from 'react';
import { View, ImageBackground, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import LottieView from 'lottie-react-native';

function QuizStartScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/egypt4.png')}
        style={styles.background}
      >
        {/* Кнопка возврата в меню в левом верхнем углу */}
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('StartScreen')}
        >
          <Text style={styles.menuButtonText}>Menu</Text>
        </TouchableOpacity>

        {/* Lottie-анимация на заднем плане */}
        <View style={styles.animationContainer}>
          <LottieView
            source={require('../assets/Animation.json')}
            autoPlay
            loop
            style={styles.animation}
          />
        </View>
        
        {/* Контейнер с фото, поднятый наверх */}
        <View style={styles.photoContainer}>
          <Image
            source={require('../assets/egyptQuiz.png')}
            style={styles.quizImage}
            resizeMode="contain"
          />
          <Image
            source={require('../assets/Welcome.png')}
            style={styles.welcomeImage}
            resizeMode="contain"
          />
        </View>
        
        {/* Контейнер с кнопкой, расположенный по центру */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('QuizScreen')}
          >
            <Image
              source={require('../assets/start.png')}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  animationContainer: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    alignItems: 'center',
    transform: [{ translateY: -175 }],
    zIndex: 0,
  },
  animation: {
    width: 350,
    height: 350,
  },
  photoContainer: {
    position: 'absolute',
    top: 100, // Расположено в верхней части экрана
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1,
  },
  quizImage: {
    width: 300,
    height: 150,
  },
  welcomeImage: {
    width: 400,
    height: 80,
    marginTop: 10,
  },
  buttonContainer: {
    position: 'absolute',
    top: '50%', // Центрирован по вертикали
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1,
  },
  button: {
    backgroundColor: "rgba(0, 0, 0, 0.39)",
    borderRadius: 20,
  },
  buttonImage: {
    width: 300,
    height: 50,
  },
  menuButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 10,
    zIndex: 2,
  },
  menuButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default QuizStartScreen;
