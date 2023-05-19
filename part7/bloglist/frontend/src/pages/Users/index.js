import UserList from "../../components/UserList";
import { useEffect, useState } from "react";
import userService from "../../services/users";

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    userService.getAll().then((users) => setUsers(users));
  }, []);

  return (
    <div className="users">
      <h2>Users</h2>
      <UserList users={users} />
    </div>
  );
};

export default Users;
