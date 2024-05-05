import React, {useEffect, useState} from 'react';
import Screen from "../../../components/Screen";
import {Platform, StyleSheet, Text, View} from "react-native";
import colors from "../../../config/colors";
import {Icon, ListItem, SearchBar} from "react-native-elements";
import {getAddressInfoFromSearchString} from "../../../services/LocationService";
import AppButton from "../../../components/AppButton";
import {updateStoreLocation} from "../../../services/seller/StoreService";

function SellerLocationScreen({route}) {
    const {store} = route.params;
    const [storeDetails, setStoreDetails] = useState(store);
    const [address, setAddress] = useState('');
    const [addressItems, setAddressItems] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);

    useEffect(() => {
        (async () => {
            const addressInfo = await getAddressInfoFromSearchString(address);
            let addressItems = [];
            addressInfo.map(item => {
                let formattedAddress = {
                    key: item.place_id,
                    label: formatAddress(item),
                    value: JSON.stringify(item),
                }
                addressItems.push(formattedAddress);
            });
            setAddressItems(addressItems);
        })();
    }, [address]);

    useEffect(() => {
        setAddressItems([])
        setAddress('')
        if (selectedAddress) {
            const formattedAddress = formatAddressObject(selectedAddress);
        }
    }, [selectedAddress]);

    const formatAddressObject = (address) => {
        return {
            address: formatAddress(address),
            city: address.address.city || address.address.town,
            country: address.address.country,
            postalCode: address.address.postcode,
            latitude: address.lat,
            longitude: address.lon,
        }
    }

    const formatAddress = (address) => {
        return `${address.address.house_number} ${address.address.road}, ${address.address.city || address.address.town}, ${address.address.postcode} ${address.address.country}`;
    }

    const updateLocation = async () => {
        if (!selectedAddress) {
            alert('Please select a valid address');
            return;
        }
        const updatedStore = await updateStoreLocation(storeDetails.id, formatAddressObject(selectedAddress));
        if (updatedStore) {
            alert('Store location updated successfully');
            setStoreDetails(updatedStore);
            route.params.setStore(updatedStore);
        } else {
            alert('Failed to update store location');
        }
    }

    return (
        <Screen>
            <Text style={styles.title}>Your store <Text style={{fontWeight: 'bold'}}>{storeDetails.name}</Text> is located now at: <Text style={{fontWeight: 'bold'}}>{storeDetails.location.address}</Text></Text>

            <SearchBar
                platform= {Platform.OS === 'ios' ? 'ios' : 'android'}
                placeholder='Select store address'
                lightTheme={true}
                placeholderTextColor={colors.gray}
                onChangeText={text => setAddress(text)}
                onCancel={() => {
                    setAddress('');
                    setAddressItems([]);
                }}
                value={selectedAddress ? formatAddress(selectedAddress) : address}
                disabled={selectedAddress !== null}
                cancelButtonProps={{ color: colors.blue }}
                cancelButtonTitle={null}
                round={true}
                showCancel={true}
                searchIcon={<Icon name='map-pin' type='font-awesome' iconStyle={{color: colors.medium}} size={15}/>}
                clearIcon={
                    <View style={{ position: 'absolute', right: -30, top: 10 }}>
                        <Icon
                            name='times'
                            type='font-awesome'
                            iconStyle={{color: colors.red}}
                            size={20}
                            onPress={() => {
                                setAddress('');
                                setAddressItems([]);
                            }}
                        />
                    </View>
                }
                onTouchCancel={() => {
                    setAddress('');
                    setAddressItems([]);
                }}
                containerStyle={{
                    backgroundColor: colors.light,
                    borderRadius: 25,
                    width: "100%",
                    padding: 15,
                    marginVertical: 10,
                    height: 50,
                }}
                inputContainerStyle={{
                    backgroundColor: colors.light,
                }}
                inputStyle={{
                    color: colors.dark,
                }}
                textContentType={'fullStreetAddress'}
                onPressIn={
                    () => {
                        setAddressItems([]);
                        setAddress('')
                        setSelectedAddress(null)
                    }
                }
            />

            {Array.isArray(addressItems) && addressItems.length > 0 ? (
                addressItems.map((address) => (
                    <ListItem
                        key={address.key}
                        bottomDivider
                        onPress={() => setSelectedAddress(JSON.parse(address.value))}
                    >
                        <ListItem.Content>
                            <ListItem.Title>{address.label}</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron/>
                    </ListItem>
                ))
            ) : null}

            {selectedAddress ? (
                <View>
                    {/* Submit button */}
                    <AppButton title="Update location" onPress={() => updateLocation()} style={styles.button} />
                </View>
            ) : null}


        </Screen>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 20,
    },
    button: {
        width: '50%',
        alignSelf: 'center',
        marginTop: 20,
    },
});

export default SellerLocationScreen;
