import React, {useEffect} from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    Animated, StatusBar, Alert,
} from 'react-native';

import {icons, COLORS, SIZES, FONTS} from '../constants';
import Popup from "../components/Popup";
import {createOrder} from "../services/OrderService";

const BasketScreen = ({route, navigation}) => {
  const scrollX = new Animated.Value(0);
  const [basket, setBasket] = React.useState(null);
  const [quantity, setQuantity] = React.useState(1);
  const [currentLocation, setCurrentLocation] = React.useState(null);
    const [modalVisible, setModalVisible] = React.useState(false);


  useEffect(() => {
    let {basket, currentLocation} = route.params;

    setBasket(basket);
    setCurrentLocation(currentLocation);
  }, [route.params]);

  scrollX.addListener(() => {
    return;
  });

    function showModal() {
        createOrder({
            basketId: basket.id,
            quantity: quantity,
        }).then(() => {
            setModalVisible(true);
        }).catch((error) => {
            Alert.alert('error', error.message);
            console.error(error);
        });
    }

  function editOrder(action, price) {
    if (action === '+') {
        quantity < basket.quantity ? setQuantity(quantity + 1) : setQuantity(quantity);
    } else {
      if (quantity > 0) {
        setQuantity(quantity - 1);
      }
    }
  }

  function getOrderQty() {
      return quantity;
  }

  function sumOrder() {
    return basket?.price * quantity;
  }

  function getBasketItemCount() {
        return quantity;
  }

  function renderHeader() {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{
            width: 50,
            paddingLeft: SIZES.padding * 2,
            justifyContent: 'center',
          }}
          onPress={() => navigation.goBack()}>
          <Image
            source={icons.back}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>

        {/* BasketScreen Name Section */}
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: SIZES.padding * 3,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.lightGray3,
            }}>
            <Text style={{...FONTS.h3}}>{basket?.name}</Text>
          </View>
        </View>
      </View>
    );
  }

  function renderFoodInfo() {
      console.log(basket);
    return (
      <View>
          <View>
            <View style={{height: SIZES.height * 0.35}}>
              {/* Food Image */}
              <Image
                source={{uri: basket?.image.url}}
                resizeMode="cover"
                style={{
                  width: SIZES.width,
                  height: '100%',
                }}
              />

              {/* Quantity */}
              <View
                style={{
                  position: 'absolute',
                  bottom: -20,
                  width: SIZES.width,
                  height: 50,
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  style={{
                    width: 50,
                    backgroundColor: COLORS.white,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderTopLeftRadius: 25,
                    borderBottomLeftRadius: 25,
                  }}
                  onPress={() => editOrder('-', basket.price)}>
                  <Text style={{...FONTS.body1}}>-</Text>
                </TouchableOpacity>

                <View
                  style={{
                    width: 50,
                    backgroundColor: COLORS.white,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{...FONTS.h2}}>{getOrderQty()}</Text>
                </View>

                <TouchableOpacity
                  style={{
                    width: 50,
                    backgroundColor: COLORS.white,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderTopRightRadius: 25,
                    borderBottomRightRadius: 25,
                  }}
                  onPress={() => editOrder('+', basket.price)}
                >
                  <Text style={{...FONTS.body1}}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Name & Description */}
            <View
              style={{
                width: SIZES.width,
                alignItems: 'center',
                marginTop: 15,
                paddingHorizontal: SIZES.padding * 2,
              }}>
              <Text
                style={{marginVertical: 10, textAlign: 'center', ...FONTS.h2}}>
                {basket?.description} - {basket?.price} XOF
              </Text>
              <Text style={{...FONTS.body3}}>{basket?.name}</Text>
            </View>


          </View>
      </View>
    );
  }

  function renderOrder() {
    return (
      <View>
        <View
          style={{
            backgroundColor: COLORS.white,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: SIZES.padding * 2,
              paddingHorizontal: SIZES.padding * 3,
              borderBottomColor: COLORS.lightGray2,
              borderBottomWidth: 1,
            }}>
            <Text style={{...FONTS.h3}}>
              {getBasketItemCount()} {getBasketItemCount()<=1 ? 'item' : 'items'} in Cart
            </Text>
            <Text style={{...FONTS.h3}}>{sumOrder()} XOF</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: SIZES.padding * 2,
              paddingHorizontal: SIZES.padding * 3,
            }}>
            <View style={{flexDirection: 'row', flex: 0.8}}>
              <Image
                source={icons.pin}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  tintColor: COLORS.darkgray,
                }}
              />
              <Text style={{marginLeft: SIZES.padding, ...FONTS.body4, fontWeight: "bold"}}>
                  {basket?.store.location.address}
              </Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={icons.master_card}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  tintColor: COLORS.darkgray,
                }}
              />
              <Text style={{marginLeft: SIZES.padding}}>Cash payment</Text>
            </View>
          </View>

          {/* Order Button */}
          <View
            style={{
              padding: SIZES.padding * 2,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={{
                width: SIZES.width * 0.9,
                padding: SIZES.padding,
                backgroundColor: COLORS.primary,
                alignItems: 'center',
                borderRadius: SIZES.radius,
              }}
              disabled={getBasketItemCount() <= 0}
              onPress={() =>
                // navigation.navigate('OrderDeliveryScreen', {
                //   basket: basket,
                //   currentLocation: currentLocation,
                // })
                showModal()
              }>
              <Text style={{color: COLORS.white, ...FONTS.h2}}>Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
        <View style={ styles.headerContainer}>
            {renderHeader()}
            <View style={ styles.foodInfoContainer }>
                {renderFoodInfo()}
            </View>
            <View style={ styles.orderContainer }>
                {renderOrder()}
            </View>
            </View>
        <Popup modalVisible={modalVisible} setModalVisible={setModalVisible} text="Achat effectué avec succès !" navigation={navigation}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,

  },
    headerContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        marginTop: StatusBar.currentHeight,
    },
    foodInfoContainer: {
        flex: 1,
        marginTop: 50,
    },
    orderContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    }
});

export default BasketScreen;
