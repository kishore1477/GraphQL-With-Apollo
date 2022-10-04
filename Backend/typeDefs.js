
const { gql } = require('apollo-server-express');
const typeDefs = gql` 

type Author{
name:String
 age:Int
 }
type Post {
id:ID,
title:String,
description:String
author : [Author]
}
  type Query {
    hello:String,
    getAllPost:[Post],
    getPost(id:ID):Post
    
  }
  input InputPost {
  title:String,
  description:String
  }
  type Mutation {
  createPost(post:InputPost):Post,
  deletePost(id:ID):String,
  updatePost(id:ID, post:InputPost):Post
  }
`;
module.exports = typeDefs