import React, {Fragment} from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  YellowBox
} from 'react-native';
import Config from 'react-native-config';

import SplashScreen from 'react-native-splash-screen';
import {AppNavigator} from './navigation/AppNavigator';

import {ApolloProvider} from 'react-apollo';
import apolloClient, {NetworkStatusNotifier} from 'Common/init/apollo';

import 'Common/init/i18n';

import Spinner from 'react-native-spinkit';
import XText from "X/XText";

YellowBox.ignoreWarnings(['Function components', 'Found @client']);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0
  }
});

interface IProps {
  skipLoadingScreen: boolean;
}

interface IStates {
  isLoadingComplete: boolean;
}


export default class App extends React.Component<IProps, IStates> {

  constructor(props: IProps) {
    super(props);

    this.state = {
      client: apolloClient(`${Config.HOST_PROTOCOL}${Config.HOST_ADDRESS}:${Config.SERVER_PORT}${Config.GRAPHQL_ENDPOINT}`,
        `${Config.WS_HOST_PROTOCOL}${Config.HOST_ADDRESS}:${Config.SERVER_PORT}${Config.GRAPHQL_SUBSCRIPTIONS}`),
      isLoadingComplete: false,
    };
  }


  public componentDidMount() {
    SplashScreen.hide();
  }


  public render() {

    return (

      <ApolloProvider client={this.state.client}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
          <AppNavigator/>

          <NetworkStatusNotifier render={({loading, error}) => (
            <Fragment>
              <View style={styles.overlay}>
                {error && <XText style={{backgroundColor: 'black', color: 'red', padding: 30}}>
                  An Error has occurred, please contact
                  administrator!</XText>}
                <Spinner isVisible={loading} size={100} type={'ThreeBounce'} color={'#FEC007'}/>
              </View>
            </Fragment>
          )}/>

        </View>
      </ApolloProvider>

    );
  }

}
