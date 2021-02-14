import { create, gql, Payload } from "../deps.ts";
import { jwtKey } from "../environment.ts";
import { RegisterUserRequest, User, UserRequestById, UserLoginRequest, UserResponse } from "../types/user.ts";

// Types for graphql queries
export const UserTypes = (gql as any)`
  type User {
    id: ID!
    email: String!
    created: String!
    token: String!
  }
  input LoginUserInput {
    email: String!
    password: String!
  }
  input RegisterUserInput {
    email: String!
    password: String!
    confirmPassword: String!
  }
  type Query {
    fetchUser(id: Int): User 
  }
  type Mutation {
    loginUser(user: LoginUserInput): User!
    registerUser(user: RegisterUserInput!): User!
  }
  `;

const createToken = (user: UserLoginRequest) => {
  const payload: Payload = {
    iss: user.email,
    exp: (new Date().getTime() + 60000),
  }
  const jwt = create({alg: "HS256", typ: "JWT"}, payload, jwtKey);
  return(jwt);
}

const fetchUser = (_parent: any, req: UserRequestById, _context: any, _info: any): User => {
  console.log(req.id)
  // make database calls or http requests here
  return {
    id: 1,
    email: "Connor@email.com",
    created: "now",
    token: "12asdfq3wer"
  };
};

const loginUser = async (_parent: any, req: UserLoginRequest, _context: any, _info: any): Promise<User> => {
  
  //const { errors, valid } = validateNonEmpty(username, password);
  const jwt = await createToken(req);

  // make database calls or http requests inside and return data
  return {
    id: 1,
    email: "Connor@email.com",
    created: "now",
    token: jwt
  };
};

const registerUser = (_parent: any, req: RegisterUserRequest, _context: any, _info: any): UserResponse => {
  console.log(req.email)
  // make database calls or http requests inside and return data
  return {
    token: "12asdfq3wer"
  };
};



export const UserResolvers = {
  Query: {
    fetchUser: fetchUser,
  },
  Mutation: {
    loginUser: loginUser,
    registerUser: registerUser
}};