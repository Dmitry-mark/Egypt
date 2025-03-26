import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Button, 
  Alert, 
  ImageBackground, 
  Image 
} from 'react-native';
import LottieView from 'lottie-react-native';

export default function QuizScreen() {
  const question = "Какая река является самой длинной в Египте?";
  const answers = [
    { id: 1, text: "Нил", correct: true },
    { id: 2, text: "Амазонка", correct: false },
    { id: 3, text: "Миссисипи", correct: false },
  ];
  const [selected, setSelected] = useState(null);

  const handleAnswer = (answer) => {
    setSelected(answer.id);
    if (answer.correct) {
      Alert.alert("Правильно!", "Вы выбрали верный ответ.");
    } else {
      Alert.alert("Неправильно", "Попробуйте еще раз.");
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/egypt4.png')}
        style={styles.background}
      >
        {/* Логотип сверху */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/Pyramidoria.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Анимация в центре */}
        <View style={styles.animationContainer}>
          <LottieView
            source={require('../assets/Animation.json')}
            autoPlay
            loop
            style={styles.animation}
          />
        </View>

        {/* Контейнер для контента викторины */}
        <View style={styles.quizContainer}>
          {/* Изображение внутри контейнера с вопросом */}
          <Image
            source={require('../assets/egyptQuiz.png')}
            style={styles.quizImage}
            resizeMode="contain"
          />
          <Text style={styles.question}>{question}</Text>
          {answers.map((answer) => (
            <View key={answer.id} style={styles.buttonContainer}>
              <Button 
                title={answer.text}
                onPress={() => handleAnswer(answer)}
              />
            </View>
          ))}
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
  quizContainer: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  quizImage: {
    width: '100%',
    height: 150,
    marginBottom: 10,
  },
  question: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    marginVertical: 10,
  },
});
