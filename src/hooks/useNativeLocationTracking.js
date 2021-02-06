import React, {useEffect, useMemo} from 'react';
import {DeviceEventEmitter, NativeModules} from 'react-native';
import RNLocation from 'react-native-location';
import {UPDATE_LOCATION} from '../redux/actions';
import {useDispatch} from 'react-redux';

const JS_LOCATION_EVENT_NAME = 'location_received';

export default useNativeLocationTracking = (dispatch) => {
  // console.info('props', );
  return useEffect(() => {
    let subscription;

    RNLocation.requestPermission({
      ios: 'always', // or 'whenInUse'
      android: {
        detail: 'fine', // or 'coarse'
        rationale: {
          title: 'We need to access your location',
          message:
            'We use your location while your run to calculate your distance and pace',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      },
    }).then((granted) => {
      if (granted) {
        subscription = DeviceEventEmitter.addListener(
          JS_LOCATION_EVENT_NAME,
          (event) => {
            // console.log('received event: ', event);
            dispatch({type: UPDATE_LOCATION, payload: event});

            // console.log('dispatched to the store');
          },
        );

        NativeModules.LocationManager.startLocationTracking();
      }
    });

    return () => {
      if (subscription) subscription.remove();
    };
  }, []);
};
