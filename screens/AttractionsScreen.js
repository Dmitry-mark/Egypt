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

  // Example data for attractions
  const attractions = [
    { 
      id: '1', 
      name: 'Pyramids of Giza', 
      description: 'Majestic pyramids of ancient Egypt.', 
      image: require('../assets/pyramid.png') 
    },
    { 
      id: '2', 
      name: 'Sphinx', 
      description: 'Mysterious statue with a lion\'s head.', 
      image: require('../assets/sphinx.png') 
    },
    { 
      id: '3', 
      name: 'Karnak Temple', 
      description: 'One of the largest temple complexes in the world.', 
      image: require('../assets/temple.png') 
    },
    { 
      id: '4', 
      name: 'Valley of the Kings', 
      description: 'The burial site of pharaohs.', 
      image: require('../assets/valley.png') 
    },
    // Additional attractions
    { 
      id: '5', 
      name: 'Abu Simbel Temples', 
      description: 'Magnificent rock-cut temples built by Ramses II.', 
      image: require('../assets/abu.png') 
    },
    { 
      id: '6', 
      name: 'Egyptian Museum', 
      description: 'Home to an extensive collection of ancient Egyptian antiquities.', 
      image: require('../assets/museum.png') 
    },
    { 
      id: '7', 
      name: 'Temple of Hatshepsut', 
      description: 'An architecturally unique mortuary temple dedicated to Queen Hatshepsut.', 
      image: require('../assets/hat.png') 
    },
    { 
      id: '8', 
      name: 'Bibliotheca Alexandrina', 
      description: 'A modern library and cultural center in Alexandria.', 
      image: require('../assets/bibl.png') 
    },
    { 
      id: '9', 
      name: 'Siwa Oasis', 
      description: 'A serene oasis known for its natural springs and unique culture.', 
      image: require('../assets/siwa.png') 
    },
    { 
      id: '10', 
      name: 'Mount Sinai', 
      description: 'A historic mountain considered sacred in several religions.', 
      image: require('../assets/mount.png') 
    },
  ];

  // Filter attractions by search query
  const filteredAttractions = attractions.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Add or remove attraction from favorites
  const toggleFavorite = (item) => {
    if (favorites.some(fav => fav.id === item.id)) {
      setFavorites(favorites.filter(fav => fav.id !== item.id));
    } else {
      setFavorites([...favorites, item]);
    }
  };

  // Remove attraction from favorites
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
        {/* Search bar with styling */}
        <TextInput 
          style={styles.searchBar}
          placeholder="Search attractions..."
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {/* Favorites: horizontal scroll with small icons */}
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

        {/* Main list of cards */}
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
            <Text style={styles.notFoundText}>No attractions found</Text>
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

    // Shadow (iOS)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,

    // Shadow (Android)
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
