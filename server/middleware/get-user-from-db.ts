import db from '../db'

export default async function(req:any, res:any, next:any) {
  if (req.user) {
    const user = await db.query.user({
      where: { authId: req.user.sub },
    })

    // Expose user in request object
    req.user = { token: req.user, ...user }
  }

  next()
}
