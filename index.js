const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const cors = require('cors');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');
const db = require('./models');

const app = express();
app.use(cors());

const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
  await server.start(); // ✅ MUST be awaited before applyMiddleware
  server.applyMiddleware({ app });

  await db.sequelize.sync(); // Or { force: true } only in development

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

startServer();
