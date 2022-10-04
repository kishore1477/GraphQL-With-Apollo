
const express = require("express")
const cors = require("cors")
const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require("./typeDefs")
const resolvers = require("./resolers")

const db = "mongodb://apollo:apollo1@ac-u5ulbjn-shard-00-00.zcntjhc.mongodb.net:27017,ac-u5ulbjn-shard-00-01.zcntjhc.mongodb.net:27017,ac-u5ulbjn-shard-00-02.zcntjhc.mongodb.net:27017/AGEM?ssl=true&replicaSet=atlas-82hr4f-shard-0&authSource=admin&retryWrites=true&w=majority"


async function startServer() {
  const app = express()
  app.use(cors())
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  })
  await apolloServer.start()
  apolloServer.applyMiddleware({ app });
  // apolloServer.applyMiddleware({ app, path:"/newUrl"});
  app.use((req, res) => {
    res.send("Apollo server is running")
  })
  await mongoose.connect(db)
  console.log("Connected")
  app.listen(4000, () =>
    console.log(`🚀 Server ready at http://localhost:4000`)
  )
}
startServer()