import React, { useState, useEffect } from "react";
import MyNavbar from "./navbar";
import MessageCard from "./MessageCard";
import SearchIcon from "./search.svg";
import "../App.css";

const API_URL = "http://localhost:3000/api/v1/messages"; //"https://www.omdbapi.com?apikey=db447031";

const MessageList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    searchMessages("Batman");
  }, []);

  const searchMessages = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMessages(data.Search);
  };

  return (
<>
<MyNavbar fixed="top"/>
    <div className="app">
      <h1>MessageLand</h1>
      <h3>Search for your Favorite messages. View posters and other information. </h3>
     
      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for messages"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMessages(searchTerm)}
        />
      </div>

      {messages?.length > 0 ? (
        <div className="container">
          {messages.map((message) => (
            <MessageCard message={message} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No messages found</h2>
        </div>
      )}
    </div>
</>
  );
};



export default MessageList;