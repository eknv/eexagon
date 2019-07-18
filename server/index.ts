import * as express from 'express'
import { express as voyagerMiddleware } from 'graphql-voyager/middleware'
import { importSchema } from 'graphql-import'

import verifyAccessToken from './middleware/verify-access-token'
import getUserFromDB from './middleware/get-user-from-db'

import createApolloServer from './apollo-server'
import * as resolvers from './resolvers'
import { schemaDirectives } from './directives'
import { formatError } from './errors'

import db from './db'
import pubsub from './pubsub'
import { logger } from './services/logger'

const {
  HOST_PROTOCOL,
  HOST_ADDRESS,
  SERVER_PORT,
  GRAPHQL_ENDPOINT,
  GRAPHQL_SUBSCRIPTIONS,
  PRISMA_ENDPOINT,
  NODE_ENV
} = process.env


const app = express()
app.use(
  '/back-graph',
  voyagerMiddleware({
    endpointUrl: PRISMA_ENDPOINT,
  })
)
app.use(
  '/front-graph',
  voyagerMiddleware({
    endpointUrl: GRAPHQL_ENDPOINT,
  })
)

// Middlewares for HTTP and WS connections
const connectionMiddlewares = [
  verifyAccessToken, // Verify and expose token information in req.user
  getUserFromDB, // Transform req.user to real DB user
]

app.post(GRAPHQL_ENDPOINT, ...connectionMiddlewares)

const server = createApolloServer(app, {
  graphqlEndpoint: GRAPHQL_ENDPOINT,
  subscriptionsEndpoint: GRAPHQL_SUBSCRIPTIONS,
  wsMiddlewares: connectionMiddlewares,
  apolloServerOptions: {
    formatError,
  },
  typeDefs: importSchema('server/schema/index.graphql'),
  resolvers,
  schemaDirectives,
  // @ts-ignore
  context: (params) => ({
    ...params,
    db,
    pubsub,
  }),
})


server.listen(
  {
    port: SERVER_PORT,
  },
  () => {
    logger.info(
      `🚀 GraphQL Server is running on ${HOST_PROTOCOL}${HOST_ADDRESS}:${SERVER_PORT}${GRAPHQL_ENDPOINT} in "${NODE_ENV}" mode\n`
    )
  }
)
