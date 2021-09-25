const postsResolvers = require('./posts')
const usersResolvers = require('./users')

module.exports = {
  Query: {
    ...postsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
  },
}

// mutation{
//   createPost(body: "This is another post"){
//     id
//     body
//     createdAt
//     username
//   }
// }
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNGM2YmRjOGRiMzA2NWZiMjhhYWNiNCIsImVtYWlsIjoidXNlckBlbWFpbC5jb20iLCJ1c2VybmFtZSI6InVzZXIiLCJpYXQiOjE2MzI1OTA4MDQsImV4cCI6MTYzMjU5NDQwNH0.m_FEJmu-I6GIBtLOiZADQJy58h1tKOXFXZB3ypKR4ak

// mutation{
//   login(username:"user", password:"123456"){
//     id
//     username
//     token
//   }
// }
