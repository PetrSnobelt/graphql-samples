const { makeExecutableSchema } = require('graphql-tools');

// Basic data
const books = [
  {
      title: "Harry Potter and the Sorcerer's stone",
      author: 'J.K. Rowling',
  },
  {
      title: 'Jurassic Park',
      author: 'Michael Crichton',
  }];

  // The GraphQL schema in string form
  const typeDefs = `
    type Query {
      books: [Book]
      sum(n1:Int! n2:Int!): Int

      #Return current server time
      time: String
    }

    #Basic book info
    type Book {
      #book title
      title: String!
      #author of the book
      author: String
    }

    type Mutation {
      # example mutation
      sayHi(name:String!): String!
    }
  `;

  // The resolvers
  const resolvers = {
    Query: {
      books: () => books,
      sum: (_, {n1, n2}) => n1 + n2,
      time: () => (new Date).toISOString()
    },
    Mutation: {
      sayHi:(_, {name}) => {
        console.log("Hi from client", name)
        const greeting = `Hi ${name}`
        return greeting
      }
    }
  };

  // Put together a schema
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  exports.schema = schema