import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import MapView, {Heatmap, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import deepEqual from '../utils/deepEqual';
import getPlaceVisited from '../utils/getPlaceVisited';
import CustomMarker from './CustomMarker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const customMarkers = [
  {
    id: 0,
    latitude: 20.96695,
    longitude: 105.764563,
    description: 'Rose Market',
  },
  {
    id: 1,
    latitude: 20.968873,
    longitude: 105.755858,
    description: 'Swimming pool',
  },
  {
    id: 2,
    latitude: 20.967685,
    longitude: 105.7556167,
    description: 'Bus stop',
  },
  {
    id: 3,
    latitude: 20.964966,
    longitude: 105.759194,
    description: 'Parkcity',
  },
  {
    id: 4,
    latitude: 20.968372,
    longitude: 105.758056,
    description: 'Restaurant',
  },
];

const MapComponent = ({currentPos}) => {
  const {latitude, longitude} = currentPos;
  console.info(latitude, longitude);

  const [region, setRegion] = useState({
    latitude: 21.027763,
    longitude: 105.83416,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });

  const [visitedState, setVisitedState] = useState({
    id: 0,
    isVisited: false,
  });

  useEffect(() => {
    const visitedPlace = getPlaceVisited(currentPos, customMarkers);
    console.info('place', visitedPlace);
    setVisitedState(visitedPlace);

    setRegion({
      ...region,
      latitude: latitude,
      longitude: longitude,
    });
  }, [currentPos]);
  console.info('render map');
  return (
    <View style={styles.container}>
      <MapView
        loadingEnabled={true}
        // showsUserLocation={visitedState.isVisited ? true : false}
        initialRegion={region}
        region={region}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}>
        <Marker
          coordinate={{
            latitude: latitude !== 0 ? latitude : 0,
            longitude: longitude !== 0 ? longitude : 0,
          }}
          title="Your location here"
          // image={}
        >
          <Image
            source={require('../../assets/location.png')}
            style={{height: 35, width: 35}}
          />
        </Marker>
        {customMarkers.map((marker, index) => {
          return (
            <CustomMarker
              latitude={marker.latitude}
              longitude={marker.longitude}
              description={marker.description}
              isVisited={
                visitedState.id === index ? visitedState.isVisited : false
              }
              key={marker.id}
            />
          );
        })}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 600,
    width: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
// export const MapComponentMemo = React.memo(MapComponent);
export default MapComponent;
