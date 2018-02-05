const Hapi = require('hapi');
const { graphqlHapi } = require ('apollo-server-hapi');
const { schema } = require('./schema.js')

const { execute, subscribe } = require('graphql')
const { createServer } = require('http');
const { SubscriptionServer } = require('subscriptions-transport-ws');

async function StartServer() {
  const server = new Hapi.server({
    host: 'localhost',
    port: 3000,
  });

  await server.register({
    plugin: graphqlHapi,
    options: {
      path: '/graphql',
      graphqlOptions: {
        schema,
      },
      route: {
        cors: true,
      },
    },
  });

  // subscriptions
  new SubscriptionServer({
    execute,
    subscribe,
    schema
  }, {
    server: server.listener,
    path: '/subscriptions',
  });

  try {
    await server.start();
  } catch (err) {
    console.log(`Error while starting server: ${err.message}`);
  }

  console.log(`Server running at: ${server.info.uri}`);
}

StartServer();