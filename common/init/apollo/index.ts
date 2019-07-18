import CONSTANTS from 'Common/constants';
import {ApolloClient} from 'apollo-client';
import {createHttpLink} from 'apollo-link-http';
import {withClientState} from 'apollo-link-state';
import {ApolloLink} from 'apollo-link';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {setContext} from 'apollo-link-context';
import {split} from 'apollo-link';
import {WebSocketLink} from 'apollo-link-ws';
import {getMainDefinition} from 'apollo-utilities';
import {load} from 'Common/storage';
import {createNetworkStatusNotifier} from 'react-apollo-network-status';

const {
  NetworkStatusNotifier,
  link: networkStatusNotifierLink
} = createNetworkStatusNotifier();

export {NetworkStatusNotifier};

const apolloClient = (httpAddress: string, wsAddress: string): ApolloClient<any> => {

  const cache = new InMemoryCache();

  const defaultState: any = {
    localEntrySearchCriteria: {
      __typename: 'localEntrySearchCriteria',
      queryVariable: null,
      skip: 0,
      first: 0,
      count: 0,
    },
  };

  const stateLink = withClientState({
    cache,
    defaults: defaultState,
    resolvers: {
      Mutation: {
        updateLocalEntrySearchCriteria: (_: any, data: any, {cache}: any): any => {
          const _newData = Object.assign(defaultState.localEntrySearchCriteria, data);
          defaultState.localEntrySearchCriteria = _newData;
          defaultState.localEntrySearchCriteria.count = defaultState.localEntrySearchCriteria.count + 1;
          cache.writeData({data: defaultState});
          return null;
        },
      },
    },
  });

  const httpLink = createHttpLink({uri: httpAddress});

  //todo, provide authentification also on the mobile side
  const authLink = setContext((_, {headers}) => {
    const token = load(CONSTANTS.AUTH_TOKEN);
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const wsLink = new WebSocketLink({
    uri: wsAddress,
    options: {
      reconnect: true,
      //todo, provide authentication on mobile
      /*      connectionParams: {
              authToken: load(CONSTANTS.AUTH_TOKEN),
            },*/
    },
  });

  const serverLink = split(
    ({query}) => {
      // @ts-ignore
      const {kind, operation} = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink//authLink.concat(httpLink),
  );

  return new ApolloClient({
    cache,
    link: ApolloLink.from([networkStatusNotifierLink, stateLink, serverLink]),
  });

}

export default apolloClient;

