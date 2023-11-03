import React, { useEffect, useState } from "react";
import "./AddService.scss";
import axios from 'react-axios'


const AddService = () => {
  const [inputs, setInputs] = useState({});
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
    // console.log(inputs)
  }
  useEffect(() => {
    // This code will run whenever the 'inputs' state is updated.
    console.log(inputs);
  }, [inputs]);
  return (
    <div className="add">
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
            <input type="file" multiple />
            <label htmlFor="">Description</label>
            <textarea name="description" onChange={handleChange} id="" placeholder="Brief descriptions to introduce your service" cols="0" rows="16"></textarea>
          </div>
          <div className="details">

            <label htmlFor="">Delivery Time (e.g. 3 days)</label>
            <input type="number" name="deliveryTime" onChange={handleChange} />
            <label htmlFor="">Add Features</label>
            <input type="text" name="feature1" onChange={handleChange} placeholder="e.g. page design" />
            <input type="text" name="feauture2" onChange={handleChange} placeholder="e.g. file uploading" />
            <label htmlFor="">Price</label>
            <input type="number" name="price" onChange={handleChange}/>
            <button>Create</button>
          </div>
          
        </div>
      </div>
    </div>
  );
};


export default AddService;
