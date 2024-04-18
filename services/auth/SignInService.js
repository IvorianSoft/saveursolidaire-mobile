import {storeUser} from '../../storage/UserStorage';
import axios from 'axios';

export const signIn = async data => {
  try {
    console.log('data', data);
    const response = await axios.post(
      'https://api-saveursolidaire.ivoriandev.com/v1/auth/authenticate',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('response', response.data);
    const userCredential = await response.data;

    await fetchUserData(userCredential.token);

    return true;
  } catch (error) {
    if (error.response && error.status === 403) {
      alert(error.message);
    }
    return false;
  }
};

const fetchUserData = async token => {
  try {
    const userDoc = await axios.get(
      'https://api-saveursolidaire.ivoriandev.com/v1/auth/me',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const userData = userDoc.data;

    await storeUser({
      id: userData.id,
      name: userData.name,
      email: userData.email,
      token: token,
      contact: userData.contact,
      role: {
        id: userData.role.id,
        name: userData.role.name,
      },
    });
  } catch (error) {
    if (error.status === 403) {
      alert(error.message);
    }
  }
};
