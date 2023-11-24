// // MessageLayout.jsx

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import MessagesDetails from './messagesDetails/MessagesDetails';
// import Message from './message/Message';
// import axios from 'axios';

// const MessageLayout = () => {
//   const { id } = useParams();
//   const [userData, setUserData] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);

//   useEffect(() => {
//     // Fetch user data or use your existing logic
//     axios.get('http://localhost:3000/api/users')
//       .then(response => setUserData(response.data))
//       .catch(error => console.error(error));
//   }, []);

//   const handleSelectUser = (user) => {
//     setSelectedUser(user);
//   };

//   return (
//     <div className="message-layout">
//       <div className="user-list">
//         {userData.map((user) => (
//           <MessagesDetails
//             key={user.id}
//             conversation={user}  // Assuming user data can be passed directly
//             onSelectUser={handleSelectUser}
//           />
//         ))}
//       </div>
//       <div className="conversation">
//         {selectedUser && <Message id={id} interactedWith={selectedUser} />}
//       </div>
//     </div>
//   );
// };

// export default MessageLayout;
