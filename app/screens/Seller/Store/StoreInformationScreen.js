import React, {useEffect, useState} from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View
} from "react-native";
import Screen from "../../../components/Screen";
import AppForm from "../../../components/forms/AppForm";
import AppFormField from "../../../components/forms/AppFormField";
import SubmitButton from "../../../components/forms/SubmitButton";
import colors from "../../../config/colors";
import * as Yup from "yup";
import {updateStore} from "../../../services/seller/StoreService";
const validationSchema = Yup.object().shape({
    name: Yup.string().required().label("Name"),
    description: Yup.string().required().label("Description"),
    contact: Yup.string().required().label("Contact"),
});
function StoreInformationScreen({route}) {
    const {store} = route.params;
    const [storeDetails, setStoreDetails] = useState(store);

    const handleSubmit = async (values) => {
        const updatedStore = await updateStore(values);
        if (updatedStore) {
            alert('Store details updated successfully');
            setStoreDetails(updatedStore);
            route.params.setStore(updatedStore);
        } else {
            alert('Failed to update store details');
        }
    }

    return (
        <Screen>
            {/* Store Information */}
            <Text style={styles.title}>Update <Text style={{fontWeight:'bold'}}>{storeDetails.name}</Text> details</Text>
            <Text style={styles.warningText}>Category and Address cannot be updated</Text>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView contentContainerStyle={{minHeight: '120%'}} style={styles.container}>
                            <AppForm
                                initialValues={
                                    {
                                        id: storeDetails.id,
                                        name: storeDetails.name,
                                        description: storeDetails.description,
                                        contact: storeDetails.contact,
                                        category: storeDetails.category,
                                    }
                                }
                                onSubmit={values => handleSubmit(values)}
                                validationSchema={validationSchema}
                            >
                                {/* Store Name */}
                                <AppFormField
                                    name="name"
                                    placeholder="Store Name"
                                    icon="store"
                                    defaultValue={storeDetails.name}
                                />
                                {/* Store Description */}
                                <AppFormField
                                    name="description"
                                    placeholder="Store Description"
                                    icon="text"
                                    multiline={true}
                                    numberOfLines={5}
                                    defaultValue={storeDetails.description}
                                />
                                {/* Store Phone */}
                                <AppFormField
                                    name="phone"
                                    placeholder="Store Phone"
                                    icon="phone"
                                    defaultValue={storeDetails.contact}
                                />
                                {/* Store Category */}
                                <AppFormField
                                    name="category"
                                    placeholder="Store Category"
                                    icon="tag"
                                    defaultValue={storeDetails.category}
                                    readOnly={true}
                                />
                                {/* Store Address */}
                                <AppFormField
                                    name="address"
                                    placeholder="Store Address"
                                    icon="map-marker"
                                    defaultValue={storeDetails.location.address}
                                    readOnly={true}
                                />

                                <View style={styles.submitButtonContainer}>
                                    <SubmitButton title="Update" style={styles.button}/>
                                </View>
                            </AppForm>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        textAlign: 'center',
        marginVertical: 20,
    },
    container: {
        padding: 20,
    },
    submitButtonContainer: {
        marginTop: 10,
        width: '50%',
        height: 50,
        alignSelf: 'center',
    },
    warningText: {
        color: colors.red,
        textAlign: 'center',
    },
});

export default StoreInformationScreen;
