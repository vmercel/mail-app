import React, {useState, useEffect} from 'react';
//import {Text, View, button,  StyleSheet } from 'react-native';
import { getMessagesByOwner } from '../services/MessageService.js';
import { auth, db } from "../context/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import './styles.css';


export default function HomePage ({navigation}) {
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
        if (!user) return navigation.navigate("/");

        fetchUserByName();
      }, [user, loading]);



  const Data = getMessagesByOwner({name});
  var total = Data.length;
  let counter = 0;
  for (let i = 0; i < Data.length; i++) {
    if (Data[i].isRead === false) {counter++;}
  }



    return (
      <div>
        <p>{name}</p></p>
        <p>You have <p style={styles.bigBlue}>{counter}</p> unread out of <p style={styles.bigBlue}>{total}</p> total</p>

        <div>
          <button
          onClick={() => navigation.navigate('MList',{mOwner: name.toString()})}
          title="View Messages"
          color="#841584"
          accessibilityLabel="View Messages"
        />
        </div>
      </div>
    );
  
}
