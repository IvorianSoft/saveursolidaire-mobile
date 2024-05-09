import React, {useEffect, useState} from 'react';
import Screen from "../../../components/Screen";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {getStore} from "../../../storage/StoreStorage";
import AppForm from "../../../components/forms/AppForm";
import * as Yup from 'yup';
import AppFormField from "../../../components/forms/AppFormField";
import SubmitButton from "../../../components/forms/SubmitButton";
import {addBasket} from "../../../services/seller/BasketService";


const validationSchema = Yup.object().shape({
    name: Yup.string().required().label("Name"),
    description: Yup.string().required().label("Description"),
    price: Yup.number().required().label("Price"),
    quantity: Yup.number().required().label("Quantity"),
    note: Yup.string().label("Note"),
});

function SellerAddBasketFormScreen({navigation}) {
    const [store, setStore] = useState(null);
    const [initialValues, setInitialValues] = useState(null);

    async function getStoreData() {
        const store = await getStore();
        setStore(store);
        console.log(store);

        if (!store) {
            navigation.reset({index: 0, routes: [{name: 'Login'}]});
        }
    }

    useEffect( () => {
        getStoreData();
    }, []);

    useEffect(() => {
        if (store) {
            setInitialValues({
                name: '',
                description: '',
                price: 10,
                quantity: 1,
                note: 'Please, prepare yor sopping bag before you come to the store',
                storeId: store.id,
            });
        }
    }, [store]);

    const handleSubmit = async values => {
        const response = await addBasket(values);
        if (response){
            navigation.navigate('SellerBasket');
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getStoreData();
        });

        return unsubscribe;
    }, [navigation]);

    // ------------------------------
    return (
        <Screen>
            <ScrollView>
                {initialValues && (
                    <AppForm initialValues={initialValues} onSubmit={values => handleSubmit(values)} validationSchema={validationSchema}>
                        <AppFormField
                            autoCapitalize="none"
                            autoCorrect={false}
                            icon="account"
                            name="name"
                            placeholder="Name"
                            defaultValue={initialValues.name}
                        />

                        <AppFormField
                            autoCapitalize="none"
                            autoCorrect={false}
                            icon="text"
                            name="description"
                            placeholder="Description"
                            defaultValue={initialValues.description}
                        />

                        <AppFormField
                            autoCapitalize="none"
                            autoCorrect={false}
                            icon="currency-eur"
                            name="price"
                            placeholder="Price"
                            defaultValue={initialValues.price.toString()}
                        />

                        <AppFormField
                            autoCapitalize="none"
                            autoCorrect={false}
                            icon="numeric"
                            name="quantity"
                            placeholder="Quantity"
                            defaultValue={initialValues.quantity.toString()}
                        />

                        <AppFormField
                            autoCapitalize="none"
                            autoCorrect={true}
                            icon="text"
                            name="note"
                            placeholder="Note"
                            defaultValue={initialValues.note}
                        />


                        <View style={styles.submitButtonContainer}>
                            <SubmitButton title="Add" style={styles.button}/>
                        </View>
                    </AppForm>
                )}
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    submitButtonContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    button: {
        width: '50%',
        height: 50,
    },
});

export default SellerAddBasketFormScreen;