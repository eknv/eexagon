import { Prisma } from 'prisma-binding';
import { typeDefs } from './schema/prisma-client/prisma-schema';

export default new Prisma({
  typeDefs: typeDefs,
  endpoint: `${ process.env.PRISMA_ENDPOINT }`,
  secret: `${ process.env.PRISMA_SECRET }`
})
