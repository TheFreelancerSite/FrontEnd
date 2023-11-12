  import React from "react";
  import { Link } from "react-router-dom";
  import "./Messages.scss";
  import { useSelector } from "react-redux";
  import { useEffect } from "react";
  import axios from 'axios';
  import { useState } from "react";
  import MessagesDetails from "../messagesDetails/MessagesDetails";
  const Messages = () => {
    const user =useSelector((state)=>state.user.value)
  const [conversations,setConversations]=useState([])
    useEffect(()=>{
      axios.get(`http://localhost:3000/conversation/${user.userId}`)
      .then((response)=>{
        setConversations(response.data.conversations)
        console.log(response.data.conversations)
        console.log("thisss the conversations ", conversations)
      }).catch((error)=>{
        console.log(error)
      })

    },[])
    
    // console.log(user)
    const currentUser = {
      id: user.userId,
      username: user.userName,
      isSeller: user.isSeller,
    };



    return (
      <div className="messages">
        <div className="container">
          {/* <div className="title">
            <h1>Messages</h1>
          </div> */}
          <table className="message-table">
            <tr>
              <th className="table-header">
                {currentUser.isSeller ? "freelancers" : "clients"}
              </th>
              <th className="table-header">Last Message</th>
              <th className="table-header">Date</th>
            </tr>

            {conversations.map((conversation)=>(
                <MessagesDetails conversation={conversation} />
            ))} 
          </table>
        </div>
      </div>
    );
  };

  export default Messages;
