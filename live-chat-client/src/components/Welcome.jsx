// import logo from "/hello.png";
// import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ChatArea from "./ChatArea";
import Conversation from "./Conversation";
import "../index.css";

function Welcome() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  console.log(userData);

  const navigate = useNavigate();
  if (!userData) {
    console.log("User not Authenticated");
    navigate("/");
  }

  return (
    <div className="welcome-container">
      <div className="chat-container">
        <Conversation />
        <ChatArea />
      </div>
      <div className="welcome-message">
        <b>Hi, {userData.name} 👋</b>
        <p>View and text directly to people present in the chat Rooms.</p>
      </div>
    </div>
  );
}
export default Welcome;