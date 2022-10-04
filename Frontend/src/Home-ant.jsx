import { Space, Table, Tag } from 'antd';
import React, {useState} from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Form, Input, Radio } from 'antd';
import { useQuery, gql } from '@apollo/client'
import { Button, Modal } from 'antd';
import { useModalForm } from 'sunflower-antd';
const Home-ant = () => {
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState('optional');

  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };
   const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');
  const [updateData, setUpdateData] = useState({title:"", desc:""})

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    const {title, desc} = updateData
    if(title && desc){
       setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
    }else{
      
    }
   
  };
  const onChange = (e) => {
    const  {name, value} = e.target
    setUpdateData({...updateData, [name]:value})
    
  }

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  const GET_LOCATIONS = gql`
  query{
  getAllPost {
    id
    description
    title
  }
  
}
`;
   const { loading, error, data } = useQuery(GET_LOCATIONS);
       if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
const dataSourse = []
  data.getAllPost.map((item,i)=>{
    console.log("item", item.description)
    const dataS = {
      key: item.id,
    Title: item.title,
    age: 32,
    description: item.description,
    }
    dataSourse.push(dataS)
 
    

  })



const columns = [
  {
    title: 'Title',
    dataIndex: 'Title',
    key: 'Title',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        {
          data.getAllPost.map((item, i)=>{
            return 
          })
        }
        <a> 
          <Button type="" onClick={showModal}>
       Edit 
      </Button>
      <Modal
        title="Update To do List"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Submit"
      cancelText="Cancel"
      >
        <p> <Form onSubmit = {handleOk}
      form={form}
      layout="vertical"
      
    >
      
      <Form.Item label="Title" required tooltip="This is a required field">
        <Input placeholder="input placeholder" name = "title"   />
      </Form.Item>
      <Form.Item
        label="Description"
        tooltip={{
          title: 'Tooltip with customize icon',
          
        }}
      >
        <Input placeholder="input placeholder" name = "desc"  />
      </Form.Item>
     
    </Form></p>
      </Modal></a>
        <a>Delete</a>
      </Space>
    ),
  },
];

  return (

    <>
      <Table columns={columns} dataSource={ dataSourse} />
      <h1>This is Home page </h1>
    </>
  )
}
export default Home-ant



