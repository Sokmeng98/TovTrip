import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import { fetchProfileData } from '../services/profileService';

const ProfileScreen = ({ navigation }) => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  // fetch profile data
  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const data = await fetchProfileData();
        setProfileData(data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadProfileData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <Text style={styles.headerText}>Profile</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View>
            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.inputHalf]}
                placeholder="First Name"
                value={profileData ? profileData.firstName : ''}
                editable={false}
              />
              <TextInput
                style={[styles.input, styles.inputHalfNoMargin]}
                placeholder="Last Name"
                value={profileData ? profileData.lastName : ''}
                editable={false}
              />
            </View>
            <View style={styles.row}>
              <View style={styles.inputContainer}>
                <Icon name="email" size={20} color="#888" style={styles.emailIcon} />
                <TextInput
                  style={[styles.input, styles.emailInput]}
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={profileData ? profileData.email : ''}
                  editable={false}
                />
              </View>
            </View>
            <View style={[styles.row, styles.genderRow]}>
              <Text style={styles.label}>Gender</Text>
              <View style={styles.genderContainer}>
                <TouchableOpacity style={[styles.genderOption, styles.maleOption]}>
                  <Icon
                    name={profileData && profileData.gender === 'Male' ? 'radio-button-checked' : 'radio-button-unchecked'}
                    size={20}
                    color="#7ce4f2"
                  />
                  <Text style={styles.genderText}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.genderOption}>
                  <Icon
                    name={profileData && profileData.gender === 'Female' ? 'radio-button-checked' : 'radio-button-unchecked'}
                    size={20}
                    color="#7ce4f2"
                  />
                  <Text style={styles.genderText}>Female</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'medium',
    color: 'black',
    marginBottom: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    position: 'relative',
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 8,
    color: 'black',
    backgroundColor: '#f5f5f5',
  },
  emailInput: {
    paddingLeft: 40,
  },
  emailIcon: {
    position: 'absolute',
    zIndex: 1,
    left: 10,
  },
  inputHalf: {
    width: '48%',
    marginRight: '4%',
  },
  inputHalfNoMargin: {
    width: '48%',
  },
  genderRow: {
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 18,
    color: '#000',
    marginRight: 16,
  },
  genderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  genderOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  maleOption: {
    paddingLeft: 20,
  },
  genderText: {
    fontSize: 18,
    color: 'black',
    marginRight: 8,
    marginLeft: 2,
  },
});

export default ProfileScreen;
