

import React from 'react';
// import styles from './LeftSideMenu.style';
import { NavigationActions, DrawerItems } from 'react-navigation';
import { ScrollView, StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import {
  Image as RoundedImage
} from 'react-native';
import {images} from 'Common/assets'
// import DrawerNavigatorItems from './DrawerNavigatorItems';
import XButton from 'X/XButton';

class LeftSideMenu extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render() {
    // @ts-ignore
    return <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }} style={styles.container}>

      <ScrollView>
        <XButton onPress={this.navigateToScreen('Home')}
        imageName="logo2"
        imageStyle={styles.Logo}
        transparent
        />

        <View>
          <DrawerItems {...this.props.itemsAtTop()} />
        </View>

      </ScrollView>

      <View style={styles.footerContainer}>
        <DrawerItems {...this.props.itemsAtBottom()} />
      </View>

    </SafeAreaView>;
  }
}


const filterItems = (WrappedComponent) => {
  class HOC extends React.Component<any, any> {

    itemsAtTop = () => {
      let topProps: any = Object.assign({}, this.props);
      let topItems = this.props.items.filter((item, index, array) => {
        return item.routeName === 'Home' || item.routeName === 'Entries';
      })
      delete topProps.items;
      topProps.items = topItems;
      return topProps
    }

    itemsAtBottom = () => {
      let topProps: any = Object.assign({}, this.props);
      let topItems: any = this.props.items.filter((item, index, array) => {
        return item.routeName === 'Login';
      })
      delete topProps.items;
      topProps.items = topItems;
      return topProps
    }

    render() {
      return (
        <WrappedComponent
          itemsAtTop={this.itemsAtTop}
          itemsAtBottom={this.itemsAtBottom}
          {...this.props}
        />
      );
    }
  }

  return HOC;
}


export default filterItems(LeftSideMenu);

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1
  },
  navItemStyle: {
    padding: 10
  },
  navSectionStyle: {
    backgroundColor: 'lightgrey'
  },
  sectionHeadingStyle: {
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  footerContainer: {
    marginBottom: 30
  },
  logoContainer: {
    backgroundColor: '#85144b'
  },
  logo: {
    width: 30,
    height: 30,
    borderRadius: 72.5,
    borderWidth: 20,
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10
  },
});
