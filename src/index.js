const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client')

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}];

let idCount = links.length;



const resolvers = {
    Query: {
        info: () => null,
        feed: (root, args, context, info) => {
            return context.prisma.links()
        },
    },

    Link: {
        id: (parent) => parent.id,
        description: (parent) => parent.description,
        url: (parent) => parent.url,
    },

    Mutation: {
        post: (root, args, context) => {
            return context.prisma.createLink({
                url: args.url,
                description: args.description,
            })
        },
    },
};

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: { prisma },
});

server.start(() => console.log(`Server is running on http://localhost:4000`));