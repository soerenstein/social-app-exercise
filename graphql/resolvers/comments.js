const { UserInputError } = require('apollo-server')

const Post = require('../../models/Post')
const checkAuth = require('../../util/checkAuth')

module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const { username } = checkAuth(context)
      if (body.trim() === '') {
        throw new UserInputError('Leerer Kommentar', {
          errors: {
            body: 'Kommentar darf nicht leer sein',
          },
        })
      }
      const post = await Post.findById(postId)
      if (post) {
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        })
        await post.save()
        return post
      } else throw new UserInputError('Post nicht gefunden')
    },
  },
}
