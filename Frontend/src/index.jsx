import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'antd/dist/antd.css';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import Swal from 'sweetalert2/dist/sweetalert2.js'

// import 'sweetalert2/src/sweetalert2.scss'
const client = new ApolloClient({
  uri: 'https://apollo-express-mongoose-mongdb.kishoorjaipal.repl.co/graphql',
  cache: new InMemoryCache(),
});
// const client = ...
console.log("Client" , client)
// client
//   .query({
//     query: gql`
//       query{
//   getAllPost {
//     id
//     description
//     title
//   }
  
// }

//     `,
//     mutation:gql`
//       mutation createPost($input:InputPost){
// createPost(post:$input) {
//   description
//  }
  
  
// }`,
  // })
  
// client.mutate({
//   mutation:gql`
//    mutation createPost($input:InputPost){
// createPost(post:$input) {
//   description
//  }
  
  
// },
//   `
// })
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client } >

      <App />

    </ApolloProvider>,
  </React.StrictMode>
)