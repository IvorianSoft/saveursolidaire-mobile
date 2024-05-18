import React, {useEffect} from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    Animated, StatusBar,
} from 'react-native';

import {icons, COLORS, SIZES, FONTS} from '../constants';
import Popup from "../components/Popup";

const StoreScreen = ({route, navigation}) => {
  const scrollX = new Animated.Value(0);
  const [store, setStore] = React.useState(null);
  const [currentLocation, setCurrentLocation] = React.useState(null);
    const [modalVisible, setModalVisible] = React.useState(false);


  useEffect(() => {
    let {store, currentLocation} = route.params;

    setStore(store);
    setCurrentLocation(currentLocation);
  }, [route.params]);

  scrollX.addListener(() => {
    return;
  });

    function showModal() {
        setModalVisible(true);
    }

  function editOrder(action, price) {
    if (action === '+') {
      let newQty = store?.qty + 1;
      setStore({
        ...store,
        qty: newQty,
        total: store.total + price,
      });
    } else {
      if (store.qty > 0) {
        let newQty = store?.qty - 1;
        setStore({
          ...store,
          qty: newQty,
          total: store.total - price,
        });
      }
    }
  }

  function getOrderQty() {
      return store?.qty;
  }

  function sumOrder() {
    return store?.price * store?.qty;
  }

  function getBasketItemCount() {
        return store?.qty;
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

        {/* StoreScreen Name Section */}
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
            <Text style={{...FONTS.h3}}>{store?.name}</Text>
          </View>
        </View>
      </View>
    );
  }

  function renderFoodInfo() {
      console.log(store);
    return (
      <View>
          <View>
            <View style={{height: SIZES.height * 0.35}}>
              {/* Food Image */}
              <Image
                source={store?.menu[0]?.photo}
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
                  onPress={() => editOrder('-', store.price)}>
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
                  onPress={() => editOrder('+', store.price)}>
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
                {store?.description} - {store?.price} XOF
              </Text>
              <Text style={{...FONTS.body3}}>{store?.name}</Text>
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
            <View style={{flexDirection: 'row'}}>
              <Image
                source={icons.pin}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  tintColor: COLORS.darkgray,
                }}
              />
              <Text style={{marginLeft: SIZES.padding, ...FONTS.h4}}>
                  {store?.locationCity}
              </Text>
            </View>

            <View style={{flexDirection: 'row'}}>
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
              disabled={getBasketItemCount() > 0 ? false : true}
              onPress={() =>
                // navigation.navigate('OrderDeliveryScreen', {
                //   store: store,
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
        <Popup modalVisible={modalVisible} setModalVisible={setModalVisible} text="Achat effectué avec succès !" />
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

export default StoreScreen;
