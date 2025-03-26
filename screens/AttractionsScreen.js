import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  TextInput 
} from 'react-native';

export default function AttractionsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);

  // Пример данных о достопримечательностях
  const attractions = [
    { 
      id: '1', 
      name: 'Пирамиды Гизы', 
      description: 'Величественные пирамиды древнего Египта.', 
      image: require('../assets/pyramid.jpg') 
    },
    { 
      id: '2', 
      name: 'Сфинкс', 
      description: 'Таинственная статуя с львиной головой.', 
      image: require('../assets/sphinx.jpg') 
    },
    { 
      id: '3', 
      name: 'Храм Карнак', 
      description: 'Один из крупнейших храмовых комплексов в мире.', 
      image: require('../assets/temple.jpg') 
    },
    { 
      id: '4', 
      name: 'Долина Царей', 
      description: 'Место захоронения фараонов.', 
      image: require('../assets/valley.jpg') 
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

  // Удаление из избранного (по нажатию на крестик)
  const removeFavorite = (item) => {
    setFavorites(favorites.filter(fav => fav.id !== item.id));
  };

  return (
    <View style={styles.container}>
      {/* Строка поиска */}
      <TextInput 
        style={styles.searchBar}
        placeholder="Поиск достопримечательностей..."
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  favoritesContainer: {
    maxHeight: 80,
    marginBottom: 10,
  },
  favoritesContent: {
    alignItems: 'center',
  },
  favoriteItem: {
    width: 70,
    height: 70,
    marginRight: 10,
    position: 'relative',
  },
  favoriteImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  removeFavoriteButton: {
    position: 'absolute',
    top: -5,
    right: -5,
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
    backgroundColor: '#f2f2f2',
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
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
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
    color: '#555',
  },
});
