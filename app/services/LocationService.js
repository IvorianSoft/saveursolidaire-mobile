import axios from 'axios';

async function getCoordinatesFromAddress(address) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        address,
      )}`,
    );
    const data = await response.json();
    if (data && data.length > 0) {
      const location = data[0];
      return {
        latitude: parseFloat(location.lat),
        longitude: parseFloat(location.lon),
      };
    } else {
      throw new Error('Adresse non trouvée');
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des coordonnées :', error);
    throw error;
  }
}

async function getAddressInfoFromSearchString(searchString) {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(
        searchString,
      )}`,
    );
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des informations de l\'adresse :', error);
    throw error;
  }
}

export {getCoordinatesFromAddress, getAddressInfoFromSearchString};
