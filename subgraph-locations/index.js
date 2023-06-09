const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { readFileSync } = require('fs');
const gql = require('graphql-tag');
const resolvers = require('./resolvers');
const LocationsAPI = require('./datasources/LocationsApi');
const typeDefs = gql(readFileSync('./locations.graphql', { encoding: 'utf-8' }));

const { buildSubgraphSchema } = require("@apollo/subgraph"); 

async function startApolloServer() {
  const server = new ApolloServer({ 
    schema: buildSubgraphSchema({ typeDefs, resolvers }), 
  });
  const port = 4001;
  const subgraphName = 'locations';
  try {
    const { url } = await startStandaloneServer(server, {
      context: async () => {
        return {
          dataSources: {
            locationsAPI: new LocationsAPI(),
          },
        };
      },
      listen: { port },
    });
    console.log(`🚀 Subgraph ${subgraphName} running at ${url}`);
  } catch (err) {
    console.error(err);
  }
}

startApolloServer();
