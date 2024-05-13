import React, {useEffect, useState} from 'react';
import Screen from "../../../components/Screen";
import {Image, ScrollView, StyleSheet, Switch, Text, View} from "react-native";
import {getBasket} from "../../../services/seller/BasketService";
import AppForm from "../../../components/forms/AppForm";
import AppFormField from "../../../components/forms/AppFormField";
import SubmitButton from "../../../components/forms/SubmitButton";

function SellerUpdateBasketFormScreen({navigation, route}) {
    const {basketId} = route.params;
    const [basket, setBasket] = useState(null);

    const fetchBasket = async (id) => {
        const basket = await getBasket(id);
        setBasket(basket);
    }

    useEffect(() => {
        fetchBasket(basketId);
    }, [basketId]);

    return (
        <Screen>
            <Text style={styles.title}>Update details of : <Text style={{fontWeight:'bold'}}>{basket?.name}</Text></Text>
            <ScrollView contentContainerStyle={{padding: 10}}>
                <View style={styles.containerStatusAndUpload}>
                    <View style={styles.status}>
                        <Text>Status: </Text>
                        <Switch
                            value={basket?.isActive}
                            onValueChange={(value) => console.log(value)}
                        />
                    </View>

                    <View style={styles.upload}>
                        <Text>Upload image</Text>
                    </View>
                </View>

                <View style={styles.containerImage}>
                    <Image source={require('../../../../assets/images/avatar-1.jpg')} style={styles.image}/>
                </View>

                <View style={styles.formUpdateQuantity}>
                    <AppForm
                        initialValues={
                            {
                                id: basket?.id,
                                quantity: basket?.quantity,
                            }
                        }
                        onSubmit={values => console.log(values)}
                        validationSchema={null}
                    >
                        <Text>Quantity</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <AppFormField
                                name='quantity'
                                placeholder=''
                                keyboardType='numeric'
                            />
                        </View>
                        <View style={styles.buttonQuantity}>
                            <SubmitButton title='Update quantity'/>
                        </View>
                    </AppForm>
                </View>

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
                        onSubmit={values => console.log(values)}
                        validationSchema={null}
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
    );
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