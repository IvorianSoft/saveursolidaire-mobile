import axios from 'axios';
import {removeUser} from '../../storage/UserStorage';

export const logout = async () => {
  try {
    await removeUser();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
