
import React from 'react';
import { StyleSheet, View } from 'react-native';
import XText from 'X/XText';

/* import { Heading } from '@shoutem/ui' */

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
})

const GlobalSearch = (props) => (
  <View style={styles.container}>
    <XText>This is the GLOBAL search form </XText>
  </View>
)

GlobalSearch.navigationOptions = {
  title: 'Global Search',
}

export default GlobalSearch;
