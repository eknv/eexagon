// Navigators
import {createBottomTabNavigator, createDrawerNavigator, createStackNavigator} from 'react-navigation';
import GlobalSearch from '../screens/GlobalSearch';
import FormScreen from '../screens/FormScreen';
import HomeScreen from '../screens/HomeScreen';
import LeftSideMenu from './LeftSideMenu';
import DummyStack from './others/DummyStack';
import LoginScreen from '../screens/LoginScreen';
import MultiSelect from '../screens/MultiSelect';
/* import {
  makeHot,
  clearCacheFor,
  redraw
} from 'haul/hot'; */

import EntrySearch from 'S/entries/entry-search';
import EntryResult from 'S/entries/entry-result';

// Placeholder imports


const EntriesTabs = createBottomTabNavigator({
  EntrySearch: {screen: EntrySearch},
  EntryResult: {screen: EntryResult},
}, {
  order: ['EntrySearch', 'EntryResult']
});

/* const HotViews = {
  HomeScreen: makeHot(() => HomeScreen, 'HomeScreen'),
  DummyStack: makeHot(() => DummyStack, 'DummyStack'),
  GlobalSearch: makeHot(() => GlobalSearch, 'GlobalSearch')
}; */

const Home = createStackNavigator({
  MultiSelect: {screen: MultiSelect},
  HomeScreen: {screen: HomeScreen},
  FormScreen: {screen: FormScreen},
  Item: {screen: DummyStack},
  GlobalSearch: {screen: GlobalSearch},
}, {
  initialRouteName: 'MultiSelect',
})

export const AppNavigator = createDrawerNavigator({
    Entries: {screen: EntriesTabs},
    Home: {screen: Home},
    Login: {screen: LoginScreen},
  },
  {
    drawerPosition: 'left',
    // @ts-ignore
    contentComponent: LeftSideMenu
  })

/*
export const AppNavigator = createDrawerNavigator({
    Drawer: {screen: DrawerLeft},
  },
  {
    drawerPosition: 'right',
    contentComponent: GlobalSearch,
  })
*/


/* if (module.hot) {
  module.hot.accept('../screens/HomeScreen.tsx', () => {
    clearCacheFor(require.resolve('../screens/HomeScreen'));
    redraw(() => require('../screens/HomeScreen').default, 'HomeScreen');
  });

  module.hot.accept('../components/global-search/GlobalSearch.tsx', () => {
    clearCacheFor(require.resolve('../components/global-search/GlobalSearch'));
    redraw(() => require('../components/global-search/GlobalSearch').default, 'GlobalSearch');
  });

  module.hot.accept('./others/DummyStack.tsx', () => {
    clearCacheFor(require.resolve('./others/DummyStack'));
    redraw(() => require('./others/DummyStack').default, 'DummyStack');
  });

} */
