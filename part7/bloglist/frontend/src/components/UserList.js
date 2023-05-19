const UserList = ({ users }) => {
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>
            <h3>blogs created</h3>
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserList;
