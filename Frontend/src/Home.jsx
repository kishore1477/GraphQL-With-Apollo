
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useQuery, gql, useMutation } from '@apollo/client'
import { AiOutlineEdit } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Swal from 'sweetalert2'
const Home = () => {
  const [show, setShow] = useState(false);
  const [showUp, setShowUp] = useState(false);
  const [dataAdd, setdata] = useState({ title: "", desc: "" });
  const [dataUp, setdataUp] = useState({ idUp: "", titleUp: "", descUp: "" });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseUp = () => setShowUp(false);
  const handleShowUp = () => setShowUp(true);

// we can get graphql data by using fetch
//   fetch("https://apollo-express-mongoose-mongdb.kishoorjaipal.repl.co/graphql", {
//     "method": "POST",
//     "headers": { "content-type": "application/json" },
//     "body": JSON.stringify({
//       query: `{
//   getAllPost {
//     description
//     title
//   }
 
// }`
//     })
//   }).then(res => res.json()).then(console.log)
  const GET_LOCATIONS = gql`
  query{
  getAllPost {
    id
    description
    title
  },
  getPost(id:"632d15abe609aef62ed0548f"){
  description
  }
  
}
`;
  const { loading, error, data } = useQuery(GET_LOCATIONS);

console.log("GetResponse", data)
    

  const INCREMENT_COUNTER = gql`
mutation createPost($post:InputPost){
  createPost (post:$post){
    description
  }
}
`;
  // Pass mutation to useMutation
  const [addTask, resp] = useMutation(INCREMENT_COUNTER);
console.log("AddResponse", resp)
  if (loading) return <p>Loading  ...</p>;
  if (error) return <p>Error  :(</p>;





  if (resp.loading) return <p>Loading in adding...</p>;
  if (resp.error) return <p>Error in adding :(</p>;

  const handleAddData = (e) => {
    console.log("E", e)
     e.preventDefault();
    console.log("Add data", dataAdd)
    setShow(false)
    const { ...res } = dataAdd
    console.log("title", res.title)
    console.log("description", res.desc)
const inputData = {
     post:{
      title:  res.title, description:  res.desc
   }
}
    console.log("inputData", inputData)
     const inputJsonData =  JSON.stringify(inputData)
    // {
    //   "post":{
    //     "title":"titlttr",
    //     "description":"desc"
    //   }
    // }
    const input  = {
  "post":{
    "title":"titltlslast",
    "description":"descfgg3"
  }
}
    console.log(" inputJsonData",  inputJsonData)
    console.log(" input",  input)
   addTask({ variables: inputData })
                }
  const handleEdit = ({ Id, Desc, Title }) => {
    // handleShowUp()  we can not do this 
    // ()=> handleShowUp()  
    setdataUp({ idUp: Id, titleUp: Title, descUp: Desc })
    setShowUp(true)
  }
  const handleUpdate = () => {
    // handleCloseUp()
    setShowUp(false)
  }
  const onchange = (e) => {
    const { name, value } = e.target
    setdata({ ...dataAdd, [name]: value })
  }
  const onchangeUp = (e) => {
    const { name, value } = e.target
    setdataUp({ ...dataUp, [name]: value })
  }
  const handleDelete = () => {
    Swal.fire({
      title: '<strong>Confirm</strong>',
      icon: 'info',
      html:
        'Are you sure want to delete?',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Continue!',
      confirmButtonAriaLabel: 'Are you sure want to delete?',
      cancelButtonText:
        'Cancel',
      cancelButtonAriaLabel: 'Cancel'
    })
  }
  return (
    <>
      <Button onClick={handleShow} variant="primary" className=" flex items-center my-2">Add New Task</Button>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Task</Modal.Title>
        </Modal.Header>
         <Form>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="title" name='title' onChange={onchange} />

          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" placeholder="description" name='desc' onChange={onchange} />
          </Form.Group>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddData}>
            Add
          </Button>
        </Modal.Footer>
           </Form>
      </Modal>


      <Modal show={showUp} onHide={handleCloseUp}>
        <Modal.Header closeButton>
          <Modal.Title>Update Your task</Modal.Title>
        </Modal.Header>
        <Modal.Body> <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="title" name='titleUp' value={dataUp.titleUp} onChange={onchangeUp} />

          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" placeholder="Password" name='descUp' value={dataUp.descUp} onChange={onchangeUp} />
          </Form.Group>


        </Form></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUp}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>












      <Table bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>

          {data.getAllPost.map((item, i) => {
            return <tr>
              <td>1</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td className="flex "><AiOutlineEdit className="cursor-pointer text-blue-300 mr-5" onClick={() => handleEdit({ Id: item.id, Desc: item.description, Title: item.title })} size={30} /> <RiDeleteBin6Line onClick={handleDelete} className="cursor-pointer text-blue-300" size={30} /></td>
            </tr>
          })}


        </tbody>
      </Table></>
  )
}

export default Home