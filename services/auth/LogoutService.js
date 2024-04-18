import axios from 'axios';
import {removeUser} from '../../storage/UserStorage';

export const logout = async () => {
  try {
    await axios.get(
      'https://api-saveursolidaire.ivoriandev.com/v1/auth/logout',
    );
    await removeUser();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
