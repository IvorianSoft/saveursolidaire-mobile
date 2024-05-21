import React, {useEffect, useState} from 'react';

import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../config/colors';
import AppText from './AppText';
import Icon from './Icon';
import {
  isFavorite,
  removeFavorite,
  basketFavorite,
} from '../storage/FavoriteStorage';
import {COLORS, FONTS, icons, SIZES} from '../constants';

const Card = ({basket, navigation, currentLocation, categories}) => {
  const [iconName, setIconName] = useState(icons.starOutline);

  useEffect(() => {
    console.log(basket);
    async function fetchData() {
      const favorites = await isFavorite(basket);
      setIconName(favorites ? icons.star : icons.starOutline);
    }
    fetchData();
  });

  const addOrRemoveFavorite = async basket => {
    const isFavoriteBool = await isFavorite(basket);
    if (isFavoriteBool) {
      await removeFavorite(basket);
    } else {
      await basketFavorite(basket);
    }
    const isFavoriteBoolAfter = await isFavorite(basket);
    setIconName(isFavoriteBoolAfter ? icons.star : icons.starOutline);
  };

  function getCategoryNameById(id) {
    let category = categories.filter(a => a.id == id);

    if (category.length > 0) {
      return category[0].name;
    }

    return '';
  }

  return (
    <TouchableOpacity
      style={{marginBottom: SIZES.padding * 2}}
      onPress={() =>
        navigation.navigate('Details', {
          basket,
          currentLocation,
        })
      }>
      {/* Image */}
      <View
        style={{
          marginBottom: SIZES.padding,
        }}>
        <Image
          source={{uri: basket.image.url}}
          resizeMode="cover"
          style={{
            width: '100%',
            height: 200,
            borderRadius: SIZES.radius,
          }}
        />

        <View
          style={{
            position: 'absolute',
            bottom: 0,
            height: 50,
            width: SIZES.width * 0.3,
            backgroundColor: COLORS.white,
            borderTopRightRadius: SIZES.radius,
            borderBottomLeftRadius: SIZES.radius,
            alignItems: 'center',
            justifyContent: 'center',
            ...styles.shadow,
          }}>
          <Text style={{...FONTS.h4}}>{basket.price} XOF</Text>
        </View>

        <View
          style={{
            position: 'absolute',
            top: 5,
            right: 10,
            height: 20,
            backgroundColor:
              basket.quantity > 0 ? COLORS.lightGreen : COLORS.white,
            width: SIZES.width * 0.3,
            borderTopRightRadius: SIZES.radius,
            borderBottomLeftRadius: SIZES.radius,
            borderBottomRightRadius: SIZES.radius,
            borderTopLeftRadius: SIZES.radius,
            alignItems: 'center',
            justifyContent: 'center',
            ...styles.shadow,
          }}>
          <Text style={{...FONTS.body4}}>
            {basket.quantity} {basket.quantity > 1 ? 'baskets' : 'basket'}{' '}
            to save
          </Text>
        </View>
        <View
          style={{
            position: 'absolute',
            top: 5,
            left: 10,
            height: 40,
            width: 40,
            backgroundColor: COLORS.white,
            borderTopRightRadius: SIZES.radius,
            borderBottomLeftRadius: SIZES.radius,
            borderBottomRightRadius: SIZES.radius,
            borderTopLeftRadius: SIZES.radius,
            alignItems: 'center',
            justifyContent: 'center',
            ...styles.shadow,
          }}>
          <TouchableOpacity onPress={() => addOrRemoveFavorite(basket)}>
            <Image
              source={iconName}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* basketScreen Info */}
      <Text style={{...FONTS.body2}}>{basket.name}</Text>

      <View
        style={{
          marginTop: SIZES.padding,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {/* Rating */}
        <Image
          source={icons.star}
          style={{
            height: 20,
            width: 20,
            tintColor: COLORS.primary,
            marginRight: 10,
          }}
        />
        <Text style={{...FONTS.body3}}>4,3</Text>

        {/* Categories */}
        <View
          style={{
            flexDirection: 'row',
          }}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{...FONTS.h3, color: COLORS.darkgray}}> . </Text>
                <Text style={{...FONTS.body3}}>
                  {basket.store.category}
                </Text>
              </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
});

const windowWidth = Dimensions.get('window').width;

export default Card;
