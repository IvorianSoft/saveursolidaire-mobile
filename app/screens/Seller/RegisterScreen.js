import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    Image,
    Text,
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback, Keyboard, FlatList
} from 'react-native';
import Screen from '../../components/Screen';
import AppForm from '../../components/forms/AppForm';
import * as Yup from 'yup';
import AppFormField from '../../components/forms/AppFormField';
import SubmitButton from '../../components/forms/SubmitButton';

import regex from '../../config/regex';
import colors from '../../config/colors';

import {registerSeller} from '../../services/auth/seller/RegisterSellerService';
import {getAddressInfoFromSearchString} from "../../services/LocationService";
import {Icon, ListItem, SearchBar} from "react-native-elements";
import {getUser} from "../../storage/UserStorage";

const validationSchema = Yup.object().shape({
    name: Yup.string().required().label('Name'),
    email: Yup.string()
        .required()
        .email()
        .matches(regex.email, 'Invalid email')
        .label('Email'),
    contact: Yup.string()
        .required()
        .matches(regex.phone, 'Invalid phone number')
        .label('Phone Number'),
    password: Yup.string().required().min(4).label('Password'),
    confirmPassword: Yup.string()
        .required()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .label('Confirm Password'),
    storeName: Yup.string().required().label('Store Name'),
    storeDescription: Yup.string().nullable().label('Store Description'),
    storeContact: Yup.string()
        .required()
        .matches(regex.phone, 'Invalid phone number')
        .label('Store Contact'),
});

function RegisterSellerScreen({navigation}) {
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
                    label: `${item.address.house_number} ${item.address.road}, ${item.address.city || item.address.town}, ${item.address.postcode} ${item.address.country}`,
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
    }, [selectedAddress]);

    const handleRegister = async values => {
        try {
            if (!selectedAddress) {
                alert('Please select store address');
                return;
            }
            //format address object
            const addressObject = formatAddressObject(selectedAddress);
            //merge address object with other values
            const data = {...values, ...addressObject};

            const registrationSuccessful = await registerSeller(data);
            if (registrationSuccessful) {
                navigation.reset({index: 0, routes: [{name: 'Login'}]});
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    const formatAddressObject = (address) => {
        return {
            storeAddress: formatAddress(address),
            storeCity: address.address.city || address.address.town,
            storeCountry: address.address.country,
            storePostalCode: address.address.postcode,
            storeLatitude: address.lat,
            storeLongitude: address.lon,
        }
    }

    const formatAddress = (address) => {
        return `${address.address.house_number} ${address.address.road}, ${address.address.city || address.address.town}, ${address.address.postcode} ${address.address.country}`;
    }

    return (
        <Screen style={styles.container}>
            <Image style={styles.logo} source={require('../../../assets/images/SaveurSolidaire.png')}/>
            <View>
                <Text style={{fontSize: 30, fontWeight: 'bold', textAlign: 'center', marginBottom: 20}}>Register as
                    Seller</Text>
            </View>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{flex: 1}}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.form}>

                <View style={{width: '100%'}}>

                    <AppForm
                        initialValues={{
                            name: '',
                            email: '',
                            password: '',
                            confirmPassword: '',
                            contact: '',
                            storeName: '',
                            storeDescription: '',
                            storeContact: '',
                            storeAddress: '',
                        }}
                        onSubmit={values => handleRegister(values)}
                        validationSchema={validationSchema}>

                        {/*Seller details*/}
                        <View>
                            <Text style={{fontSize: 15, fontWeight: 'bold'}}> Seller Details </Text>
                        </View>
                        <AppFormField
                            autoCapitalize="none"
                            autoCorrect={false}
                            icon="account"
                            name="name"
                            placeholder="Name"
                            textContentType="name"
                            width="90%"
                        />

                        <AppFormField
                            autoCapitalize="none"
                            autoCorrect={false}
                            icon="email"
                            keyboardType="email-address"
                            name="email"
                            placeholder="Email"
                            textContentType="emailAddress"
                            width="90%"
                        />

                        <AppFormField
                            autoCapitalize="none"
                            autoCorrect={false}
                            icon="phone"
                            keyboardType="phone-pad"
                            name="contact"
                            placeholder="Contact"
                            textContentType="telephoneNumber"
                            width="90%"
                        />

                        <AppFormField
                            autoCapitalize="none"
                            autoCorrect={false}
                            icon="lock"
                            name="password"
                            placeholder="Password"
                            secureTextEntry
                            textContentType="password"
                            width="90%"
                        />

                        <AppFormField
                            autoCapitalize="none"
                            autoCorrect={false}
                            icon="lock"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            secureTextEntry
                            textContentType="password"
                            width="90%"
                        />

                        {/*Store details*/}
                        <View>
                            <Text style={{fontSize: 15, fontWeight: 'bold', marginTop: 20}}> Store Details </Text>
                        </View>
                        <AppFormField
                            autoCapitalize="none"
                            autoCorrect={false}
                            icon="store"
                            name="storeName"
                            placeholder="Name"
                            textContentType="name"
                            width="90%"
                        />

                        <AppFormField
                            autoCapitalize="none"
                            autoCorrect={false}
                            icon="store"
                            name="storeDescription"
                            placeholder="Description"
                            textContentType="name"
                            width="90%"
                        />

                        <AppFormField
                            autoCapitalize="none"
                            autoCorrect={false}
                            icon="phone"
                            keyboardType="phone-pad"
                            name="storeContact"
                            placeholder="Contact"
                            textContentType="telephoneNumber"
                            width="90%"
                        />

                        {selectedAddress ? (
                            <AppFormField
                                autoCapitalize="none"
                                autoCorrect={false}
                                icon="map-marker"
                                name="storeAddress"
                                placeholder="Address"
                                textContentType="fullStreetAddress"
                                width="90%"
                                onChangeText={text => setAddress(text)}
                                editable={false}
                                value={`${selectedAddress.address.house_number} ${selectedAddress.address.road}, ${selectedAddress.address.city || selectedAddress.address.town}, ${selectedAddress.address.postcode} ${selectedAddress.address.country}`}
                                onPressIn={() => setSelectedAddress(null)}
                            />
                        ) : null}

                        {! selectedAddress ? (
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
                                value={address}
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
                            />
                        ) : null}

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

                        <View style={styles.alreadyAccount}>
                            <Text>Already have an account? </Text>
                            <Text
                                style={styles.signIn}
                                onPress={() =>
                                    navigation.reset({index: 0, routes: [{name: 'Login'}]})
                                }>
                                Login
                            </Text>
                        </View>

                        <View style={styles.submitButtonContainer}>
                            <SubmitButton title="Register" style={styles.button}/>
                        </View>
                    </AppForm>

                </View>
            </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
    },
    logo: {
        width: 80,
        height: 80,
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: 20,
    },
    button: {
        marginTop: 30,
        width: '50%',
        height: 50,
    },
    alreadyAccount: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    signIn: {
        fontWeight: 'bold',
    },
    form: {
        width: '95%',
    },
    submitButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    searchBar: {
        backgroundColor: colors.white,
        borderBottomColor: colors.light,
        borderTopColor: colors.light,
    }
});

export default RegisterSellerScreen;
