import { useContext, useEffect, useState } from "react";
import socket from "../socket";
import { AuthContext } from "../context/AuthContext";
import API from "../api";
import "./Chat.css";

export default function Chat() {
  const { user } = useContext(AuthContext);

  const [friends, setFriends] = useState([]);
  const [currentFriend, setCurrentFriend] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState({});
  const [onlineUsers, setOnlineUsers] = useState([]);

  // JOIN SOCKET ROOM
  useEffect(() => {
    if (user?._id) {
      socket.emit("join", user._id);
    }
  }, [user]);

  // RECEIVE ONLINE USERS
  useEffect(() => {
    socket.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });

    return () => socket.off("onlineUsers");
  }, []);

  // RECEIVE MESSAGE
  useEffect(() => {
    socket.on("receiveMessage", ({ senderId, text }) => {
      setMessages(prev => ({
        ...prev,
        [senderId]: [...(prev[senderId] || []), { senderId, text }]
      }));
    });

    return () => socket.off("receiveMessage");
  }, []);

  // FETCH FRIENDS
  useEffect(() => {
    const fetchFriends = async () => {
      const res = await API.get("/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setFriends(res.data);
    };
    fetchFriends();
  }, []);

  const sendMessage = () => {
    if (!currentFriend || !message) return;

    socket.emit("sendMessage", {
      senderId: user._id,
      receiverId: currentFriend._id,
      text: message
    });

    setMessages(prev => ({
      ...prev,
      [currentFriend._id]: [
        ...(prev[currentFriend._id] || []),
        { senderId: user._id, text: message }
      ]
    }));

    setMessage("");
  };

  const isOnline = (id) => onlineUsers.includes(id);

  return (
    <div className="chat-container">
      
      {/* FRIEND LIST */}
      <div className="friends">
        <h3>{user.username}</h3>

        {friends.map(f => (
          <div
            key={f._id}
            className={`friend ${currentFriend?._id === f._id ? "active" : ""}`}
            onClick={() => setCurrentFriend(f)}
          >
            <span className={`status ${isOnline(f._id) ? "online" : "offline"}`}></span>
            {f.username}
          </div>
        ))}
      </div>

      {/* CHAT AREA */}
      <div className="chat-box">
        {currentFriend ? (
          <>
            <h3>Chat with {currentFriend.username}</h3>

            <div className="messages">
              {(messages[currentFriend._id] || []).map((m, i) => (
                <p key={i} className={m.senderId === user._id ? "me" : "them"}>
                  <b>{m.senderId === user._id ? "You" : currentFriend.username}:</b>{" "}
                  {m.text}
                </p>
              ))}
            </div>

            <div className="input-box">
              <input
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Type a message..."
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </>
        ) : (
          <h3>Select a friend to start chatting</h3>
        )}
      </div>
    </div>
  );
}



