import axios from 'axios';
export const resetPassword = async email => {
  try {
    await axios.post(
      'https://api-saveursolidaire.ivoriandev.com/v1/auth/reset-password',
      email,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return true;
  } catch (error) {
    if (error.response && error.status === 403) {
      alert(error.message);
    }
    return false;
  }
};
