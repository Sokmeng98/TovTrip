import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { loginWithEmail } from '../services/loginService';
import { validateEmail, validatePassword } from '../utils/validation';

const EmailLoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailError, setEmailError] = useState('');
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
      await loginWithEmail(email, password);
      
      // after login success set phone number and password to empty
      setEmail('');
      setPassword('');
      navigation.navigate('Profile');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    let valid = true;

    if (!email) {
      setEmailError('Please input your email.');
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      valid = false;
    } else {
      setEmailError('');
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
          <Icon name="email" size={20} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

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

export default EmailLoginScreen;
