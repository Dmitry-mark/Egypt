import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  Button, 
  Dimensions 
} from 'react-native';

// Функция генерации пирамиды для заданного уровня.
// Для уровня 1 создаётся пирамида из 3 строк (3, 2, 1 ячейки),
// для уровня 2 – из 4 строк, для уровня 3 – из 5 строк и т.д.
function generatePyramidForLevel(level) {
  const rows = level + 2;
  const pyramid = [];
  for (let i = 0; i < rows; i++) {
    pyramid.push(Array(rows - i).fill(null));
  }
  return pyramid;
}

function PyramidBuilderChallenge() {
  const maxLevel = 10; // максимальный уровень
  const allowedMistakes = 3; // допускается 3 ошибки
  
  const [level, setLevel] = useState(1);
  const [pyramid, setPyramid] = useState(generatePyramidForLevel(1));
  const [timer, setTimer] = useState(60); // 60 секунд на уровень
  const [mistakes, setMistakes] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const [record, setRecord] = useState(0);

  // Получаем ширину экрана для динамического расчета размера ячеек
  const { width: screenWidth } = Dimensions.get('window');
  const availableWidth = screenWidth - 40; // отступы по 20 с каждой стороны
  const rows = pyramid.length; // верхняя строка содержит (level+2) ячеек
  const cellMargin = 5;
  const cellSize = (availableWidth - (rows + 1) * cellMargin) / rows;

  // Обработка нажатия на ячейку
  const handleCellPress = (originalRowIndex, colIndex) => {
    if (pyramid[originalRowIndex][colIndex] === null) {
      const newPyramid = pyramid.map(row => [...row]);
      newPyramid[originalRowIndex][colIndex] = 'block';
      setPyramid(newPyramid);
    } else {
      // Если ячейка уже заполнена — засчитываем ошибку
      setMistakes(prev => {
        const newMistakes = prev + 1;
        if (newMistakes >= allowedMistakes) {
          setGameOver(true);
        }
        return newMistakes;
      });
    }
  };

  // Проверяем, заполнена ли пирамида полностью
  const isComplete = pyramid.every(row => row.every(cell => cell !== null));

  // Таймер: уменьшаем время каждую секунду, если уровень не завершён
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

  // Расчет очков за уровень: (общее число ячеек * 10) + (оставшееся время * 2) – (ошибки * 5)
  const calculateLevelPoints = () => {
    const totalCells = pyramid.reduce((sum, row) => sum + row.length, 0);
    const levelPoints = totalCells * 10 + timer * 2 - mistakes * 5;
    return levelPoints > 0 ? levelPoints : 0;
  };

  // Переход на следующий уровень
  const handleNextLevel = () => {
    const levelPoints = calculateLevelPoints();
    const newTotal = totalPoints + levelPoints;
    setTotalPoints(newTotal);

    if (newTotal > record) {
      setRecord(newTotal);
    }

    if (level < maxLevel) {
      const nextLevel = level + 1;
      setLevel(nextLevel);
      setPyramid(generatePyramidForLevel(nextLevel));
      setTimer(60);
      setMistakes(0);
    } else {
      // Если достигнут максимальный уровень, игра завершается победой
      setGameOver(true);
    }
  };

  // Перезапуск игры
  const handleRestart = () => {
    setLevel(1);
    setPyramid(generatePyramidForLevel(1));
    setTimer(60);
    setMistakes(0);
    setTotalPoints(0);
    setGameOver(false);
  };

  // Если пирамида построена и игрок прошёл максимальный уровень
  if (gameOver && isComplete && level === maxLevel) {
    return (
      <View style={styles.gameOverContainer}>
        <Text style={styles.gameOverText}>Поздравляем! Вы прошли все уровни!</Text>
        <Text style={styles.gameOverText}>
          Ваш итоговый счёт: {totalPoints + calculateLevelPoints()}
        </Text>
        {(totalPoints + calculateLevelPoints()) > record && (
          <Text style={styles.gameOverText}>Новый рекорд!</Text>
        )}
        <Button title="Начать заново" onPress={handleRestart} />
      </View>
    );
  }

  // Экран Game Over (если время вышло или слишком много ошибок)
  if (gameOver) {
    return (
      <View style={styles.gameOverContainer}>
        <Text style={styles.gameOverText}>
          {timer === 0 ? 'Время вышло!' : 'Слишком много ошибок!'}
        </Text>
        <Text style={styles.gameOverText}>Вы достигли уровня: {level}</Text>
        <Text style={styles.gameOverText}>Ваш итоговый счёт: {totalPoints}</Text>
        <Button title="Начать заново" onPress={handleRestart} />
      </View>
    );
  }

  // Если уровень завершён, но не максимальный
  if (isComplete) {
    return (
      <View style={styles.levelCompleteContainer}>
        <Text style={styles.levelCompleteText}>Уровень {level} пройден!</Text>
        <Text style={styles.levelCompleteText}>
          Очки за уровень: {calculateLevelPoints()}
        </Text>
        <Button title="Далее" onPress={handleNextLevel} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header с рекордом и общим счётом */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Рекорд: {record}</Text>
        <Text style={styles.headerText}>Счёт: {totalPoints}</Text>
      </View>
      {/* Центральный контейнер с контентом */}
      <View style={styles.content}>
        <Text style={styles.headerTitle}>Построй пирамиду</Text>
        <Text style={styles.info}>
          Уровень: {level} | Время: {timer} сек | Ошибки: {mistakes}/{allowedMistakes}
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
        <Text style={styles.instructions}>
          Нажмите на пустую ячейку, чтобы поставить блок
        </Text>
      </View>
    </View>
  );
}

const cellMargin = 5; // отступ между ячейками

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcebb6',
  },
  header: {
    position: 'absolute',
    top: 100,
    width: '100%',
    padding: 10,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60, // пространство для header
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  info: {
    fontSize: 20,
    marginBottom: 20,
    color: '#333',
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
    borderWidth: 2,
    borderColor: '#333',
    backgroundColor: 'rgba(255,255,255,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  block: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  instructions: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
  },
  levelCompleteContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  levelCompleteText: {
    fontSize: 24,
    marginBottom: 20,
    color: '#333',
  },
  gameOverContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  gameOverText: {
    fontSize: 24,
    marginBottom: 10,
    color: '#333',
  },
});

export default PyramidBuilderChallenge;
