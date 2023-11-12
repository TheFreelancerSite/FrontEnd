    import React from 'react'
    import "./MessagesDetails.scss"
    import { useEffect } from 'react'
    import { useState } from 'react'
    import { Link } from 'react-router-dom'
    import { useSelector } from "react-redux";
    import axios from 'axios'
    function MessagesDetails({ conversation }) {
        const [interactedWith, setInteractedWith] = useState([]);
        const user =useSelector((state)=>state.user.value)
        let idToBeSend
        console.log("this is user",user)
        console.log("this is conversation ", conversation)
        if (user.userId === conversation.senderId) {
            idToBeSend = conversation.receiverId;
        } else if (user.userId === conversation.receiverId) {
            idToBeSend = conversation.senderId;
        }
        console.log(idToBeSend)
        useEffect(() => {
        axios
            .get(`http://localhost:3000/user/getUser/${idToBeSend}`)
            .then((response) => {
            setInteractedWith(response.data);
            console.log("oyyy", interactedWith);
            })
            .catch((error) => {
            console.error(error);
            });
        }, [conversation.receiverId]); // Added dependency to useEffect
    
        return (
        <>
            <tr className="active">
            <td>{interactedWith.userName}</td>
            <td>
                {interactedWith && interactedWith.userName && (
                    <Link to={`/message/${conversation.id}/${encodeURIComponent(JSON.stringify(interactedWith))}`} className="message-link">

                    {conversation.message_content
                    ? conversation.message_content.substring(0, 100)
                    : 'Cannot get'}
                </Link>
                )}
            </td>
            <td>1 hour ago</td>
            </tr>
        </>
        );
    }
    

    export default MessagesDetails
