import "./App.css"
import { useQuery, gql } from '@apollo/client'
import Home from './Home.jsx'
import NavBar from './Navbar.jsx'
const GET_LOCATIONS = gql`
  query{
  getAllPost {
    id
    description
    title
  }
  
}
`;

export default function App() {

  return (
    <main className = "mx-5">
     <NavBar/>
      <Home />
    </main>
  )
}
