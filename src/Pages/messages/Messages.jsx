import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import MessagesDetails from '../messagesDetails/MessagesDetails';
import Message from '../message/Message';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/footer/Footer';

const Messages = () => {
  const user = useSelector((state) => state.user.value);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/conversation/${user.userId}`)
      .then((response) => {
        setConversations(response.data.conversations);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user.userId, selectedConversation]);

  const handleUserClick = (conversation) => {
    const idToBeSend = user.userId === conversation.senderId ? conversation.receiverId : conversation.senderId;

    axios
      .get(`http://localhost:3000/user/getUser/${idToBeSend}`)
      .then((response) => {
        const interactedWith = response.data;
        setSelectedConversation({ conversationId: conversation.id, interactedWith });
      })
      .catch((error) => {
        console.error(error);
      });
  };
const gardient =' linear-gradient(to left top, #ffffff, #dedbf0, #bbb9e1, #9699d2, #6e7ac3, #5370b6, #3566a9, #005c9b, #005e88, #215d72, #3d5a60, #515555);';
  return (
    <>
      <Navbar />
      <div className="messages bg-gray-100 min-h-screen"
      style={{background :gardient}}>
        <div className="container mx-auto p-4">
          <div className="flex">
            {/* Left Column: List of Users */}
            <div className="w-1/3 pr-4 " style={{ boxShadow: '2px 0px 5px rgba(0, 0, 0, 0.1)', background: '#ffffff', borderRadius: '10px', width: '300px', height: "100%", marginTop:'50px' }}>
              {conversations.map((conversation) => (
                <div key={conversation.id} onClick={() => handleUserClick(conversation)}>
                  <MessagesDetails conversation={conversation} />
                </div>
              ))}
            </div>

            {/* Right Column: Selected Conversation */}
            <div className="w-2/3">
              {selectedConversation && <Message selectedConversation={selectedConversation} />}
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </>
  );
};

export default Messages;
