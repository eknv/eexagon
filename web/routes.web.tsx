import React from 'react';
import Home from './screens/home/home';

import Header from './screens/layout/header';
import Footer from './screens/layout/footer';
import Left from './screens/layout/left';
import Right from './screens/layout/right';

import EntrySearch from 'S/entries/entry-search';
import EntryResult from 'S/entries/entry-result';
import XText from 'X/XText';

const routes = [
  {
    path: '/',
    exact: true,
    header: () => <Header />,
    left: () => <Left />,
    main: () => <Home />,
    right: () => <Right />,
    footer: () => <Footer />,
  },
  {
    path: '/entries',
    exact: true,
    header: () => <Header />,
    left: () => <EntrySearch />,
    main: () => <EntryResult />,
    right: () => <Right />,
    footer: () => <Footer />,
  },
  {
    path: '/lists',
    exact: true,
    header: () => <Header />,
    left: () => <Left />,
    main: () => <XText> Lists </XText>,
    right: () => <Right />,
    footer: () => <Footer />,
  },
  {
    path: '/reports',
    exact: true,
    header: () => <Header />,
    left: () => <Left />,
    main: () => <XText> Reports </XText>,
    right: () => <Right />,
    footer: () => <Footer />,
  },
];

export default routes;
