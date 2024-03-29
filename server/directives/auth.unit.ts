import { authDirectives } from './auth'
import { AuthenticationError, ForbiddenError } from '../errors'
import { any } from 'prop-types';

describe('isAuthenticated directive', () => {
  const { isAuthenticated } = authDirectives

  it('throws error if the user is not authenticated', () => {
    const next = jest.fn()
    const req: any = { user: undefined };
    expect(() => isAuthenticated(next, null, null, { req })).toThrow(
      AuthenticationError
    )
    expect(next).not.toHaveBeenCalled()
  })

  it('passes if user is authenticated', () => {
    const next = jest.fn()
    const req = { user: {} }
    expect(() => isAuthenticated(next, null, null, { req })).not.toThrow()
    expect(next).toHaveBeenCalled()
  })
})

describe('hasRole directive', () => {
  const { hasRole } = authDirectives

  it("throws error if the user's role does not match", () => {
    const next = jest.fn()
    const req = { user: { role: 'something else' } }
    const args = { roles: ['something'] }

    expect(() => hasRole(next, null, args, {})).toThrow(AuthenticationError)
    expect(() => hasRole(next, null, args, { req })).toThrow(ForbiddenError)
    expect(next).not.toHaveBeenCalled()
  })

  it("passes if the user's role matches", () => {
    const next = jest.fn()
    const req = { user: { role: 'something' } }
    const args = { roles: ['something'] }

    expect(() => hasRole(next, null, args, { req })).not.toThrow()
    expect(next).toHaveBeenCalled()
  })
})

describe('isAdmin directive', () => {
  const { isAdmin } = authDirectives

  it('throws error if the user is not admin', () => {
    const next = jest.fn()
    const req = { user: { role: 'something' } }

    expect(() => isAdmin(next, null, null, {})).toThrow(AuthenticationError)
    expect(() => isAdmin(next, null, null, { req })).toThrow(ForbiddenError)
    expect(next).not.toHaveBeenCalled()
  })

  it('passes if the user is admin', () => {
    const next = jest.fn()
    const req = { user: { role: 'ADMIN' } }

    expect(() => isAdmin(next, null, null, { req })).not.toThrow()
    expect(next).toHaveBeenCalled()
  })
})
