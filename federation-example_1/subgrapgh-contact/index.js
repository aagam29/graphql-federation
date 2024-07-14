import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { ApolloServer } from '@apollo/server';
import { readFileSync } from 'fs';
import { resolvers } from './resolvers.js';
import { gql } from 'graphql-tag';

const PORT = 4004;
const typeDefs = gql(readFileSync('./contacts.graphql', { encoding: 'utf-8' }));

async function startApolloServer() {
  const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers })
  });

  const { url } = await startStandaloneServer(server, { listen: { port: PORT } })
  console.log(`🚀 Contact Service listening at: ${url}`);
}

startApolloServer();
