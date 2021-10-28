/* The schema is teh *structure* of teh data that clients query. This a Books API where clients can query for all books, and each book contains the 
* title and author of the book. 
*
*/

const { ApolloServer, gql } = require('apollo-server');

// Below is our schema. A schema is a collection of type definitions (typeDefs). typeDefs define the shape of queries run against the data

const typeDefs = gql `
#comments in GraphQL strins start with a hash symbol
#this Book type defines the queryable fields: title and author

    type Book {
        title: String
        author: String
    }
    
    #The "Query" type is special. It lists all the kinds of queires that clients can execute, along with teh return type for each in the API
    # Below the "books" query returns an array of zero or more Books as defined above.

    type Query {
        books: [Book]
    }
`;

// Below we are simply hard coding some data 

const books = [
    {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
    },
    {
        title: 'Wuthering Heights',
        author: 'Emily Bronte',
    },
];

// Resolvers define where the data comes from. Apollo server is data-source agnostic so you can fetch data from 
// any source (SQL, NoSQL, REST APIs, other GraphQL APIs, or even static JSON). For this toy API I've hard coded data above

const resolvers = {
    Query: {
        books: () => books,
    },
};

// CREATING THE SERVER INSTANCE. This initializes our ApolloServer instance. 
// The ApolloServer constructor requires two parameters: your typeDefs, and your set of resolvers. 

const server = new ApolloServer({ typeDefs, resolvers });

// The 'listen' method lauches a web server
server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});

// To run the server go to terminal in the root of your project and run: node index.js
// Use Apollo Explorer GraphQL IDE to run queries - studio.apollographqlcom/dev
