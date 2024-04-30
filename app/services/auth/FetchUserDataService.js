import axios from 'axios';
import {storeUser} from '../../storage/UserStorage';

export const fetchUser = async token => {
  try {
    const user = await axios.get(
      'https://api-saveursolidaire.ivoriandev.com/v1/auth/me',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data = user.data;

    await storeUser({
      id: data.id,
      name: data.name,
      email: data.email,
      token: token,
      contact: data.contact,
      role: {
        id: data.role.id,
        name: data.role.name,
      },
    });
  } catch (error) {
    if (error.status === 403) {
      alert(error.message);
    }
  }
};
