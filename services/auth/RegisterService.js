import axios from 'axios';
export const register = async data => {
  try {
    const userCredential = await axios.post(
      'https://api-saveursolidaire.ivoriandev.com/v1/auth/register',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const user = userCredential.data;
    return true;
  } catch (error) {
    if (error.response && error.status === 403) {
      alert(error.message);
    }
    return false;
  }
};
export const registerSeller = async data => {
  try {
    const userCredential = await axios.post(
      'https://api-saveursolidaire.ivoriandev.com/v1/auth/register-seller',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const user = userCredential.data;
    return true;
  } catch (error) {
    if (error.response && error.status === 403) {
      alert(error.message);
    }
    return false;
  }
};
