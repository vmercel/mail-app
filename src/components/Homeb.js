import React, {useState, useEffect} from 'react';
import { getMessages, getMessagesByOwner } from '../services/MessageService.js';
import { auth, db } from "../context/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
//import "./Home.css";
import MyNavbar from "./navbar";
import { Link } from 'react-router-dom'



import { useNavigate } from "react-router";
import ProfileUi from 'react-profile-card';



const data = getMessages();





export default function Homeb ({navigation}) {
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    //const navigate = useNavigate();
    const fetchUserByName = async() => {
      try {
          const q = query(collection(db, "users"), where("uid", "==", user?.uid));
          const doc = await getDocs(q);
          const data = doc.docs[0].data();
          console.log(data);
  
          setName(data.displayName);
      } catch (err) {
          console.error(err);
          alert("An error occured while fetching user data");
      }
  };
    useEffect(() => {
        if (loading) return;
        if (!user) return navigation.navigate("HomeStack",{screen: "Home"});

        fetchUserByName();
      }, [user, loading]);



  const Data = getMessagesByOwner(name);
  var total = Data.length;
  let counter = 0;
  for (let i = 0; i < Data.length; i++) {
    if (Data[i].isRead === false) {counter++;}
  }



    return (

<>
<div class="navbar navbar-default navbar-static-top">
    <MyNavbar/>
</div>

<h1> PROFILE </h1>
    <div> 
      <ProfileUi 
          imgUrl='https://miro.medium.com/max/2048/0*0fClPmIScV5pTLoE.jpg' 
          name='{name}' 
          designation='You have {counter} Unread out of {total} Total' 
          />
    </div>
</>

    );
  
}
