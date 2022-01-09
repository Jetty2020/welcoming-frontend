module.exports = {
  client: {
    includes: ['./src/**/*.{tsx,ts}'],
    tagName: 'gql',
    service: {
      name: 'welcoming',
      url: 'http://localhost:5050/graphql',
    },
  },
};
