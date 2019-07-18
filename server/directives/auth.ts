import { AuthenticationError, ForbiddenError } from '../errors'

const getUser = ({ req = {}, request = {} }:any) => req.user || request.user || null

const hasRole = (roles:any, ctx:any) => {
  const { role = '' } = getUser(ctx) || {}
  return role && roles.includes(role)
}

const assertAuth = (ctx:any) => {
  if (!getUser(ctx)) {
    throw new AuthenticationError('Access token is missing or expired')
  }
}

// Directive resolvers (apollo v1 syntax)
export const authDirectives = {
  isAuthenticated(next:any, source:any, args:any, ctx:any) {
    assertAuth(ctx)
    return next()
  },

  hasRole(next:any, source:any, { roles }:any, ctx:any) {
    assertAuth(ctx)
    if (!hasRole(roles, ctx)) {
      throw new ForbiddenError('Insufficient permissions')
    }
    return next()
  },

  isAdmin(next:any, source:any, args:any, ctx:any) {
    assertAuth(ctx)
    if (!hasRole(['ADMIN'], ctx)) {
      throw new ForbiddenError('Insufficient permissions')
    }
    return next()
  },
}
