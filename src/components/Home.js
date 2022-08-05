import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Button from '@mui/material/Button';
import {getMessages, getMessage, getMessagesByOwner} from '../services/MessageService';
import MyNavbar from "./navbar";
import Navbar from "./navbar/Header";
//import Navbar from "./navbar/Navbar.jsx";
import { Link } from 'react-router-dom'
import { auth, db } from "../context/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";


const data = getMessages();


const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});


export default function Home() {
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
        //if (!user) return navigation.navigate("HomeStack",{screen: "Home"});

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

<Navbar/>

<h1> PROFILE </h1>

    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 600,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >



      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="complex" src="https://cquipsplus.ca/wp-content/themes/cera/assets/images/avatars/user-avatar.png" />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
               Hello <h2>{name}</h2>
              </Typography>
              <Typography variant="body2" gutterBottom>
                <span> You have <h1>{counter}</h1> </span><span>Unread out of <h1>{total}</h1> total </span>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ cursor: 'pointer' }} variant="body2">
<Button variant="outlined" component={Link} to="/list">
  Message_List
</Button>
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              ...
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>

</>
  );
}



