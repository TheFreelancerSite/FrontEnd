import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import "./MessagesDetails.scss";
import { Link } from 'react-router-dom';

function MessagesDetails({ conversation }) {
  const [interactedWith, setInteractedWith] = useState([]);
  const user = useSelector((state) => state.user.value);
  let idToBeSend;

  if (user.userId === conversation.senderId) {
    idToBeSend = conversation.receiverId;
  } else if (user.userId === conversation.receiverId) {
    idToBeSend = conversation.senderId;
  }

  useEffect(() => {
    axios
      .get(`http://localhost:3000/user/getUser/${idToBeSend}`)
      .then((response) => {
        setInteractedWith(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [idToBeSend]);

  return (
    <div className="user-item" onClick={() => handleUserClick(conversation)}>
      <img className="user-image" src={interactedWith.imgUrl} alt="" />
      <div className="user-details">
        <span className="user-name">{interactedWith.userName}</span>
        {interactedWith && interactedWith.userName && (
          <Link to={`/message/${conversation.id}/${encodeURIComponent(JSON.stringify(interactedWith))}`} className="message-link">
            {conversation.message_content
              ? conversation.message_content.substring(0, 100)
              : ''}
          </Link>
        )}
      </div>
    </div>
  );
}

export default MessagesDetails;
