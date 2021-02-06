import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import BottomTab from './navigation/BottomTab';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <BottomTab />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
