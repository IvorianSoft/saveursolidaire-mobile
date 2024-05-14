import React, {useEffect, useState} from 'react';
import Screen from "../../../components/Screen";
import {Alert, Image, ScrollView, StyleSheet, Switch, Text, View} from "react-native";
import {
    getBasket,
    updateBasketDetails,
    updateBasketQuantity,
    updateBasketStatus
} from "../../../services/seller/BasketService";
import AppForm from "../../../components/forms/AppForm";
import AppFormField from "../../../components/forms/AppFormField";
import SubmitButton from "../../../components/forms/SubmitButton";
import * as Yup from "yup";
import ImagePicker from 'expo-image-picker';

const validationSchemaForUpdateQuantity = Yup.object().shape({
    quantity: Yup.number().required().min(1).label('Quantity'),
});

const validationSchemaForUpdateDetails = Yup.object().shape({
    name: Yup.string().required().label('Name'),
    description: Yup.string().required().label('Description'),
    price: Yup.number().required().label('Price'),
});

function SellerUpdateBasketFormScreen({navigation, route}) {
    const {basketId} = route.params;
    const [basket, setBasket] = useState(null);
    const [isSwitchOn, setIsSwitchOn] = useState(false);


    const fetchBasket = async (id) => {
        const basket = await getBasket(id);
        setBasket(basket);

        // Set the switch to the status of the basket
        setIsSwitchOn(basket.isActive);
    }

    const updateStatus = async (id) => {
        await updateBasketStatus(id);
        await fetchBasket(id);

        return true;
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchBasket(basketId);
        });

        // Appel initial pour récupérer les données du panier
        fetchBasket(basketId);

        // N'oubliez pas de vous désabonner lors du nettoyage
        return unsubscribe;
    }, [navigation, basketId]);

    const updateQuantity = async (values, resetForm) => {
        updateBasketQuantity(basketId, values.quantity).then(
            () => {
                fetchBasket(basketId);
                resetForm();
                Alert.alert('Quantity updated', 'The quantity of the basket has been updated');
            }
        );
    }

    const updateDetails = async (values) => {
        updateBasketDetails(basketId, values).then(
            () => {
                fetchBasket(basketId);
                Alert.alert('Details updated', 'The details of the basket have been updated');
            }
        );
    }



    return (basket && (
        <Screen>
            <Text style={styles.title}>Update details of : <Text style={{fontWeight:'bold'}}>{basket?.name}</Text></Text>
            <ScrollView contentContainerStyle={{padding: 10}}>
                <View style={styles.containerStatusAndUpload}>
                    <View style={styles.status}>
                        <Text>Status: </Text>
                        <Switch
                            value={isSwitchOn}
                            onValueChange={(value) => {
                                setIsSwitchOn(value);
                                updateStatus(basketId).then(
                                    Alert.alert('Status updated', 'The status of the basket has been updated')
                                )
                            }}
                        />
                    </View>

                    <View style={styles.upload}>
                        <Text onPress={() => {console.log('Upload image')}}>
                            Upload image
                        </Text>
                    </View>
                </View>

                <View style={styles.containerImage}>
                    {/* DISPLAY THE IMAGE OF THE BASKET  basket?.image?.url */}
                    <Image source={{uri: basket?.image?.url}} style={styles.image}/>
                </View>

                {/* FORM TO UPDATE THE QUANTITY OF THE BASKET */}
                <View style={styles.formUpdateQuantity}>
                    <AppForm
                        initialValues={{quantity: basket?.quantity}}
                        onSubmit={(values, {resetForm}) => updateQuantity(values, resetForm)}
                        validationSchema={validationSchemaForUpdateQuantity}
                    >
                        <Text>Quantity</Text>
                        <View style={{justifyContent: 'space-between'}}>
                            <AppFormField
                                name='quantity'
                                placeholder={'Actual quantity: ' + basket?.quantity}
                                keyboardType='numeric'
                            />
                        </View>
                        <View style={styles.buttonQuantity}>
                            <SubmitButton title='Update quantity'/>
                        </View>
                    </AppForm>
                </View>

                {/* FORM TO UPDATE DETAILS OF THE BASKET */}
                <View style={styles.formUpdateDetails}>
                    <AppForm
                        initialValues={
                            {
                                id: basket?.id,
                                name: basket?.name,
                                description: basket?.description,
                                price: basket?.price,
                            }
                        }
                        onSubmit={values => updateDetails(values)}
                        validationSchema={validationSchemaForUpdateDetails}
                    >
                        <Text>Name</Text>
                        <AppFormField
                            name='name'
                            placeholder='Name'
                            defaultValue={basket?.name}
                        />
                        <Text>Description</Text>
                        <AppFormField
                            name='description'
                            placeholder='Description'
                            defaultValue={basket?.description}
                        />
                        <Text>Price</Text>
                        <AppFormField
                            name='price'
                            placeholder='Price'
                            keyboardType='numeric'
                            defaultValue={basket?.price.toString()}
                        />
                        <View style={styles.buttonDetails}>
                            <SubmitButton title='Update details'/>
                        </View>
                    </AppForm>
                </View>

                {/* ADD VIEW TO ADD SPACE AT THE BOTTOM */}
                <View style={{height: 50}}/>
            </ScrollView>
        </Screen>
    ));
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
    },
    containerStatusAndUpload: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        padding: 10,
    },
    status: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    upload: {
        backgroundColor: 'lightgrey',
        padding: 10,
        borderRadius: 10,
    },
    containerImage: {
        alignItems: 'center',
        marginTop: 20,
    },
    formUpdateQuantity: {
        marginTop: 30,
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    buttonQuantity: {
        marginTop: 10,
        alignSelf: 'flex-end',
        width: 100,
    },
    formUpdateDetails: {
        marginTop: 30,
        padding: 10,
    },
    buttonDetails: {
        marginTop: 10,
        alignSelf: 'flex-end',
        width: 100,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75
    }
});

export default SellerUpdateBasketFormScreen;