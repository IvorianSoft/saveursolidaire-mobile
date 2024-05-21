import {removeUser} from '../../storage/UserStorage';
import {removeStore} from "../../storage/StoreStorage";

export const logout = async () => {
  try {
    await removeUser();
    await removeStore();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
