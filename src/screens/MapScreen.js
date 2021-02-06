import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  DeviceEventEmitter,
  Dimensions,
} from 'react-native';
import RNLocation from 'react-native-location';
import {MapComponentMemo} from '../components/MapComponent';
import MapComponent from '../components/MapComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackgroundTimer from 'react-native-background-timer';
import useNativeLocationTracking from '../hooks/useNativeLocationTracking';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';

const SAVING_TIME_OUT = (1000 * 60 * 1) / 2;

const storeLocation = async (location) => {
  try {
    await AsyncStorage.setItem('LAST_LOC', JSON.stringify(location));
    DeviceEventEmitter.emit('save_event');
    console.log('hi');
  } catch (e) {
    // saving error
    console.log(e);
  }
};

const getLocation = async () => {
  try {
    return await AsyncStorage.getItem('LAST_LOC');
  } catch (e) {
    console.log(e);
  }
};

const MapScreen = () => {
  const [loc, setLoc] = useState({
    latitude: 0,
    longitude: 0,
  });

  const location = useSelector((state) => state.location, shallowEqual);
  const dispatch = useDispatch();
  console.info('render main screen');

  const locationRef = useRef();
  locationRef.current = loc;

  const [listLocations, setListLocations] = useState([]);
  const listLocationsRef = useRef();
  listLocationsRef.current = listLocations;

  const storingLocationInterval = () => {
    return BackgroundTimer.setInterval(() => {
      const currentListLoc = listLocationsRef.current;
      const currentLoc = locationRef.current;
      if (currentListLoc?.length > 0) {
        const currentLocationTimestamp = currentLoc?.timestamp;
        const lastLocationTimestamp = currentListLoc[0]?.timestamp;
        // console.log('now time ', currentLocationTimestamp);
        // console.log('last time ', lastLocationTimestamp);
        if (currentLocationTimestamp || lastLocationTimestamp) {
          if (
            parseInt(currentLocationTimestamp) > parseInt(lastLocationTimestamp)
          ) {
            setListLocations([currentLoc, ...currentListLoc]);
            storeLocation(listLocationsRef.current);
          }
        }
      } else {
        setListLocations([currentLoc, ...currentListLoc]);
        storeLocation(listLocationsRef.current);
      }

      console.log('here inside set interval', listLocationsRef.current);
    }, SAVING_TIME_OUT);
  };

  useNativeLocationTracking(dispatch);

  return (
    <>
      <SafeAreaView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <MapComponent
          currentPos={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({});

export default MapScreen;
