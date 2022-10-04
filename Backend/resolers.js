
const Post = require("./model/Post")
const resolvers = {
  Query: {
    hello: () => {
      return "hello world by kishore kumar"
    },
    getAllPost: async () => {
      const post = await Post.find()
      return post
    },
    getPost: async (parent, args, context, info) => {
      const { id } = args
      const post = await Post.findById(id)
      return post
    }


  },

  Mutation: {
    createPost: async (parent, args, context, info) => {
      console.log("parent", parent)
      console.log("args", args)
    
      const { title, description } = args.post
      const PostData = new Post({ title, description })
      const savedata = await PostData.save()
      return savedata

    },
    deletePost: async (parent, args, context, info) => {
      const { id } = args

      const postDelete = await Post.findByIdAndDelete(id)
      console.log("postDelete", postDelete)
      if (postDelete) {

        return "OK, Post is deleted"
      } else {
        return "Post does not found"
      }
    },
    updatePost: async (parent, args, context, info) => {
      const { id } = args
      const { title, description } = args.post
      const updatedPost = await Post.findByIdAndUpdate(id, { title, description }, { new: true })
      return updatedPost

    }

  }
}

module.exports = resolvers