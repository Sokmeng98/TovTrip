
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchProfileData = async () => {
  try {
    // get token
    const token = await AsyncStorage.getItem('token');
    
    // check condition if has token request data if not show error
    if (token) {
      const response = await fetch('https://dev.tovtrip.com/usersvc/api/v1/users/me', {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'apikey': '037cb34d-c5ee-4169-b2fd-bec049f77ecf',
          'Authorization': `Bearer ${token}`,
          'x-platform': 'android',
        },
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || 'Failed to fetch profile data');
      }

      const result = await response.json();
      return result.data;
    } else {
      throw new Error('No token found');
    }
  } catch (error) {
    throw new Error(`Error fetching profile data: ${error.message}`);
  }
};
