
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://dev.tovtrip.com/usersvc/api/v1/auth/login';
const API_KEY = '037cb34d-c5ee-4169-b2fd-bec049f77ecf';
const PLATFORM = 'android';

// handle login with email
export const loginWithEmail = async (email, password) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'apikey': API_KEY,
        'x-platform': PLATFORM,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      // store token
      await AsyncStorage.setItem('token', result.data.accessToken);
      await AsyncStorage.setItem('refreshToken', result.data.refreshToken);
      return result;
    } else {
      throw new Error(result.message || 'Login failed. Please try again.');
    }
  } catch (error) {
    throw new Error(error.message || 'An error occurred. Please try again.');
  }
};

// handle login with phone number
export const loginWithPhone = async (phone, password) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'apikey': API_KEY,
        'x-platform': PLATFORM,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        countryCode: "855",
        phone: phone,
        password: password,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      // store token
      await AsyncStorage.setItem('token', result.data.accessToken);
      await AsyncStorage.setItem('refreshToken', result.data.refreshToken);
      return result;
    } else {
      throw new Error(result.message || 'Login failed. Please try again.');
    }
  } catch (error) {
    throw new Error(error.message || 'An error occurred. Please try again.');
  }
};
