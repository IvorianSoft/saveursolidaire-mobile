import React from 'react';
import Screen from '../../components/Screen';
import {Image, StyleSheet, Text, View} from 'react-native';
import * as Yup from 'yup';
import AppFormField from '../../components/forms/AppFormField';
import AppForm from '../../components/forms/AppForm';
import SubmitButton from '../../components/forms/SubmitButton';
import {resetPassword} from '../../services/auth/ResetPasswordService';
import colors from '../../config/colors';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
});

function ForgotPasswordScreen({navigation}) {
  const handleSendEmailResetPassword = async values => {
    try {
      const resetSuccessful = await resetPassword(values.email);
      if (resetSuccessful) {
        navigation.reset({index: 0, routes: [{name: 'Login'}]});
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  return (
    <Screen style={styles.container}>
      <Image style={styles.logo} source={require('../../../assets/icon.png')} />

      <View style={styles.form}>
        <AppForm
          initialValues={{email: ''}}
          onSubmit={values => handleSendEmailResetPassword(values)}
          validationSchema={validationSchema}>
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
          />

          <View style={styles.bottomContainer}>
            <SubmitButton
              title="Reinitialized password"
              style={styles.submitButton}
            />

            <View style={styles.loginAndRegisterContainer}>
              <Text>You do not have an account? </Text>
              <Text
                style={styles.loginAndRegister}
                onPress={() =>
                  navigation.reset({index: 0, routes: [{name: 'Register'}]})
                }>
                Register
              </Text>
            </View>

            <View style={styles.loginAndRegisterContainer}>
              <Text>You already have an account? </Text>
              <Text
                style={styles.loginAndRegister}
                onPress={() =>
                  navigation.reset({index: 0, routes: [{name: 'Login'}]})
                }>
                Login
              </Text>
            </View>
          </View>
        </AppForm>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 96,
    height: 96,
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  container: {
    padding: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  submitButton: {
    marginTop: 20,
    width: '50%',
    height: 50,
  },
  loginAndRegisterContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  loginAndRegister: {
    fontWeight: 'bold',
  },
  form: {
    width: '95%',
  },
  bottomContainer: {
    alignItems: 'center',
  },
});

export default ForgotPasswordScreen;
