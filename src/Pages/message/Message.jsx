import React from "react";
import { Link , useParams  } from "react-router-dom";
import "./Message.scss";
import { useEffect } from "react";
import axios from "axios"
import { useState } from "react";
import { useSelector } from "react-redux";

const Message = () => {
  // const location = useLocation();
  // const { conversationId, interactedWith } = location.state || {};*
  const { id, interactedWith } = useParams();
  const interactedWithObject = JSON.parse(decodeURIComponent(interactedWith));
  const [conversation , setConversation]=useState([])
  const [messageInput, setMessageInput] = useState("");
  console.log("this iss from the single messge " ,interactedWithObject , id)
  const user =useSelector((state)=>state.user.value)

  useEffect(()=>{
    axios.get(`http://localhost:3000/message/conversation/${id}`)
    .then((response)=>{
      setConversation(response.data.messages)
      console.log("thissssss the conversation of a specific message",conversation)
    })
    .catch((error)=>{
      console.log(error)
    })
  },[id,conversation])
  const handlechange =(e)=>{
    e.preventDefault()
    setMessageInput(e.target.value); 

  }
  const sendMessage = ()=>{
    axios.post(`http://localhost:3000/message/send/${id}/${user.userId}`,{
      content : messageInput,
    })
    .then((response)=>{
      console.log(response.data)
      setConversation([...conversation, response.data]);
      setMessageInput("")
    }).catch((error)=>{
      console.log(error)
    })
  }
  return (
    <div className="message">   
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages">Messages</Link> 
        </span>
        <div className="messages">
          {conversation.map((message)=>(
            (message.senderId!==user.userId)?(
            <div className="item">
            <img
              src={interactedWithObject.imgUrl}
              alt=""  
            />
            <p>
              {message.content}
            </p>
          </div>):(
                      <div className="item owner">
                      <img
                        src={user.imgUrl}
                        alt=""
                      />
                      <p>
                          {message.content}
                      </p>
                    </div>
          )
          ))}
        </div>
        <hr />
        <div className="write">
        <textarea
            type="text"
            placeholder="write a message"
            onChange={handlechange}
            value={messageInput} 
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Message;
