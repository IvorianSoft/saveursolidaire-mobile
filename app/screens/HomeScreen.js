import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';

import {icons, images, SIZES, COLORS, FONTS} from '../constants';
import Location from '../components/Location';
import Card from '../components/Card';
import MainCategory from '../components/MainCategory';
import Loader from "../components/Loader";
import {searchBaskets} from "../services/BasketService";

const HomeScreen = ({navigation}) => {


  const initialCurrentLocation = {
    streetName: 'Lille',
    gps: {
      latitude: 50.633333,
      longitude: 3.066667,
      radius: 10,
    },
  };

  const categoryData = [
    {
      id: 1,
      name: 'Market',
      icon: icons.market,
    },
    {
      id: 2,
      name: 'Bakery',
      icon: icons.bakery,
    },
    {
      id: 3,
      name: 'Florist',
      icon: icons.florist,
    },
    {
      id: 4,
      name: 'Grocery',
      icon: icons.grocery,
    },
    {
      id: 5,
      name: 'Fast Food',
      icon: icons.food,
    },
  ];

  // price rating
  const affordable = 1;
  const fairPrice = 2;
  const expensive = 3;

  const basketData = [
    {
      id: 1,
      name: 'ByProgrammers Burger',
      rating: 4.8,
      locationCity: 'Lille',
      price: 5,
      categories: [5, 7],
      priceRating: affordable,
      photo: images.burger_basket_1,
      qty: 1,
      duration: '30 - 45 min',
      basketToSave: 5,
      description: 'No waste basket',
      location: {
        latitude: 1.5347282806345879,
        longitude: 110.35632207358996,
      },
      courier: {
        avatar: images.avatar_1,
        name: 'Amy',
      },
      menu: [
        {
          menuId: 1,
          name: 'Crispy Chicken Burger',
          photo: images.crispy_chicken_burger,
          description: 'Burger with crispy chicken, cheese and lettuce',
          calories: 200,
          price: 10,
        },
        {
          menuId: 2,
          name: 'Crispy Chicken Burger with Honey Mustard',
          photo: images.honey_mustard_chicken_burger,
          description: 'Crispy Chicken Burger with Honey Mustard Coleslaw',
          calories: 250,
          price: 15,
        },
        {
          menuId: 3,
          name: 'Crispy Baked French Fries',
          photo: images.baked_fries,
          description: 'Crispy Baked French Fries',
          calories: 194,
          price: 8,
        },
      ],
    },
    {
      id: 2,
      name: 'ByProgrammers Pizza',
      rating: 4.8,
      price: 10,
      categories: [2, 4, 6],
      priceRating: expensive,
      photo: images.pizza_basket,
      duration: '15 - 20 min',
      location: {
        latitude: 1.556306570595712,
        longitude: 110.35504616746915,
      },
      courier: {
        avatar: images.avatar_2,
        name: 'Jackson',
      },
      menu: [
        {
          menuId: 4,
          name: 'Hawaiian Pizza',
          photo: images.hawaiian_pizza,
          description: 'Canadian bacon, homemade pizza crust, pizza sauce',
          calories: 250,
          price: 15,
        },
        {
          menuId: 5,
          name: 'Tomato & Basil Pizza',
          photo: images.pizza,
          description:
            'Fresh tomatoes, aromatic basil pesto and melted bocconcini',
          calories: 250,
          price: 20,
        },
        {
          menuId: 6,
          name: 'Tomato Pasta',
          photo: images.tomato_pasta,
          description: 'Pasta with fresh tomatoes',
          calories: 100,
          price: 10,
        },
        {
          menuId: 7,
          name: 'Mediterranean Chopped Salad ',
          photo: images.salad,
          description: 'Finely chopped lettuce, tomatoes, cucumbers',
          calories: 100,
          price: 10,
        },
      ],
    },
    {
      id: 3,
      price: 5,
      name: 'ByProgrammers Hotdogs',
      rating: 4.8,
      categories: [3],
      priceRating: expensive,
      photo: images.hot_dog_basket,
      duration: '20 - 25 min',
      location: {
        latitude: 1.5238753474714375,
        longitude: 110.34261833833622,
      },
      courier: {
        avatar: images.avatar_3,
        name: 'James',
      },
      menu: [
        {
          menuId: 8,
          name: 'Chicago Style Hot Dog',
          photo: images.chicago_hot_dog,
          description: 'Fresh tomatoes, all beef hot dogs',
          calories: 100,
          price: 20,
        },
      ],
    },
    {
      id: 4,
      name: 'ByProgrammers Sushi',
      rating: 4.8,
      categories: [8],
      price: 20,
      priceRating: expensive,
      photo: images.japanese_basket,
      duration: '10 - 15 min',
      location: {
        latitude: 1.5578068150528928,
        longitude: 110.35482523764315,
      },
      courier: {
        avatar: images.avatar_4,
        name: 'Ahmad',
      },
      menu: [
        {
          menuId: 9,
          name: 'Sushi sets',
          photo: images.sushi,
          description: 'Fresh salmon, sushi rice, fresh juicy avocado',
          calories: 100,
          price: 50,
        },
      ],
    },
    {
      id: 5,
      price: 10,
      name: 'ByProgrammers Cuisine',
      rating: 4.8,
      categories: [1, 2],
      priceRating: affordable,
      photo: images.noodle_shop,
      duration: '15 - 20 min',
      location: {
        latitude: 1.558050496260768,
        longitude: 110.34743759630511,
      },
      courier: {
        avatar: images.avatar_4,
        name: 'Muthu',
      },
      menu: [
        {
          menuId: 10,
          name: 'Kolo Mee',
          photo: images.kolo_mee,
          description: 'Noodles with char siu',
          calories: 200,
          price: 5,
        },
        {
          menuId: 11,
          name: 'Sarawak Laksa',
          photo: images.sarawak_laksa,
          description: 'Vermicelli noodles, cooked prawns',
          calories: 300,
          price: 8,
        },
        {
          menuId: 12,
          name: 'Nasi Lemak',
          photo: images.nasi_lemak,
          description: 'A traditional Malay rice dish',
          calories: 300,
          price: 8,
        },
        {
          menuId: 13,
          name: 'Nasi Briyani with Mutton',
          photo: images.nasi_briyani_mutton,
          description: 'A traditional Indian rice dish with mutton',
          calories: 300,
          price: 8,
        },
      ],
    },
    {
      id: 6,
      name: 'ByProgrammers Dessets',
      rating: 4.9,
      categories: [9, 10],
      priceRating: affordable,
      photo: images.kek_lapis_shop,
      duration: '35 - 40 min',
      location: {
        latitude: 1.5573478487252896,
        longitude: 110.35568783282145,
      },
      courier: {
        avatar: images.avatar_1,
        name: 'Jessie',
      },
      menu: [
        {
          menuId: 12,
          name: 'Teh C Peng',
          photo: images.teh_c_peng,
          description: 'Three Layer Teh C Peng',
          calories: 100,
          price: 2,
        },
        {
          menuId: 13,
          name: 'ABC Ice Kacang',
          photo: images.ice_kacang,
          description: 'Shaved Ice with red beans',
          calories: 100,
          price: 3,
        },
        {
          menuId: 14,
          name: 'Kek Lapis',
          photo: images.kek_lapis,
          description: 'Layer cakes',
          calories: 300,
          price: 20,
        },
      ],
    },
  ];



  const [categories, setCategories] = React.useState(categoryData);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [baskets, setBaskets] = React.useState([]);
  const [allBaskets, setAllBaskets] = React.useState([]);
  const [currentLocation, setCurrentLocation] = React.useState(
    initialCurrentLocation,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    searchBaskets(currentLocation.gps).then(data => {
      setAllBaskets(data);
      setBaskets(data);
      setLoading(false);
    } );
  }, []);

  if (loading) {
    return <Loader loading/>;
  }

  function onSelectCategory(category) {
    //filter basket
    if (selectedCategory && category.id === selectedCategory.id) {
      setBaskets(allBaskets);
      setSelectedCategory(null);
    } else {
      let basketList = baskets.filter(a => {
        return a.store.category.toUpperCase()===category.name.toUpperCase()
      });

      setBaskets(basketList);

      setSelectedCategory(category);
    }
  }

  function renderHeader() {
    return <Location currentLocation={currentLocation} />;
  }

  function renderMainCategories() {
    const renderItem = ({item}) => (
      <MainCategory
        category={item}
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
      />
    );

    return (
      <View style={{padding: SIZES.padding * 2}}>
        <Text style={FONTS.h2}>
          Your baskets by categories
        </Text>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={{paddingVertical: SIZES.padding * 2}}
        />
      </View>
    );
  }

  function renderBasketList() {
    // @ts-ignore
    const renderItem = ({item}) => (
      <Card
        basket={item}
        navigation={navigation}
        currentLocation={currentLocation}
        categories={categories}
      />
    );

    return (
      <FlatList
        data={baskets}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding * 2,
          paddingBottom: 30,
        }}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderMainCategories()}
      {renderBasketList()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray4,
  },
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

export default HomeScreen;
