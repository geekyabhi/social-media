const {ApolloServer} =require('apollo-server')
const gql=require('graphql-tag')

const Post=require('./server/models/Post')
require('dotenv').config({path:'./config/dev.env'})
require('./server/db/mongoose')

const typeDefs=gql`
    type Post{
        id:ID!
        body:String!
        createdAt:String!
        username:String!
    }

    type Query{
        getPosts:[Post]
    }
`
const resolvers={
    Query:{
        async getPosts(){
            try{
                const post=await Post.find()
                return post 
            }catch(e){
                throw new Error(e)
            }
        }
    }
}
const server=new ApolloServer({
    typeDefs,
    resolvers
})


server.listen({port:5000}).then(res=>console.log(`Server running at ${res.url}`))