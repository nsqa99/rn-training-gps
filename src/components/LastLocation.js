import React, {useState} from 'react';
import {Text, TouchableOpacity, DeviceEventEmitter} from 'react-native';

const LastLocation = ({lastLoc}) => {
  const [visible, setVisible] = useState(false);

  // console.log('last loc ', typeof lastLoc);
  const {latitude, longitude} = lastLoc;

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setVisible(!visible);
        }}
        style={{
          padding: 10,
          marginTop: 30,
          backgroundColor: '#ddd',
          borderRadius: 5,
        }}>
        <Text style={{fontSize: 20}}>Your recent location</Text>
      </TouchableOpacity>
      {visible ? (
        latitude ? (
          <>
            <Text>Latitude: {latitude}</Text>
            <Text>Longitude: {longitude}</Text>
          </>
        ) : (
          <Text>Nothing to display</Text>
        )
      ) : (
        <></>
      )}
    </>
  );
};

export default LastLocation;
