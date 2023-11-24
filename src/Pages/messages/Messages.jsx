import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import "./Messages.scss";
import MessagesDetails from "../messagesDetails/MessagesDetails";
import Message from '../message/Message';

const Messages = () => {
  const user = useSelector((state) => state.user.value);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/conversation/${user.userId}`)
      .then((response) => {
        setConversations(response.data.conversations);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user.userId,selectedConversation]);

  const handleUserClick = (conversation) => {
    const idToBeSend = (user.userId === conversation.senderId) ? conversation.receiverId : conversation.senderId;

    axios.get(`http://localhost:3000/user/getUser/${idToBeSend}`)
      .then((response) => {
        const interactedWith = response.data;
        setSelectedConversation({ conversationId: conversation.id, interactedWith });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="messages">
      <div className="container">
        <div className="columns">
          {/* Left Column: List of Users */}
          <div className="users-column">
            {conversations.map((conversation) => (
              <div key={conversation.id} onClick={() => handleUserClick(conversation)}>
                <MessagesDetails conversation={conversation} />
              </div>
            ))}
          </div>

          {/* Right Column: Selected Conversation */}
          <div className="conversation-column">
            {selectedConversation && (
              <Message selectedConversation={selectedConversation} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
