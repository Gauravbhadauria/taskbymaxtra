import {
  View,
  Text,
  Modal,
  StyleSheet,
  FlatList,
  TouchableOpacityBase,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
const {width, height} = Dimensions.get('window');

const CountryModal = ({countryVisible, setCountryVisible, onSelect, data}) => {
  return (
    <Modal
      visible={countryVisible}
      onRequestClose={() => {
        setCountryVisible(false);
      }}>
      <View style={styles.container}>
        <View style={styles.modalView}>
          <Text
            style={{
              margin: 20,
              alignSelf: 'center',
              fontSize: 18,
              fontWeight: '700',
            }}>
            Select Country
          </Text>
          <FlatList
            data={data}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={styles.itemView}
                  onPress={() => {
                    setCountryVisible(false);
                    onSelect(item.country_name, item.id);
                  }}>
                  <Text>{item.country_name}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CountryModal;
const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    position: 'absolute',
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  modalView: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  itemView: {
    width: '90%',
    alignSelf: 'center',
    height: 50,
    borderBottomWidth: 0.3,
    justifyContent: 'center',
    paddingLeft: 20,
  },
});
