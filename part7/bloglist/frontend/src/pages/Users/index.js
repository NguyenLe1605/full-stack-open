import UserList from "../../components/UserList";

const Users = ({ users }) => {
  return (
    <div className="users">
      <h2>Users</h2>
      <UserList users={users} />
    </div>
  );
};

export default Users;
