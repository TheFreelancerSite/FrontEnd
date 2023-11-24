import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import "./Message.scss";
import { useSelector } from 'react-redux';

const Message = ({ selectedConversation }) => {
  const { id } = useParams();
  const [conversation, setConversation] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    console.log(selectedConversation)
    axios.get(`http://localhost:3000/message/conversation/${selectedConversation.conversationId}`)
      .then((response) => {
        setConversation(response.data.messages);
        console.log("oyyy this is it ", response.data.messages)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedConversation.conversationId,conversation  ]);

  const handleChange = (e) => {
    e.preventDefault();
    setMessageInput(e.target.value);
  };

  const sendMessage = () => {
    axios.post(`http://localhost:3000/message/send/${selectedConversation.conversationId}/${user.userId}`, {
      content: messageInput,
    })
      .then((response) => {
        setConversation([...conversation, response.data]);
        setMessageInput("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages">Messages</Link>
        </span>
        <div className="messages">
          {conversation.map((message) => (
            (message.senderId !== user.userId) ? (
              <div className="item" key={message.id}>
                <img
                  src={selectedConversation.interactedWith.imgUrl}
                  alt=""
                />
                <p>
                  {message.content}
                </p>
              </div>
            ) : (
              <div className="item owner" key={message.id}>
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
            onChange={handleChange}
            value={messageInput}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Message;
