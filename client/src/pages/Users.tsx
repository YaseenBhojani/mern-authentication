import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type User = {
  username: string;
  email: string;
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/users", {
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token") || "",
          },
        });

        if (res.status === 401) return navigate("/login");
        const users = await res.json();
        setUsers(users.data);
      } catch (error: any) {
        setError(error.message);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      {error && <h2>{error}</h2>}
      {users.length > 0 &&
        users.map((user: User, index) => (
          <div
            key={index}
            style={{
              border: "1px solid black",
              padding: "10px",
              margin: "10px",
            }}
          >
            <h2>Name: {user.username}</h2>
            <h3>Email: {user.email}</h3>
          </div>
        ))}
    </div>
  );
};

export default Users;
