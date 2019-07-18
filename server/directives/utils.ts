import { UserInputError } from '../errors'
import { FileUtils } from '../utils';

const getQueryStr = ({ req: { body: { query } = '' } }:any) => query

export const utilsDirectives = {
  maxDepth(next:any, source:any, args:any, ctx:any) {
    const query = getQueryStr(ctx)
    const currentDepth = FileUtils.calculateQueryDepth(query)
    if (currentDepth <= args.depth) return next()
    throw new UserInputError(
      `Too many nested queries. Maximum is ${args.depth}, got ${currentDepth}`
    )
  },
}
