import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, Text, TextInput, KeyboardAvoidingView, Modal, View, NativeModules } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('screen');
const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
let MARKER_CONDITION = '#391306';

export default function App() {
  const [markers, setMarkers] = useState([]);

  const [modalVisible, changeModalVisibility] = useState(false);
  const [settingNewMarker, changeSettingNewMarker] = useState(false);

  const newMarkerSelection = () => {
    if (newMarkerTitle == null || newMarkerTitle == '' || newMarkerDescription == null || newMarkerDescription == '') {
      return;
    }
    changeModalVisibility(false);
    changeSettingNewMarker(true);
  }

  const showModal = () => {
    changeModalVisibility(true);

    MARKER_CONDITION = '#391306';
    setNewMarkerTitle(null);
    setNewMarkerDescription(null);
  }
  const hideModal = () => changeModalVisibility(false);

  async function loadCurrentMarkers() {
    const token = 'vv7oTsHdw0X9g5e7QbniP58j3iJY4h6AoOSxMIw2X8xjokSHjF';

    const headerOptions = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }

    const response = await fetch('https://mobile.ect.ufrn.br:3003/markers', headerOptions);
    const responseJson = await response.json();

    setMarkers(responseJson);
  }
  const saveNewMarker = (location) => {
    if (!settingNewMarker) { return; }
    async function saveMarker() {
      const token = 'vv7oTsHdw0X9g5e7QbniP58j3iJY4h6AoOSxMIw2X8xjokSHjF';

      const json = {
        title: newMarkerTitle,
        description: newMarkerDescription,
        latitude: location.latitude,
        longitude: location.longitude
      }
      const headerOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(json)
      }

      const response = await fetch('https://mobile.ect.ufrn.br:3003/markers', headerOptions);
      loadCurrentMarkers();
    }
    changeSettingNewMarker(false);
    saveMarker();
  }

  const [newMarkerTitle, setNewMarkerTitle] = useState('');
  const [newMarkerDescription, setNewMarkerDescription] = useState('');

  useEffect(() => {
    loadCurrentMarkers();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <MapView
        style={styles.mapView}
        showsUserLocation={true}
        zoomEnabled={true}
        loadingEnabled={true}
        onPress={(event) => saveNewMarker(event.nativeEvent.coordinate)}
      >
        {
          markers.map((marker, id) => <Marker
            key={id}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            title={marker.title}
            description={marker.description}
          />)
        }
      </MapView>
      {
        (!modalVisible && !settingNewMarker) && <TouchableOpacity style={styles.setNewMarker} onPress={showModal}>
          <Icon name='add-circle' size={60} color='#004d00' />
        </TouchableOpacity>
      }

      <Modal
        animationType='fade'
        visible={modalVisible}
        transparent={true}
        backgroundColor={'rgba(100,100,100, 0.5)'}
        onDismiss={hideModal}
      >
        <KeyboardAvoidingView style={styles.modalStyle}>
          <View style={styles.modalStatusBar}>
            <TouchableOpacity style={styles.closeModal} onPress={hideModal}>
              <Icon name='md-close' size={40} />
            </TouchableOpacity>
          </View>
          <View style={styles.dataView}>
            <Text style={styles.dataViewText}>Título</Text>
            <TextInput
              style={styles.dataViewInput}
              placeholder={'Insira o titulo desejado!'}
              onChangeText={content => {
                setNewMarkerTitle(content);

                if (newMarkerTitle == null || newMarkerTitle == '' || newMarkerDescription == null || newMarkerDescription == '') {
                  MARKER_CONDITION = '#391306';
                } else {
                  MARKER_CONDITION = '#007500';
                }
              }}
              defaultValue={newMarkerTitle}
            />
            <Text style={styles.dataViewText}>Descrição</Text>
            <TextInput
              style={styles.dataViewInput}
              placeholder={'Insira a descrição desejada!'}
              onChangeText={content => {
                setNewMarkerDescription(content);

                if (newMarkerTitle == null || newMarkerTitle == '' || newMarkerDescription == null || newMarkerDescription == '') {
                  MARKER_CONDITION = '#391306';
                } else {
                  MARKER_CONDITION = '#007500';
                }
              }}
              defaultValue={newMarkerDescription}
            />
            <Text style={styles.hint}>Clique para selecionar o ponto desejado!</Text>
            <TouchableOpacity style={styles.selectPoint} onPress={newMarkerSelection}>
              <FontAwesome name='map-marker' size={40} color={MARKER_CONDITION} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapView: {
    width, height,
  },
  setNewMarker: {
    position: 'absolute',

    alignItems: 'center',
    bottom: 30,
  },
  newMarkerConfig: {
    alignItems: 'center',
  },

  modalStyle: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0, 0.5)',
  },
  modalStatusBar: {
    backgroundColor: '#004d00',

    height: STATUSBAR_HEIGHT,

    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeModal: {
    position: 'absolute',
    top: 30,
    right: 30,
  },
  dataView: {
    position: 'absolute',
    padding: 15,
    borderRadius: 10,
    top: 120,
    alignSelf: 'center',
    backgroundColor: '#EEAD2D'
  },
  dataViewText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  dataViewInput: {
    fontSize: 15,
    height: 24,
    color: '#fff',

    width: width - 60,
    borderWidth: 1,
    marginVertical: 4,
  },
  hint: {
    marginTop: 20,
    alignSelf: 'center',

    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  selectPoint: {
    alignSelf: 'center',
    marginTop: 20,
  }
});
