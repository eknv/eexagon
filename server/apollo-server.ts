import * as http from 'http'
import {ApolloServer, makeExecutableSchema} from 'apollo-server-express'
import {applyMiddleware as applyGraphQLMiddleware} from 'graphql-middleware'
import {logger} from './services/logger'
import {stringifyWithSeparator} from "Common/utils";

/**
 *
 * @description Creates an Apollo Server. Setup based on `vue-cli-plugin-apollo`.
 * @param {Object} app Express application
 * @param {Object} options Apollo options
 * @returns {Object} HTTP Server
 */
export default function createApolloServer(
  app: any,
  {
    // Main options
    graphqlEndpoint = '',
    typeDefs = {},
    resolvers = {},
    schemaDirectives = {},
    directiveResolvers = {},
    graphqlMiddlewares = [],
    dataSources = () => ({}),
    context = () => ({}),
    // Subscriptions
    subscriptionsEndpoint = '',
    wsMiddlewares = [],
    // Mocks
    mocks,
    // Apollo Engine
    engineKey = '',
    // HTTP options
    cors = true,
    timeout = 120000,
    // Extra options for Apollo Server
    apolloServerOptions = {},
  }: any
) {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    schemaDirectives,
    directiveResolvers,
    resolverValidationOptions: {
      requireResolversForResolveType: false,
    },
  })

  // Apollo server options
  const options = {
    ...apolloServerOptions,
    schema: applyGraphQLMiddleware(schema, ...graphqlMiddlewares),
    tracing: true,
    cacheControl: true,
    engine: engineKey
      ? {
        apiKey: engineKey,
      }
      : false,
    dataSources,
    // Resolvers context in POST requests
    context: async ({req, connection}: any) => {
      let contextData
      try {
        if (connection) {
          contextData = {
            ...connection.context,
          }
        } else {
          contextData = await context({
            req,
            request: req,
          })
        }
      } catch (err) {
        logger.error(err)
        throw err
      }

      return contextData
    },
    // Resolvers context in WebSocket requests
    subscriptions: {
      path: subscriptionsEndpoint,
      onConnect: async (connection: any, websocket: any) => {
        const {authorization} = connection

        let contextData = {}
        try {
          // Simulate `req` object for auth
          const req = {
            headers: {
              authorization,
            },
          }

          // Call all middlewares in order and modify `req`
          await new Promise((resolve, reject) =>
            wsMiddlewares.reduceRight(
              (acc: any, m: any) => (err: any) => (err ? reject(err) : m(req, null, acc)),
              (err: any) => (err ? reject(err) : resolve())
            )()
          )

          contextData = await context({
            connection,
            websocket,
            request: req,
            req,
          })
        } catch (err) {
          if (err.status !== 401) {
            logger.error(err)
          }

          throw err
        }

        return contextData
      },
    },
    // TODO: introduce proper logging
    formatError: (error: any) => {
      console.log(stringifyWithSeparator(error, "\n"));
      return error
    },
    formatResponse: (response: any, request: any) => {
      // TODO: this should be active for the debug mode
      // console.log('response: ', response)
      // console.log("something: ", request);
      return response
    },
  }

  // Automatic mocking
  if (mocks) {
    options.mocks = mocks

    if (process.env.NODE_ENV === 'production') {
      logger.warn(`⚠️  Automatic mocking is enabled in production`)
    } else {
      logger.info(`✔️  Automatic mocking is enabled`)
    }
  }

  // Apollo Server
  const server = new ApolloServer(options)

  // Express middleware
  server.applyMiddleware({
    app,
    cors,
    path: graphqlEndpoint,
    // gui: {
    //   endpoint: graphqlEndpoint,
    //   subscriptionEndpoint: graphqlSubscriptionsPath,
    // },
  })

  // Create HTTP server and add subscriptions
  const httpServer = http.createServer(app)
  httpServer.setTimeout(timeout)
  server.installSubscriptionHandlers(httpServer)

  return httpServer
}
