import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  Dimensions,
  ImageBackground,
  Alert 
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

// Функция для генерации пирамиды для заданного уровня.
function generatePyramidForLevel(level) {
  const rows = level + 2;
  const pyramid = [];
  for (let i = 0; i < rows; i++) {
    pyramid.push(Array(rows - i).fill(null));
  }
  return pyramid;
}

function PyramidBuilderChallenge({ navigation }) {
  const isFocused = useIsFocused();
  
  const maxLevel = 10; // максимальный уровень
  const allowedMistakes = 3; // допустимое количество ошибок
  
  // Получаем ширину экрана для динамического расчёта размера ячеек
  const { width: screenWidth } = Dimensions.get('window');
  const availableWidth = screenWidth - 40; // отступы по 20 с каждой стороны
  const cellMargin = 5;
  
  // Начальные состояния
  const [level, setLevel] = useState(1);
  const [pyramid, setPyramid] = useState(generatePyramidForLevel(1));
  const [timer, setTimer] = useState(60); // 60 секунд на уровень
  const [mistakes, setMistakes] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const [record, setRecord] = useState(0);
  
  // Флаги, чтобы избежать повторных вызовов Alert
  const [levelAlertShown, setLevelAlertShown] = useState(false);
  const [gameOverAlertShown, setGameOverAlertShown] = useState(false);
  
  // Количество ячеек в верхней строке
  const rowsCount = pyramid.length;
  const cellSize = (availableWidth - (rowsCount + 1) * cellMargin) / rowsCount;

  // Обработка нажатия на ячейку: если ячейка пустая – ставим блок, иначе считаем ошибку.
  const handleCellPress = (originalRowIndex, colIndex) => {
    if (pyramid[originalRowIndex][colIndex] === null) {
      const newPyramid = pyramid.map(row => [...row]);
      newPyramid[originalRowIndex][colIndex] = 'block';
      setPyramid(newPyramid);
    } else {
      setMistakes(prev => {
        const newMistakes = prev + 1;
        if (newMistakes >= allowedMistakes) {
          setGameOver(true);
        }
        return newMistakes;
      });
    }
  };

  // Проверка: собрана ли пирамида полностью.
  const isComplete = pyramid.every(row => row.every(cell => cell !== null));

  // Таймер: уменьшаем каждую секунду, если уровень не завершён.
  useEffect(() => {
    if (timer > 0 && !gameOver && !isComplete) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setGameOver(true);
    }
  }, [timer, gameOver, isComplete]);

  // Расчёт очков уровня: (кол-во ячеек * 10) + (оставшееся время * 2) - (ошибки * 5)
  const calculateLevelPoints = () => {
    const totalCells = pyramid.reduce((sum, row) => sum + row.length, 0);
    const levelPoints = totalCells * 10 + timer * 2 - mistakes * 5;
    return levelPoints > 0 ? levelPoints : 0;
  };

  // Переход на следующий уровень.
  const handleNextLevel = () => {
    const levelPoints = calculateLevelPoints();
    const newTotal = totalPoints + levelPoints;
    setTotalPoints(newTotal);
    if (newTotal > record) {
      setRecord(newTotal);
    }
    setLevel(prev => prev + 1);
    setPyramid(generatePyramidForLevel(level + 1));
    setTimer(60);
    setMistakes(0);
    setLevelAlertShown(false);
  };

  // Перезапуск игры.
  const handleRestart = () => {
    setLevel(1);
    setPyramid(generatePyramidForLevel(1));
    setTimer(60);
    setMistakes(0);
    setTotalPoints(0);
    setGameOver(false);
    setLevelAlertShown(false);
    setGameOverAlertShown(false);
  };

  // Выводим Alert при завершении уровня (только если экран активен)
  useEffect(() => {
    if (isFocused && isComplete && !levelAlertShown) {
      setLevelAlertShown(true);
      if (level < maxLevel) {
        Alert.alert(
          'Level Completed!',
          `Level Points: ${calculateLevelPoints()}`,
          [{ text: 'Next', onPress: handleNextLevel }]
        );
      } else {
        Alert.alert(
          'Congratulations!',
          `You completed all levels!\nYour Final Score: ${totalPoints + calculateLevelPoints()}\n${(totalPoints + calculateLevelPoints()) > record ? 'New Record!' : ''}`,
          [{ text: 'Restart', onPress: handleRestart }]
        );
      }
    }
  }, [isComplete, levelAlertShown, isFocused]);

  // Выводим Alert для Game Over (только если экран активен)
  useEffect(() => {
    if (isFocused && gameOver && !isComplete && !gameOverAlertShown) {
      setGameOverAlertShown(true);
      Alert.alert(
        'Game Over!',
        `${timer === 0 ? "Time's Up!" : "Too Many Mistakes!"}\nYou reached Level: ${level}\nYour Final Score: ${totalPoints}`,
        [{ text: 'Restart', onPress: handleRestart }]
      );
    }
  }, [gameOver, gameOverAlertShown, timer, level, totalPoints, isComplete, isFocused]);

  // Основной рендер – всё обёрнуто в ImageBackground, чтобы фон был виден.
  return (
    <ImageBackground 
      source={require('../assets/egypt4.png')} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Заголовок с рекордом и общими очками */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Record: {record}</Text>
          <Text style={styles.headerText}>Score: {totalPoints}</Text>
        </View>
        
        {/* Анимация Lottie */}
        <View style={styles.animationContainer}>
          <LottieView
            source={require('../assets/Animation.json')}
            autoPlay
            loop
            style={styles.animation}
          />
        </View>
        
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('StartScreen')}
        >
          <Text style={styles.menuButtonText}>Menu</Text>
        </TouchableOpacity>
        
        {/* Основной контент */}
        <View style={styles.content}>
          <Text style={styles.headerTitle}>Build the Pyramid</Text>
          <Text style={styles.info}>
            Level: {level} | Time: {timer} sec | Mistakes: {mistakes}/{allowedMistakes}
          </Text>
          <View style={styles.pyramidContainer}>
            {pyramid.slice().reverse().map((row, revRowIndex) => {
              const originalRowIndex = pyramid.length - 1 - revRowIndex;
              return (
                <View key={revRowIndex} style={styles.row}>
                  {row.map((cell, colIndex) => (
                    <TouchableOpacity
                      key={colIndex}
                      style={[
                        styles.cell,
                        { width: cellSize, height: cellSize, marginHorizontal: cellMargin }
                      ]}
                      onPress={() => handleCellPress(originalRowIndex, colIndex)}
                    >
                      {cell && (
                        <Image 
                          source={require('../assets/block.png')}
                          style={styles.block}
                          resizeMode="cover"
                        />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              );
            })}
          </View>
          <Text style={styles.instructions}>Tap on an empty cell to place a block</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    // Убираем фон, чтобы не заслонять ImageBackground
    backgroundColor: 'transparent',
  },
  header: {
    position: 'absolute',
    top: 100,
    width: '100%',
    padding: 10,
    alignItems: 'center',
    zIndex: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
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
  menuButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 10,
    zIndex: 11,
  },
  menuButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  info: {
    fontSize: 20,
    marginBottom: 20,
    color: '#fff',
  },
  pyramidContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  cell: {
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  block: {
    flex: 1,
    width: '160%',
    height: '100%',
  },
  instructions: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
  },
});

export default PyramidBuilderChallenge;
