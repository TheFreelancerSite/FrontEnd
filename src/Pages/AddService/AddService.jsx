import React, { useEffect, useState } from "react";
import "./AddService.scss";
import axios from 'axios';
import { useSelector} from "react-redux";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const AddService = () => {
  const user =useSelector((state)=>state.user.value)
  const navigate =useNavigate()
  console.log("this is the user redux ",user)
  const [inputs, setInputs] = useState({
    image: [],
  });
  
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
    console.log(inputs)
  }

  const handleFileChange = (event) => {
    const name = event.target.name;
    const file = event.target.files[0]; 
    console.log(file)
    setInputs((values) => ({ ...values, [name]: file }));
  };

  const handlesubmit = () => {
    // const config = {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //     'Authorization': 'Bearer your-api-key', // If required
    //   },
    // };
    const owner = user.isSeller ? "client" : "freelancer";
    const formData = new FormData();
     formData.append('title', inputs.title);
     formData.append('category', inputs.cats);
    
          formData.append('image', inputs.image);
       
        formData.append('description', inputs.description);
        formData.append('deliveryTime', inputs.deliveryTime);
        formData.append('feautures', inputs.feature1);
        formData.append('price', inputs.price);
          formData.append('owner', owner);

axios.post(`http://localhost:3000/service/add/${user.userId}`, formData)
  .then((response) => {
    console.log(response);
    toast.success('Added succefully')
    if(user.isSeller){
      navigate("/clientHomePage")
    }else if(!user.isSeller){
      navigate("/freelancerHomePage")
    }
  })
  .catch((error)=>{
    toast.error("sorry error")

  })
  };
  

  useEffect(() => {
    // This code will run whenever the 'inputs' state is updated.
    console.log("this is inputs ",inputs);
    // console.log("this is the form data", formData)
  }, [inputs]);
  return (
    <div className="add">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container">
        <h1>Add New Service</h1>
        <div className="sections">
          <div className="info">
            <label htmlFor="">Title</label>
            <input
              type="text"
              placeholder="give a title of your job"
              name="title"
              onChange={handleChange}
            />
            <label htmlFor="">Category</label>
            <select name="cats" id="cats" onChange={handleChange}>
            <option value="design">Design</option>
            <option value="web">Web Development</option>
            <option value="animation">Animation</option>
            <option value="music">Music</option>
            </select>
            <label htmlFor="">Upload Images</label>
            <input type="file" name="image" onChange={handleFileChange} />
            <label htmlFor="">Description</label>
            <textarea name="description" onChange={handleChange} id="" placeholder="Brief descriptions to introduce your service" cols="0" rows="16"></textarea>
          </div>
          <div className="details">

            <label htmlFor="">Delivery Time (e.g. 3 days)</label>
            <input type="number" name="deliveryTime" onChange={handleChange} />
            <label htmlFor="">Add Features</label>
            <input type="text" name="feautures" onChange={handleChange} placeholder="e.g. page design" />
            <label htmlFor="">Price</label>
            <input type="number" name="price" onChange={handleChange}/>
            <button type="submit" onClick={handlesubmit}>Create</button>
          </div>
          
        </div>
      </div>
    </div>
  );
};


export default AddService;