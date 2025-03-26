import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';
import LottieView from 'lottie-react-native';

export default function QuizStartScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/egypt4.png')}
        style={styles.background}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Quiz</Text>
          <Button
            title="Start"
            onPress={() => navigation.navigate('QuizScreen')}
          />
        </View>
        <View style={styles.animationContainer}>
            <LottieView
                source={require('../assets/Animation.json')}
                autoPlay
                loop
                style={styles.animation}
            />
         </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // опционально, для затемнения фона
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
});
