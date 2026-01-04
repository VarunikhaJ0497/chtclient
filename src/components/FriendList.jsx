import "./Chat.css";
import { useEffect, useState } from "react";
import API from "../api";

export default function FriendList({ setFriend }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get("/users").then(res => setUsers(res.data));
  }, []);

  return (
    <div className="friend-list">
      <h3>Friends</h3>
      {users.map(u => (
        <div key={u._id} className="friend" onClick={() => setFriend(u)}>
          {u.username}
        </div>
      ))}
    </div>
  );
}