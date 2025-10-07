import React, { useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ImageBackground, 
  Image, 
  TouchableOpacity, 
  Animated,
  Dimensions 
} from 'react-native';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

function StartScreen({ navigation }) {
  // Анимационные значения только для элементов
  const titleAnim = useRef(new Animated.Value(0)).current;
  const buttonAnim1 = useRef(new Animated.Value(0)).current;
  const buttonAnim2 = useRef(new Animated.Value(0)).current;
  const buttonAnim3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Анимация заголовка
    Animated.timing(titleAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    // Последовательная анимация кнопок
    Animated.sequence([
      Animated.delay(500),
      Animated.timing(buttonAnim1, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.delay(200),
      Animated.timing(buttonAnim2, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.delay(200),
      Animated.timing(buttonAnim3, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleButtonPress = (buttonAnim, navigateTo) => {
    // Анимация нажатия кнопки
    Animated.sequence([
      Animated.timing(buttonAnim, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.navigate(navigateTo);
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/egypt4.png')}
        style={styles.background}
      >
        {/* Анимированный заголовок */}
        <Animated.View 
          style={[
            styles.titleContainer,
            {
              opacity: titleAnim,
              transform: [
                { 
                  translateY: titleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-100, 0],
                  }) 
                }
              ]
            }
          ]}
        >
          <Text style={styles.title}>DESERT ORACLE</Text>
          <Text style={styles.subtitle}>Ancient Egypt Adventure</Text>
        </Animated.View>

        {/* Lottie animation - статичная позиция */}
        <View style={styles.animationContainer}>
          <LottieView
            source={require('../assets/Animation.json')}
            autoPlay
            loop
            style={styles.animation}
          />
        </View>

        {/* Анимированные кнопки */}
        <View style={styles.buttonWrapper}>
          {/* Mini Game button */}
          <Animated.View
            style={{
              opacity: buttonAnim1,
              transform: [
                { 
                  translateY: buttonAnim1.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  }) 
                }
              ]
            }}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleButtonPress(buttonAnim1, 'MiniGameScreen')}
              activeOpacity={0.7}
            >
              <Image
                source={require('../assets/Mini-game.png')}
                style={styles.buttonImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </Animated.View>

          {/* Quiz button */}
          <Animated.View
            style={{
              opacity: buttonAnim2,
              transform: [
                { 
                  translateY: buttonAnim2.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  }) 
                }
              ]
            }}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleButtonPress(buttonAnim2, 'QuizStartScreen')}
              activeOpacity={0.7}
            >
              <Image
                source={require('../assets/quiz.png')}
                style={styles.buttonImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </Animated.View>

          {/* Attractions button */}
          <Animated.View
            style={{
              opacity: buttonAnim3,
              transform: [
                { 
                  translateY: buttonAnim3.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  }) 
                }
              ]
            }}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleButtonPress(buttonAnim3, 'AttractionsScreen')}
              activeOpacity={0.7}
            >
              <Image
                source={require('../assets/Attractions.png')}
                style={styles.buttonImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </Animated.View>
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
  titleContainer: {
    height: height * 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingTop: 40,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFD700',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 10,
    letterSpacing: 4,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '300',
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  animationContainer: {
    position: 'absolute',
    top: '40%',
    left: 0,
    right: 0,
    alignItems: 'center',
    transform: [{ translateY: -175 }],
  },
  animation: {
    width: 300,
    height: 300,
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: height * 0.1,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'rgba(205, 127, 50, 0.8)',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 8,
    width: width * 0.7,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  buttonImage: {
    width: 200,
    height: 40,
  },
});

export default StartScreen;