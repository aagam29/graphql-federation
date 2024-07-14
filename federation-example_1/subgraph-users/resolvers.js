const USERS = [{
  id: "1",
  name:"John Doe",
  email: "johndoe@abc.com"
},
{
  id: "2",
  name:"Jane Doe",
  email: "janedoe@abc.com"
}];

export const resolvers = {
  Query: {
    users: () => {
      return USERS;
    },
    user: (_, args) => {
      return USERS.find(user => user.id === args.id)
    }
  },
  User: {
    __resolveReference: ({ id }) => {
      return USERS.find(user => user.id === id);
    }
  }
};