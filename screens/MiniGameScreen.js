import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions, 
  TouchableOpacity, 
  Image, 
  Button 
} from 'react-native';

export default function MiniGameScreen() {
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  const elementWidth = 100;
  const elementHeight = 100;

  // Функция для установки случайного положения игрового элемента
  const moveElement = () => {
    const maxX = screenWidth - elementWidth;
    // Отнимаем 100, чтобы учесть область с текстовой информацией (таймер/счёт)
    const maxY = screenHeight - elementHeight - 100; 
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;
    setPosition({ x, y });
  };

  // Устанавливаем начальное положение при загрузке экрана
  useEffect(() => {
    moveElement();
  }, []);

  // Таймер, который каждую секунду уменьшает оставшееся время
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Обработчик нажатия на элемент
  const handleTap = () => {
    setScore(prev => prev + 1);
    moveElement();
  };

  // Функция для перезапуска игры
  const handleRestart = () => {
    setScore(0);
    setTimer(30);
    moveElement();
  };

  // Если время вышло, отображаем экран окончания игры
  if (timer === 0) {
    return (
      <View style={styles.gameOverContainer}>
        <Text style={styles.gameOverText}>Игра окончена!</Text>
        <Text style={styles.gameOverText}>Ваш счёт: {score}</Text>
        <Button title="Начать заново" onPress={handleRestart} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>Осталось: {timer} сек</Text>
      <Text style={styles.score}>Счёт: {score}</Text>
      <TouchableOpacity 
        onPress={handleTap} 
        style={[styles.gameElement, { top: position.y, left: position.x }]}
      >
        <Image 
          source={require('../assets/treasure.png')}
          style={{ width: elementWidth, height: elementHeight }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcebb6', // теплый оттенок для египетской тематики
  },
  timer: {
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
  },
  score: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  gameElement: {
    position: 'absolute',
  },
  gameOverContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameOverText: {
    fontSize: 24,
    marginBottom: 20,
  },
});
