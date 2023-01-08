import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';
import CountryModal from './src/common/CountryModal';
import StateModal from './src/common/StateModal';
import CityModal from './src/common/CityModal';
import CategoryModal from './src/common/CategoryModal';
import {launchImageLibrary} from 'react-native-image-picker';
import Loader from './src/common/Loader';

const App = () => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [countryVisible, setCountryVisible] = useState(false);
  const [selectedGender, setSelectedGender] = useState(0);
  const [countryList, setCountryList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('Select Country');
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [selectedState, setSelectedState] = useState('Select State');
  const [stateVisible, setStateVisible] = useState(false);
  const [cityVisible, setCityVisible] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Select City');
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Selected Category');
  const [categoryVisible, setCategoryVisible] = useState(false);
  const [imageData, setImageData] = useState({
    assets: [
      {
        fileName: '',
        fileSize: 13346,
        height: 185,
        type: 'image/jpeg',
        uri: '',
        width: 273,
      },
    ],
  });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [company, setCompany] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [refName, setRefName] = useState('');
  const [refMobile, setRefMobile] = useState('');
  const [refRelation, setRefRelation] = useState('');
  const [altrMobile, setAltrMobile] = useState('');
  const [exp, setExp] = useState('');
  const [pincode, setPincode] = useState('');

  const [badName, setBadName] = useState(false);
  const [badEmail, setBadEmail] = useState(false);
  const [badMobile, setBadMobile] = useState(false);
  const [badCompany, setBadCompany] = useState(false);
  const [badPassword, setBadPassword] = useState(false);
  const [badConfirmPass, setBadConfirmPass] = useState(false);
  const [badRefName, setBadRefName] = useState(false);
  const [badRefMobile, setBadRefMobile] = useState(false);
  const [badRefRelation, setBadRefRelation] = useState(false);
  const [badAltrMobile, setBadAltrMobile] = useState(false);
  const [badExp, setBadExp] = useState(false);
  const [badPincode, setBadPincode] = useState(false);
  const [stateId, setStateId] = useState('');
  const [cityId, setCityId] = useState('');
  const [countryId, setCountryId] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [loaderVisible, setLoaderVisible] = useState(false);

  useEffect(() => {
    getCountryList();
    getApiCategory();
  }, []);
  const getCountryList = async () => {
    const res = await axios.get(
      'http://182.76.237.238/~wellness/wellness/api/country_list',
    );
    console.log(res.data.data);
    setCountryList(res.data.data);
    setSelectedState('Select State');
    setSelectedCity('Select City');
    setCityList([]);
    setStateList([]);
    getApiState(1);
  };

  const getApiState = id => {
    axios('http://182.76.237.238/~wellness/wellness/api/state_list', {
      method: 'POST',
      data: {
        country_id: id,
      },
    })
      .then(res => {
        if (res.data.data != null) {
          setStateList(res.data.data);
          setSelectedState('Select State');
          setSelectedCity('Select City');
        } else {
          setStateList([]);
          setSelectedState('Select State');
          setSelectedCity('Select City');
        }
      })
      .catch(error => console.log(error));
  };
  const getApiCity = id => {
    axios('http://182.76.237.238/~wellness/wellness/api/city_list', {
      method: 'POST',
      data: {
        state_id: id,
      },
    })
      .then(res => {
        if (res.data.data !== null) {
          console.log(res.data.data);
          setCityList(res.data.data);
          setSelectedCity('Select City');
        } else {
          setCityList([]);
          setSelectedCity('Select City');
        }
      })
      .catch(error => console.log(error));
  };
  const getApiCategory = () => {
    axios('http://182.76.237.238/~wellness/wellness/api/category_list')
      .then(res => {
        console.log(res.data.data);
        setCategoryList(res.data.data);
      })
      .catch(error => console.log(error));
  };

  const validateForm = () => {
    let validity = true;
    if (name == '') {
      setBadName(true);
      validity = false;
    }
    if (
      email == '' ||
      !String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )
    ) {
      setBadEmail(true);
      validity = false;
    }

    if (mobile == '' || mobile.length < 10) {
      setBadMobile(true);
      validity = false;
    }
    if (company == '') {
      setBadCompany(true);
      validity = false;
    }
    if (password == '') {
      setBadPassword(true);
      validity = false;
    }
    if (confirmPass == '') {
      setBadConfirmPass(true);
      validity = false;
    }
    if (password !== confirmPass) {
      setBadPassword(true);
      validity = false;
    }
    if (imageData.assets[0].uri == '') {
      validity = false;
    }
    if (refName == '') {
      setBadRefName(true);
      validity = false;
    }
    if (refMobile == '') {
      setBadRefMobile(true);
      validity = false;
    }
    if (refRelation == '') {
      setBadRefRelation(true);
      validity = false;
    }
    if (altrMobile == '' || altrMobile.length < 10) {
      setBadAltrMobile(true);
      validity = false;
    }
    if (exp == '') {
      setBadExp(true);
      validity = false;
    }
    if (selectedCountry === 'Select Country') {
      validity = false;
    }
    if (selectedState === 'Select State') {
      validity = false;
    }
    if (selectedCity === 'Select City') {
      validity = false;
    }

    if (selectedCategory == 'Selected Category') {
      validity = false;
    }
    if (toggleCheckBox == false) {
      validity = false;
    }
    return validity;
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Task Photo App Camera Permission',
          message:
            'Task Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        openGallery();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const openGallery = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'});
    if (result.didCancel) {
    } else {
      console.log(result);
      setImageData(result);
    }
  };

  const submitData = () => {
    setLoaderVisible(true);
    axios(
      'http://182.76.237.238/~wellness/wellness/api/provider_registration',
      {
        method: 'POST',
        data: {
          name: name,
          mobile_no: mobile,
          email: email,
          company_name: company,
          password: password,
          confirm_password: confirmPass,
          gender: selectedGender,
          image: imageData.assets[0].uri,
          reference_name: refName,
          reference_mobile_no: refMobile,
          reference_relation: refRelation,
          alternate_mobile_no: altrMobile,
          service_category: serviceId,
          experience: exp,
          country: countryId,
          state: stateId,
          city: cityId,
          pin_code: pincode,
          lat: 0.0,
          long: 0.0,
          id_proof: '',
          term_condition: toggleCheckBox,
          device_token: '',
        },
      },
    )
      .then(res => {
        setLoaderVisible(false);
        if (res.data.status == 1) {
          alert('Data Uplaoded Successfully !!');
          setName('');
          setEmail('');
          setMobile('');
          setPassword('');
          setConfirmPass('');
          setCompany('');
          setImageData({
            assets: [
              {
                fileName: '',
                fileSize: 13346,
                height: 185,
                type: 'image/jpeg',
                uri: '',
                width: 273,
              },
            ],
          });
          setRefName('');
          setRefMobile('');
          setRefRelation('');
          setAltrMobile('');
          setExp('');
          setSelectedCountry('Select Country');
          setSelectedState('Select State');
          setSelectedCountry('Select City');
          setPincode('');
          setSelectedCategory('');
        }
      })
      .catch(error => {
        setLoaderVisible(false);
        alert(error);
      });
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{'Task App '}</Text>
        </View>
        <TextInput
          style={styles.inputStyle}
          maxLength={40}
          multiline={false}
          placeholder="Name"
          value={name}
          onChangeText={txt => setName(txt)}
        />
        <TextInput
          style={styles.inputStyle}
          keyboardType="email-address"
          multiline={false}
          placeholder="Email Id"
          value={email}
          onChangeText={txt => setEmail(txt)}
        />
        <TextInput
          style={styles.inputStyle}
          maxLength={10}
          keyboardType="number-pad"
          multiline={false}
          placeholder="Mobile No"
          value={mobile}
          onChangeText={txt => setMobile(txt)}
        />
        <TextInput
          style={styles.inputStyle}
          multiline={false}
          placeholder="Company Name"
          value={company}
          onChangeText={txt => setCompany(txt)}
        />
        <TextInput
          style={styles.inputStyle}
          multiline={false}
          placeholder="Password"
          value={password}
          onChangeText={txt => setPassword(txt)}
        />
        <TextInput
          style={styles.inputStyle}
          multiline={false}
          placeholder="Confirm Password"
          value={confirmPass}
          onChangeText={txt => setConfirmPass(txt)}
        />
        <Text
          style={{
            marginLeft: 25,
            marginTop: 30,
            fontSize: 16,
            fontWeight: '600',
          }}>
          Select Gender
        </Text>
        <View style={styles.genderView}>
          <TouchableOpacity
            style={[
              styles.genderBtn,
              {
                borderColor: selectedGender == 0 ? 'green' : 'black',
                backgroundColor: selectedGender == 0 ? '#DDF5DA' : '#fff',
              },
            ]}
            onPress={() => {
              setSelectedGender(0);
            }}>
            <Image
              source={require('./src/images/male.png')}
              style={{width: 34, height: 34}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.genderBtn,
              {
                borderColor: selectedGender == 1 ? 'green' : 'black',
                backgroundColor: selectedGender == 1 ? '#DDF5DA' : '#fff',
              },
            ]}
            onPress={() => {
              setSelectedGender(1);
            }}>
            <Image
              source={require('./src/images/female.png')}
              style={{width: 34, height: 34}}
            />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            marginLeft: 25,
            marginTop: 30,
            fontSize: 16,
            fontWeight: '600',
          }}>
          {'Select Image'}
        </Text>
        <View style={styles.genderView}>
          {imageData.assets[0].uri == '' ? (
            <Image
              source={require('./src/images/user.png')}
              style={{width: 100, height: 100, borderRadius: 50}}
            />
          ) : (
            <Image
              source={{uri: imageData.assets[0].uri}}
              style={{width: 100, height: 100, borderRadius: 50}}
            />
          )}

          <TouchableOpacity
            style={{
              width: '40%',
              height: 50,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 0.5,
            }}
            onPress={() => {
              requestCameraPermission();
            }}>
            <Text>Choose Image</Text>
          </TouchableOpacity>
        </View>
        {imageData.assets[0].uri == '' ? null : (
          <Text style={{marginTop: 20, marginLeft: 30}}>
            {'Image File :' + imageData.assets[0].fileName}
          </Text>
        )}
        <TextInput
          style={styles.inputStyle}
          multiline={false}
          placeholder="Ref Name"
          value={refName}
          onChangeText={txt => setRefName(txt)}
        />
        <TextInput
          style={styles.inputStyle}
          maxLength={10}
          multiline={false}
          keyboardType={'phone-pad'}
          placeholder="Ref Mobile No"
          value={refMobile}
          onChangeText={txt => setRefMobile(txt)}
        />
        <TextInput
          style={styles.inputStyle}
          multiline={false}
          placeholder="Ref Relation"
          value={refRelation}
          onChangeText={txt => setRefRelation(txt)}
        />
        <TextInput
          style={styles.inputStyle}
          maxLength={10}
          placeholder="Alternate Mobile"
          multiline={false}
          keyboardType={'phone-pad'}
          value={altrMobile}
          onChangeText={txt => setAltrMobile(txt)}
        />
        <TextInput
          style={styles.inputStyle}
          keyboardType="number-pad"
          placeholder="Experience"
          maxLength={2}
          value={exp}
          onChangeText={txt => setExp(txt)}
        />

        <TouchableOpacity
          style={[
            styles.inputStyle,
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            },
          ]}
          onPress={() => {
            setCountryVisible(true);
          }}>
          <Text>{selectedCountry}</Text>
          <Image
            source={require('./src/images/dropdown.png')}
            style={{
              width: 20,
              height: 20,
              marginRight: 20,
              tintColor: '#8e8e8e',
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.inputStyle,
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            },
          ]}
          onPress={() => {
            if (stateList.length > 0) {
              setStateVisible(true);
            } else {
              alert('no states data found');
            }
          }}>
          <Text>{selectedState}</Text>
          <Image
            source={require('./src/images/dropdown.png')}
            style={{
              width: 20,
              height: 20,
              marginRight: 20,
              tintColor: '#8e8e8e',
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.inputStyle,
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            },
          ]}
          onPress={() => {
            if (cityList.length > 0) {
              setCityVisible(true);
            } else {
              alert('no cities data found');
            }
          }}>
          <Text>{selectedCity}</Text>
          <Image
            source={require('./src/images/dropdown.png')}
            style={{
              width: 20,
              height: 20,
              marginRight: 20,
              tintColor: '#8e8e8e',
            }}
          />
        </TouchableOpacity>
        <TextInput
          keyboardType="number-pad"
          style={styles.inputStyle}
          multiline={false}
          placeholder="Pincode"
          value={pincode}
          onChangeText={txt => setPincode(txt)}
        />
        <TouchableOpacity
          style={[
            styles.inputStyle,
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 30,
            },
          ]}
          onPress={() => {
            if (categoryList.length > 0) {
              setCategoryVisible(true);
            } else {
              alert('no category data found');
            }
          }}>
          <Text>{selectedCategory}</Text>
          <Image
            source={require('./src/images/dropdown.png')}
            style={{
              width: 20,
              height: 20,
              marginRight: 20,
              tintColor: '#8e8e8e',
            }}
          />
        </TouchableOpacity>
        <CountryModal
          data={countryList}
          countryVisible={countryVisible}
          setCountryVisible={setCountryVisible}
          onSelect={(x, i) => {
            setSelectedCountry(x);
            setCountryId('' + i);
            getApiState(i);
          }}
        />
        <StateModal
          data={stateList}
          stateVisible={stateVisible}
          setStateVisible={setStateVisible}
          onSelect={(x, i) => {
            setSelectedState(x);
            setStateId('' + i);
            getApiCity(i);
          }}
        />
        <CityModal
          data={cityList}
          cityVisible={cityVisible}
          setCityVisible={setCityVisible}
          onSelect={(x, i) => {
            setSelectedCity(x);
            setCityId('' + i);
          }}
        />
        <CategoryModal
          data={categoryList}
          categoryVisible={categoryVisible}
          setCategoryVisible={setCategoryVisible}
          onSelect={(x, i) => {
            setSelectedCategory(x);
            setServiceId('' + i);
          }}
        />
        <Loader
          loaderVisible={loaderVisible}
          setLoaderVisible={setLoaderVisible}
        />
        <View style={styles.termsView}>
          <CheckBox
            disabled={false}
            value={toggleCheckBox}
            onValueChange={newValue => setToggleCheckBox(newValue)}
          />
          <Text>
            By Selecting this checkbox you will accepy out terms & conditions
          </Text>
        </View>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            if (validateForm()) {
              submitData();
            } else {
              alert('Please Fill All data Correctly');
            }
          }}>
          <Text style={{color: '#fff', fontSize: 16}}>Submit Form</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: 60,
    backgroundColor: '#fff',
    elevation: 5,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  title: {
    fontSize: 20,
    color: '#000',
  },
  inputStyle: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    alignSelf: 'center',
    marginTop: 20,
    paddingLeft: 20,
  },
  genderView: {
    marginTop: 20,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  genderBtn: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
    width: '90%',
    height: 53,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: 'purple',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  termsView: {
    flexDirection: 'row',
    width: '90%',
    marginBottom: 20,
    alignSelf: 'center',
    alignItems: 'center',
  },
});
