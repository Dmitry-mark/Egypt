import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  ImageBackground, 
  TextInput 
} from 'react-native';

function AttractionsScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);

  // Пример данных о достопримечательностях
  const attractions = [
    { 
      id: '1', 
      name: 'Пирамиды Гизы', 
      description: 'Величественные пирамиды древнего Египта.', 
      image: require('../assets/pyramid.png') 
    },
    { 
      id: '2', 
      name: 'Сфинкс', 
      description: 'Таинственная статуя с львиной головой.', 
      image: require('../assets/sphinx.png') 
    },
    { 
      id: '3', 
      name: 'Храм Карнак', 
      description: 'Один из крупнейших храмовых комплексов в мире.', 
      image: require('../assets/temple.png') 
    },
    { 
      id: '4', 
      name: 'Долина Царей', 
      description: 'Место захоронения фараонов.', 
      image: require('../assets/valley.png') 
    },
  ];

  // Фильтрация достопримечательностей по запросу
  const filteredAttractions = attractions.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Добавление/удаление карточки в избранное
  const toggleFavorite = (item) => {
    if (favorites.some(fav => fav.id === item.id)) {
      setFavorites(favorites.filter(fav => fav.id !== item.id));
    } else {
      setFavorites([...favorites, item]);
    }
  };

  // Удаление из избранного
  const removeFavorite = (item) => {
    setFavorites(favorites.filter(fav => fav.id !== item.id));
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
        {/* Строка поиска со стилизацией */}
        <TextInput 
          style={styles.searchBar}
          placeholder="Поиск достопримечательностей..."
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {/* Избранное: горизонтальный скролл с маленькими иконками */}
        {favorites.length > 0 && (
          <ScrollView 
            horizontal 
            style={styles.favoritesContainer}
            contentContainerStyle={styles.favoritesContent}
          >
            {favorites.map(item => (
              <View key={item.id} style={styles.favoriteItem}>
                <Image 
                  source={item.image} 
                  style={styles.favoriteImage} 
                  resizeMode="cover" 
                />
                <TouchableOpacity 
                  style={styles.removeFavoriteButton} 
                  onPress={() => removeFavorite(item)}
                >
                  <Text style={styles.removeFavoriteText}>✕</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        )}

        {/* Основной список карточек */}
        <ScrollView contentContainerStyle={styles.cardsContainer}>
          {filteredAttractions.length > 0 ? (
            filteredAttractions.map(item => (
              <View key={item.id} style={styles.card}>
                <Image 
                  source={item.image} 
                  style={styles.cardImage} 
                  resizeMode="cover" 
                />
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <Text style={styles.cardDescription}>{item.description}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.favoriteIcon} 
                  onPress={() => toggleFavorite(item)}
                >
                  <Text style={styles.favoriteIconText}>
                    {favorites.some(fav => fav.id === item.id) ? '❤️' : '🤍'}
                  </Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={styles.notFoundText}>По запросу ничего не найдено</Text>
          )}
        </ScrollView>
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
  searchBar: {
    marginTop: 100,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    color: '#000',

    // Тень (iOS)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,

    // Тень (Android)
    elevation: 5,
  },
  favoritesContainer: {
    maxHeight: 100,
    marginBottom: 10,
  },
  favoritesContent: {
    alignItems: 'center',
  },
  favoriteItem: {
    width: 80,
    height: 80,
    marginRight: 10,
    position: 'relative',
    // Чтобы крестик не обрезался, разрешаем контент выходить за границы
    overflow: 'visible',
  },
  favoriteImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  removeFavoriteButton: {
    position: 'absolute',
    top: 8,
    right: -7,
    backgroundColor: 'rgba(255,0,0,0.8)',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeFavoriteText: {
    color: '#fff',
    fontSize: 16,
  },
  cardsContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden',
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: 150,
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#fff',
  },
  cardDescription: {
    fontSize: 14,
    color: '#eee',
  },
  favoriteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  favoriteIconText: {
    fontSize: 24,
  },
  notFoundText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#fff',
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

export default AttractionsScreen;
