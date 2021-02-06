import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  DeviceEventEmitter,
  ScrollView,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getLocation = async () => {
  try {
    return await AsyncStorage.getItem('LAST_LOC');
  } catch (e) {
    console.log(e);
  }
};

const RecentLocation = ({location}) => {
  //   console.log('data here here', location);
  return (
    <View style={styles.locationContainer}>
      <Text style={styles.time}>
        {new Date(location?.timestamp).toLocaleString()}
      </Text>
      <View style={styles.metricContainer}>
        <Text style={styles.boldLabel}>
          Latitude: <Text style={styles.smallText}>{location?.latitude}</Text>
        </Text>
        <Text style={styles.boldLabel}>
          Longitude: <Text style={styles.smallText}>{location?.longitude}</Text>
        </Text>
      </View>
    </View>
  );
};

const LastLocationScreen = () => {
  const [locations, setLocations] = useState([]);

  const getRecentLocations = async () => {
    const recentLocations = await getLocation();
    if (recentLocations) {
      const data = JSON.parse(recentLocations);
      //   console.info('data rcv', data);
      setLocations(data);
    } else {
      setLocations([]);
    }
  };

  useEffect(() => {
    getRecentLocations();
    DeviceEventEmitter.addListener('save_event', () => {
      //   console.log('received event');
      getRecentLocations();
    });

    return () => DeviceEventEmitter.removeAllListeners('save_event');
  }, []);
  return (
    <>
      <ScrollView style={styles.container}>
        {locations.length > 0 ? (
          <View style={{alignItems: 'center'}}>
            {locations.map((location) => {
              //   console.info('location rcv', location);
              return (
                <RecentLocation location={location} key={location?.timestamp} />
              );
            })}
          </View>
        ) : (
          <View
            style={{
              height: 600,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.emptyLabel}>No location available</Text>
          </View>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
  },
  boldLabel: {
    fontSize: 15,
    fontWeight: '700',
  },
  time: {
    alignSelf: 'flex-start',
    fontWeight: '400',
    fontStyle: 'italic',
    margin: 5,
  },
  locationContainer: {
    backgroundColor: '#fff',
    width: 370,
    height: 100,
    padding: 5,
    alignItems: 'center',
    borderRadius: 7,
    margin: 5,
  },
  metricContainer: {
    width: 350,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 10,
  },
  smallText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'red',
  },
  emptyLabel: {
    fontSize: 35,
    fontStyle: 'italic',
    color: 'black',
    fontWeight: '600',
    opacity: 0.5,
  },
});

export default LastLocationScreen;
