import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LastLocationScreen from '../screens/LastLocationScreen';

import React from 'react';
import MapScreen from '../screens/MapScreen';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const icons = {
  map: {
    selected: 'map',
    unselected: 'map-outline',
  },
  location: {
    selected: 'map-marker-radius',
    unselected: 'map-marker-radius-outline',
  },
};

const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: 'Your location',
          tabBarIcon: ({focused}) => {
            return (
              <Icon
                name={focused ? icons.map.selected : icons.map.unselected}
                size={25}
                color={focused ? 'tomato' : 'gray'}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="LastLocation"
        component={LastLocationScreen}
        options={{
          title: 'Your recent locations',
          tabBarIcon: ({focused}) => {
            return (
              <Icon
                name={
                  focused ? icons.location.selected : icons.location.unselected
                }
                size={25}
                color={focused ? 'tomato' : 'gray'}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTab;
