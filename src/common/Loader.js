import {
  View,
  Text,
  Modal,
  StyleSheet,
  FlatList,
  TouchableOpacityBase,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
const {width, height} = Dimensions.get('window');

const Loader = ({loaderVisible, setLoaderVisible}) => {
  return (
    <Modal
      visible={loaderVisible}
      onRequestClose={() => {
        setLoaderVisible(false);
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
            uploading data...
          </Text>
          <ActivityIndicator />
        </View>
      </View>
    </Modal>
  );
};

export default Loader;
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
    borderRadius: 20,
    padding: 20,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
