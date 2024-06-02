import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const StarRating = ({ maxStars, rating, onStarPress }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= maxStars; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => onStarPress(i)}>
          <Ionicons
            name={i <= rating ? 'ios-star' : 'ios-star-outline'}
            size={30}
            color={i <= rating ? 'gold' : 'gray'}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return <View style={{ flexDirection: 'row' }}>{renderStars()}</View>;
};

export default StarRating;