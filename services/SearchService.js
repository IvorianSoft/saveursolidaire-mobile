import axios from 'axios';
import {removeUser} from '../../storage/UserStorage';
import {getCoordinatesFromAddress} from './LocationService';

export const search = async address => {
  try {
    const location = await getCoordinatesFromAddress(address);
    await axios.get(
      'https://api-saveursolidaire.ivoriandev.com/v1/stores/search',
      {
        params: {
          latitude: location[0].lat,
          longitude: location[0].long,
        },
      },
    );
    await removeUser();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
