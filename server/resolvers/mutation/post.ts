export default {
  async createDraft(parent:any, { title, text }:any, ctx:any, info:any) {
    const userId = ctx.req.user.id
    return ctx.db.mutation.createPost(
      {
        data: {
          title,
          text,
          isPublished: false,
          author: {
            connect: { id: userId },
          },
        },
      },
      info
    )
  },

/*   async publishPost(parent:any, { id }:any, ctx:any, info:any) {
    const userId = ctx.req.user.id
    const postExists = await ctx.db.exists.Post({
      id,
      author: { id: userId },
    })
    if (!postExists) {
      throw new Error(`#E Post not found or you're not the author`)
    }

    return ctx.db.mutation.updatePost(
      {
        where: { id },
        data: { isPublished: true },
      },
      info
    )
  }, */

/*   async updatePost(parent:any, { id, title, text }:any, ctx:any, info:any) {
    const userId = ctx.req.user.id
    const postExists = await ctx.db.exists.Post({
      id,
      author: { id: userId },
    })
    if (!postExists) {
      throw new Error(`#E Post not found or you're not the author`)
    }

    return ctx.db.mutation.updatePost(
      {
        where: { id },
        data: { title, text },
      },
      info
    )
  },
 */
/*   async deletePost(parent:any, { id }:any, ctx:any, info:any) {
    const userId = ctx.req.user.id
    const postExists = await ctx.db.exists.Post({
      id,
      author: { id: userId },
    })
    if (!postExists) {
      throw new Error(`#E Post not found or you're not the author`)
    }

    return ctx.db.mutation.deletePost({ where: { id } })
  }, */
}
