import * as jwksClient from 'jwks-rsa'
import jwt from 'jsonwebtoken'
import { AuthenticationError } from '../../errors'
import * as bcrypt from 'bcryptjs'
import { Context } from '../utils'

const jwks: any = jwksClient({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 1,
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
})


interface IUserToken {
  sub: string;
  email: string;
}

function verifyAndDecodeIdToken(idToken: any) {
  const invalidTokenMessage = 'Invalid id token.'

  return new Promise<IUserToken>((resolve, reject) => {
    const { header, payload }: any = jwt.decode(idToken, { complete: true }) || {}

    if (!header || !header.kid || !payload) {
      return reject(new AuthenticationError(invalidTokenMessage))
    }

    jwks.getSigningKey(header.kid, (err: any, key: any) => {
      if (err) {
        return reject(
          new AuthenticationError(
            `${invalidTokenMessage} Could not get signing key: ${err.message}`
          )
        )
      }

      jwt.verify(
        idToken,
        key.publicKey,
        { algorithms: ['RS256'] },
        (err: any, decoded: IUserToken) =>
          err
            ? reject(
              new AuthenticationError(
                `${invalidTokenMessage} JWT verification error: ${
                err.message
                }`
              )
            )
            : resolve(decoded)
      )
    })
  })
}


export default {
/*   async authenticate(parent: any, { idToken }: any, ctx: any, info: any) {
    const userToken: IUserToken = await verifyAndDecodeIdToken(idToken)

    const authId = userToken.sub

    let user = await ctx.db.query.user({ where: { authId } }, info)

    if (!user) {
      user = await ctx.db.mutation.createUser({
        data: {
          authId,
          email: userToken.email,
          // Other data can be added here from Auth0 user
        },
      })
    }

    return user
  }, */

  async signup(parent: any, args: any, ctx: Context) {
    const password = await bcrypt.hash(args.password, 10)
    const user = await ctx.prisma.createUser({ ...args, password })

    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user,
    }
  },

  async login(parent: any, { email, password }: any, ctx: Context) {
    const user = await ctx.prisma.user({ email })
    if (!user) {
      throw new Error(`#E No such user found for email: ${email}`)
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      throw new Error('#E Invalid password')
    }

    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user,
    }
  },
}
