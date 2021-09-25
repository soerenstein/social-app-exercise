const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')
require('dotenv').config()

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
})

mongoose
  .connect(process.env.DB_MONGO_ATLAS, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB Connected')
    return server.listen({ port: 5000 })
  })

server.listen({ port: 5000 }).then((res) => {
  console.log(`Server running at ${res.url}`)
})
