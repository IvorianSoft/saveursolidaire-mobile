import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, FONTS, SIZES} from '../constants';
import React from 'react';

const MainCategory = ({category, selectedCategory, onSelectCategory}) => {
  return (
    <TouchableOpacity
      style={{
        padding: SIZES.padding,
        paddingBottom: SIZES.padding * 2,
        backgroundColor:
          selectedCategory?.id == category?.id ? COLORS.primary : COLORS.white,
        borderRadius: SIZES.radius,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: SIZES.padding,
        ...styles.shadow,
      }}
      onPress={() => onSelectCategory(category)}>
      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor:
              selectedCategory?.id == category?.id
              ? COLORS.white
              : COLORS.lightGray,
        }}>
        <Image
          source={category?.icon}
          resizeMode="contain"
          style={{
            width: 30,
            height: 30,
          }}
        />
      </View>

      <Text
        style={{
          marginTop: SIZES.padding,
          color:
              selectedCategory?.id == category?.id ? COLORS.white : COLORS.black,
          ...FONTS.body5,
        }}>
        {category.name}
      </Text>
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

export default MainCategory;
