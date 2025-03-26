import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Button, 
  Alert, 
  ImageBackground, 
  Image,
  TouchableOpacity 
} from 'react-native';
import LottieView from 'lottie-react-native';

// Array of quiz questions with images for each question
const quizQuestions = [
  {
    id: '1',
    question: "Which river is the longest in Egypt?",
    image: require('../assets/question1.png'),
    answers: [
      { id: '1', text: "Nile", correct: true },
      { id: '2', text: "Amazon", correct: false },
      { id: '3', text: "Mississippi", correct: false },
    ]
  },
  {
    id: '2',
    question: "Which city is the capital of Egypt?",
    image: require('../assets/question2.png'),
    answers: [
      { id: '1', text: "Alexandria", correct: false },
      { id: '2', text: "Cairo", correct: true },
      { id: '3', text: "Luxor", correct: false },
    ]
  },
  {
    id: '3',
    question: "Who was the first pharaoh of unified Egypt?",
    image: require('../assets/question3.png'),
    answers: [
      { id: '1', text: "Tutankhamun", correct: false },
      { id: '2', text: "Ramses II", correct: false },
      { id: '3', text: "Menes", correct: true },
    ]
  },
  {
    id: '4',
    question: "Which of these structures is listed among the wonders of the ancient world?",
    image: require('../assets/question4.png'),
    answers: [
      { id: '1', text: "Great Sphinx", correct: false },
      { id: '2', text: "Karnak Temple", correct: false },
      { id: '3', text: "Great Pyramid of Khufu", correct: true },
    ]
  },
  {
    id: '5',
    question: "What was the ancient Egyptian writing system called?",
    image: require('../assets/question5.png'),
    answers: [
      { id: '1', text: "Arabic", correct: false },
      { id: '2', text: "Hieroglyphics", correct: true },
      { id: '3', text: "Coptic", correct: false },
    ]
  },
  {
    id: '6',
    question: "Which of these structures is located in Giza?",
    image: require('../assets/question6.png'),
    answers: [
      { id: '1', text: "The Pyramids of Giza", correct: true },
      { id: '2', text: "Karnak Temple", correct: false },
      { id: '3', text: "Valley of the Kings", correct: false },
    ]
  },
  {
    id: '7',
    question: "Which ancient Egyptian god was depicted with a falcon's head?",
    image: require('../assets/question7.png'),
    answers: [
      { id: '1', text: "Osiris", correct: false },
      { id: '2', text: "Horus", correct: true },
      { id: '3', text: "Anubis", correct: false },
    ]
  },
  {
    id: '8',
    question: "Which location was considered the burial place of the pharaohs?",
    image: require('../assets/question8.png'),
    answers: [
      { id: '1', text: "Alexandria", correct: false },
      { id: '2', text: "Cairo", correct: false },
      { id: '3', text: "Valley of the Kings", correct: true },
    ]
  },
  {
    id: '9',
    question: "Which of these structures belongs to the New Kingdom period?",
    image: require('../assets/question9.png'),
    answers: [
      { id: '1', text: "Karnak Temple", correct: true },
      { id: '2', text: "Great Pyramid of Khufu", correct: false },
      { id: '3', text: "Great Sphinx", correct: false },
    ]
  },
  {
    id: '10',
    question: "Which symbol in ancient Egyptian culture represented eternal life?",
    image: require('../assets/question10.png'),
    answers: [
      { id: '1', text: "Wadjet", correct: false },
      { id: '2', text: "Ankh", correct: true },
      { id: '3', text: "Scarab", correct: false },
    ]
  },
];

function QuizScreen({ navigation }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleAnswer = (answer) => {
    if (answer.correct) {
      setScore(score + 1);
    }
    if (currentQuestionIndex < quizQuestions.length - 1) {
      Alert.alert(
        answer.correct ? "Correct!" : "Incorrect",
        answer.correct ? "You selected the correct answer." : "Try again.",
        [
          {
            text: "OK",
            onPress: () => {
              setCurrentQuestionIndex(currentQuestionIndex + 1);
            }
          }
        ]
      );
    } else {
      // Last question: show the final score and navigate to the start screen
      Alert.alert(
        "Quiz Over",
        `Your score: ${score + (answer.correct ? 1 : 0)}`,
        [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("QuizStartScreen");
            }
          }
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('../assets/egypt4.png')}
        style={styles.background}
      >
         <TouchableOpacity
                  style={styles.menuButton}
                  onPress={() => navigation.navigate('StartScreen')}
                >
                  <Text style={styles.menuButtonText}>Menu</Text>
                </TouchableOpacity>
        {/* Background Lottie animation */}
        <View style={styles.animationContainer}>
          <LottieView
            source={require('../assets/Animation.json')}
            autoPlay
            loop
            style={styles.animation}
          />
        </View>
        {/* Centered container with question, image, and buttons */}
        <View style={styles.quizContainer}>
          {/* Image associated with the current question */}
          <Image
            source={currentQuestion.image}
            style={styles.questionImage}
            resizeMode="contain"
          />
          <Text style={styles.question}>{currentQuestion.question}</Text>
          {currentQuestion.answers.map((answer) => (
            <View key={answer.id} style={styles.buttonContainer}>
              <Button 
                title={answer.text}
                onPress={() => handleAnswer(answer)}
              />
            </View>
          ))}
          <Text style={styles.progressText}>
            Question {currentQuestionIndex + 1} of {quizQuestions.length}
          </Text>
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
    // Center the content both vertically and horizontally
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
  },
  animation: {
    width: 350,
    height: 350,
  },
  quizContainer: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    width: '90%',
  },
  questionImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  question: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    marginVertical: 10,
    width: '100%',
  },
  progressText: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
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

export default QuizScreen;
