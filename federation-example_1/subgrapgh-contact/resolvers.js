const CONTACTS = [
  {
    id: "1",
    name: 'Alice',
    phoneNumber: "123345678",
    userId: "1"
  },
  {
    id: "2",
    name: 'Bob',
    phoneNumber: "546325678",
    userId: "1"
  },
  {
    id: "3",
    name: 'James',
    phoneNumber: "126545678",
    userId: "2"
  },
  {
    id: "4",
    name: 'Mark',
    phoneNumber: "987456321",
    userId: "2"
  },
];


export const resolvers = {
  Query: {
    contact: (_, args) => {
      return CONTACTS.find(contact => contact.id === args.id)
    },
    contacts: () => {
      return CONTACTS
    },
  },
  Contact: {
    user: ({ userId }) => {
      return { id: userId }
    }
  },
  User: {
    userContacts: (user) => {
      return CONTACTS.filter(contact => contact.userId === user.id);
    }
  }
};