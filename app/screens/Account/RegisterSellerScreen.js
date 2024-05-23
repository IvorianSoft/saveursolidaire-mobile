import React from 'react';
import {StyleSheet, Image, Text, View} from 'react-native';
import Screen from '../../components/Screen';
import AppForm from '../../components/forms/AppForm';
import * as Yup from 'yup';
import AppFormField from '../../components/forms/AppFormField';
import SubmitButton from '../../components/forms/SubmitButton';

import regex from '../../config/regex';
import colors from '../../config/colors';

import {register} from '../../services/auth/RegisterService';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label('Name'),
  email: Yup.string()
    .required()
    .email()
    .matches(regex.email, 'Invalid email')
    .label('Email'),
  phoneNumber: Yup.string()
    .required()
    .matches(/^[0-9]{10}$/, 'Invalid phone number')
    .label('Phone Number'),
  password: Yup.string().required().min(4).label('Password'),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .label('Confirm Password'),
});

function RegisterScreen({navigation}) {
  const handleRegister = async values => {
    try {
      const registrationSuccessful = await register(values);
      if (registrationSuccessful) {
        navigation.reset({index: 0, routes: [{name: 'Login'}]});
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <Screen style={styles.container}>
      <Image style={styles.logo} source={require('../../../assets/images/SaveurSolidaire.png')} />
      <View style={styles.form}>
        <AppForm
          initialValues={{
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          onSubmit={values => handleRegister(values)}
          validationSchema={validationSchema}>
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="account"
            name="name"
            placeholder="Name"
            textContentType="name"
          />

          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
          />

          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="phone"
            keyboardType="phone-pad"
            name="contact"
            placeholder="Phone Number"
            textContentType="phoneNumber"
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
            <SubmitButton title="Register" style={styles.button} />
          </View>
        </AppForm>
      </View>
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
});

export default RegisterScreen;
