import { useState, useEffect } from 'react'
import {
  getAllUsers,
  getAllPosts,
  getAllTodos,
  addNewUser
} from './utils'
import UserTile from './UserTile';

function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState('');

  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [isToShowAddNewUserModal, SetIsToShowAddNewUserModal] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      const { data: users } = await getAllUsers();
      const { data: todos } = await getAllTodos();
      const { data: posts } = await getAllPosts();
      setUsers(users);
      setTodos(todos);
      setPosts(posts);
    };
    fetchData();

  }, []);


  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search)
  );

  const handleOpenNewUserModal = () => {
    SetIsToShowAddNewUserModal(true)
  }

  const handleNewName = (e) => {
    setNewUserName(e.target.value)
  };

  const handleNewEmail = (e) => {
    setNewUserEmail(e.target.value)
  };

  const handleAddNewUser = async () => {
    const resp = await addNewUser({ name: newUserName, email: newUserEmail });
    console.log(resp)
  };




  return (
    <>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>

        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: '20px' }}>
            Search: <input type="search" onChange={handleSearch} value={search} />
            <button onClick={handleOpenNewUserModal} style={{ backgroundColor: 'gold', color: 'black', marginRight: 'auto', padding: '3px 20px' }}>Add</button >
          </div>
          {filteredUsers.map((user) => {
            return (
              <UserTile key={user.id}
                user={user}
                todos={todos}
                posts={posts}
                isToShowAddNewUserModal={isToShowAddNewUserModal}
              />
            )
          })}


        </div>
        {isToShowAddNewUserModal && (
          <div style={{ border: '4px solid black', padding: '5px', minWidth: '300px' }}>
            Add new user <br /> <br />
            <p>Name: <input onChange={handleNewName} type="text" style={{ marginLeft: '10px', width: '80%' }} /> <br /></p>
            <p>Email: <input onChange={handleNewEmail} type="email" style={{ marginLeft: '10px', width: '80%' }} /> <br /> <br /></p>
            <div style={{ marginTop: '10px' }}>
              <button onClick={handleAddNewUser} style={{ backgroundColor: 'green', color: 'white', marginRight: '10px', padding: '5px 10px' }} >Add</button>
              <button style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px' }} >Cancel</button> <br /> <br />
            </div>
          </div>
        )}

      </div>
    </>
  )
}

export default App
