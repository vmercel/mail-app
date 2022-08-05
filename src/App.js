import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import "./App.css";
import Home from "./components/Home";
//import Homeb from "./components/Homeb";
import Login from "./components/Login";
import Signup from "./components/Signup";
import MList from "./components/List";
import MessageDetails from "./components/MessageDetails";
import UsingFetch from "./components/UsingFetch";
import ComplexGrid from "./components/Grid";
import Navbar from "./components/navbar/Navbar.jsx";


function App() {
  return (
	<div className="app">


	<UserAuthContextProvider>

          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
	    <Route path="/list" element={<MList />} />
	    <Route path="/details" element={<ComplexGrid />} />
          </Routes>
	</UserAuthContextProvider>
	</div>

  );
}

export default App;