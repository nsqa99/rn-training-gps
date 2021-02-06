import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Callout, Marker} from 'react-native-maps';

export default function CustomMarker({
  latitude,
  longitude,
  isVisited,
  description,
}) {
  return (
    <Marker
      coordinate={{latitude: latitude, longitude: longitude}}
      pinColor={isVisited ? 'green' : 'orange'}>
      <Callout>
        <View style={styles.container}>
          <Text style={styles.bold}>{description}</Text>
          <Text style={isVisited ? styles.checkedText : styles.italicSmall}>
            {isVisited ? 'Checked in' : 'Pending...'}
          </Text>
        </View>
      </Callout>
    </Marker>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bold: {
    fontSize: 16,
    fontWeight: '700',
  },
  italicSmall: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  checkedText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'red',
  },
});
