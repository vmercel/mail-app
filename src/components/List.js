import React, { useState, useEffect } from 'react';
import MyNavbar from "./navbar";
import { useNavigate } from 'react-router';
import './List.css';
import {getMessages, getMessage, getMessagesByOwner} from '../services/MessageService';
import { Link } from 'react-router-dom'
import { auth, db } from "../context/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import  Navbar  from "./navbar/Header";
import { styled } from '@mui/material/styles';

//const data = getMessages();


const API_URL = "https://mail-app-api.vercel.app/api/v1/messages";



function MList() {


    const [user, loading, error] = useAuthState(auth);
    const [nname, setNname] = useState("");
   // const navigate = useNavigate();
    const fetchUserByName = async() => {
      try {
          const q = query(collection(db, "users"), where("uid", "==", user?.uid));
          const doc = await getDocs(q);
          const data = doc.docs[0].data();
          console.log(data);
  
          setNname(data.displayName);
      } catch (err) {
          console.error(err);
          alert("An error occured while fetching user data");
      }
  };
    useEffect(() => {
        if (loading) return;
        //if (!user) return navigate("HomeStack",{screen: "Home"});

        fetchUserByName();
      }, [user, loading]);


    const [messages, setMessages] = useState([]);

    const GetMessages = async() => {
        const response = await fetch(`${API_URL}`);
        const data = await response.json();
        data? setMessages(data): console.log("Could Not Fetch");//setMessages(getMessagesByOwner(nname));
    }


  GetMessages();

  const Data = messages; //getMessagesByOwner(nname);
  var total = Data.length;
  let counter = 0;
  for (let i = 0; i < Data.length; i++) {
    if (Data[i].isRead === false) {counter++;}
  }







    const navigate = useNavigate();
    // the value of the search field 
    const [name, setName] = useState('');

    // the search result
    const [foundMessages, setFoundMessages] = useState(Data);

    const filter = (e) => {
        const keyword = e.target.value;

        if (keyword !== '') {
            const results = messages.filter((message) => {
                return message.subject.toLowerCase().startsWith(keyword.toLowerCase());
                // Use the toLowerCase() method to make it case-insensitive
            });
            setFoundMessages(results);
        } else {
            setFoundMessages(messages);
            // If the text field is empty, show all users
        }

        setName(keyword);
    };

    return ( <>
<Navbar/>

<div className = "container" >
        <input type = "search"
        value = { name }
        onChange = { filter }
        className = "input"
        placeholder = "Filter" /
        >
        </div> 
	<div className = "message-list" > {
            foundMessages && foundMessages.length > 0 ? (
                foundMessages.map((message) => ( 
		   <li key = { message.id }
                    className = "message"
                    onClick = {
                        () => navigate(`/details/`, { state: { id: message.id } })
                    } >
                    <span className = "message-id" > { message.id } < /span> <span className = "message-subject" > { message.subject } < /span> 
		    <br/>
		<div className = "message-content" > { message.content.slice(0,20)+" . . . " }
                    </div> </li >
                ))
            ) : ( <h1> No results found! </h1>
            )
        } </div>

        </>
    );
}

export default MList;