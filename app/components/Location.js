import {Text, View} from 'react-native';
import {COLORS, FONTS, SIZES} from '../constants';
import React from 'react';

const Location = ({currentLocation}) => {
  return (
    <View style={{flexDirection: 'row', height: 50}}>
      <Text style={{...FONTS.h2, marginTop: 10}}>
        Welcome to Saveur Solidaire
      </Text>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View
          style={{
            width: '70%',
            height: '100%',
            backgroundColor: COLORS.lightGray3,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: SIZES.radius,
          }}>
          <Text style={{...FONTS.h3}}>{currentLocation.streetName}</Text>
        </View>
      </View>
    </View>
  );
};

export default Location;
