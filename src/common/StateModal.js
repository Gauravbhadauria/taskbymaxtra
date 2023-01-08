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

const StateModal = ({stateVisible, setStateVisible, onSelect, data}) => {
  return (
    <Modal
      visible={stateVisible}
      onRequestClose={() => {
        setStateVisible(false);
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
            Select State
          </Text>
          <FlatList
            data={data}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={styles.itemView}
                  onPress={() => {
                    setStateVisible(false);
                    onSelect(item.state_name, item.id);
                  }}>
                  <Text>{item.state_name}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default StateModal;
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
    height: height / 2,
  },
  itemView: {
    width: '90%',
    alignSelf: 'center',
    height: 50,
    borderBottomWidth: 0.3,
    justifyContent: 'center',
  },
});
