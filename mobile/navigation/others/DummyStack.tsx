import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import XText from 'X/XText';

class Item extends React.Component<any, any> {

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.routeName
  })

  render() {
    return (
      <View style={styles.container}>
        <XText style={styles.text}>{`My name is: ${this.props.navigation.state.routeName}`}</XText>
      </View>
    )
  }
}


Item.navigationOptions = {
  // @ts-ignore
  title: 'Dummy',
};


export default Item

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#c0392b',
    padding: 20,
  },
  text: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  }
})
