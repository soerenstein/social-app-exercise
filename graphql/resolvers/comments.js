const { AuthenticationError, UserInputError } = require('apollo-server')

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
    async deleteComment(_, { postId, commentId }, context) {
      const { username } = checkAuth(context)

      const post = await Post.findById(postId)

      if (post) {
        const commentIndex = post.comments.findIndex((c) => c.id === commentId)
        if (post.comments[commentIndex].username === username) {
          post.comments.splice(commentIndex, 1)
          await post.save()
          return post
        } else {
          throw new AuthenticationError('Unzulässiger Befehl')
        }
      } else {
        throw new UserInputError('Post nicht gefunden')
      }
    },
  },
}
