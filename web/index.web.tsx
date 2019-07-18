import React from 'react';
import {render} from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';
import {BrowserRouter} from 'react-router-dom';
import App from './screens/App';
import registerServiceWorker from './registerServiceWorker';
import {ApolloProvider} from 'react-apollo';

import 'Common/init/i18n';
import apolloClient, {NetworkStatusNotifier} from 'Common/init/apollo';
import {ClapSpinner} from "react-spinners-kit";

const client = apolloClient('http://localhost:5000/graphql', 'ws://localhost:5000/graphql');

const errorStyle = {
  backgroundColor: 'black',
  color: 'red',
  padding: 30
} as React.CSSProperties;

const overlayStyle = {
  flex: 1,
  position: 'fixed',
  left: 110,
  top: 10
} as React.CSSProperties;


render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App/>
      <NetworkStatusNotifier render={({loading, error}: any) => (
        <div style={overlayStyle}>
          {error &&
          <div style={errorStyle}>
            An Error has occurred, please contact administrator!
          </div>
          }
          <ClapSpinner
            size={40}
            loading={loading}
            frontColor={"#FEC007"}
            backColor={"white"}
          />
        </div>
      )}/>
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
registerServiceWorker();
