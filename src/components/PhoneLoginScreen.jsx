import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, Alert, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { loginWithPhone } from '../services/loginService';
import { validatePhoneNumber, validatePassword } from '../utils/validation';

const PhoneLoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // handle login
  const handleLogin = async () => {
    setLoading(true);
    try {
      // call login service
      await loginWithPhone(phoneNumber, password);

      // after login success set phone number and password to empty
      setPhoneNumber('');
      setPassword('');
      navigation.navigate('Profile');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  // check condition before request to server
  const handleContinue = () => {
    let valid = true;

    if (!phoneNumber) {
      setPhoneNumberError('Please input your phone number.');
      valid = false;
    } else if (!validatePhoneNumber(phoneNumber)) {
      setPhoneNumberError('Phone number must be between 8 and 10 digits.');
      valid = false;
    } else {
      setPhoneNumberError('');
    }

    if (!password) {
      setPasswordError('Please input your password.');
      valid = false;
    } else if (!validatePassword(password)) {
      setPasswordError('Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      handleLogin();
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <View style={styles.countryCodeContainer}>
            <Image source={require('../assets/flags/cambodia.png')} style={styles.flagIcon} />
            <Text style={styles.countryCode}>+855</Text>
          </View>
          <View style={styles.separator}></View>
          <TextInput
            style={styles.input}
            placeholder="XXX XXX XXX XXX"
            keyboardType="phone-pad"
            autoCapitalize="none"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>
        {phoneNumberError ? <Text style={styles.errorText}>{phoneNumberError}</Text> : null}

        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Icon name={passwordVisible ? "visibility" : "visibility-off"} size={20} color="#888" style={styles.eyeIcon} />
          </TouchableOpacity>
        </View>
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

        <TouchableOpacity style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPasswordText}>Forgot Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue} disabled={loading}>
          {loading ? <ActivityIndicator size="small" color="#fff" /> : (
            <>
              <Text style={styles.continueButtonText}>Continue</Text>
              <Icon name="arrow-forward" size={20} color="#000" style={styles.arrowIcon} />
            </>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 8,
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  countryCode: {
    marginRight: 8,
    fontSize: 16,
    color: '#888',
  },
  flagIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  separator: {
    width: 1,
    height: '100%',
    backgroundColor: '#ccc',
    marginHorizontal: 2,
  },
  input: {
    flex: 1,
    height: '100%',
    color: '#000',
  },
  eyeIcon: {
    marginLeft: 8,
  },
  forgotPasswordContainer: {
    marginBottom: 16,
  },
  forgotPasswordText: {
    color: '#8fbdc2',
    fontSize: 16,
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 50,
    backgroundColor: '#7ce4f2',
    borderRadius: 50,
    paddingHorizontal: 16,
  },
  continueButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'medium',
    marginRight: 8,
  },
  arrowIcon: {
    position: 'absolute',
    right: 20,
  },
  errorText: {
    color: '#d9534f',
    fontSize: 12,
    marginBottom: 8,
    marginLeft: 10,
    alignSelf: 'flex-start',
  },
});

export default PhoneLoginScreen;
