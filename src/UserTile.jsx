/* eslint-disable react/prop-types */
import { useState } from 'react'

import {
    updateUser,
    deleteUser,
    updateTodos,
    addNewTodo,
    addNewPost
} from './utils'


const UserTile = ({ user, todos, posts }) => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [isHovered, setIsHovered] = useState(false);
    const [isToShowUserTodos, setIsToShowUserTodos] = useState(false);
    const [isToShowUserPosts, setIsToShowUserPosts] = useState(false);
    const [isToDisplayAddNewTodo, setIsToDisplayAddNewTodo] = useState(false);
    const [isToDisplayAddNewPost, setIsToDisplayAddNewPost] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [todoTitle, setTodoTitle] = useState('');
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');


    const handleUserSelect = () => {
        setSelectedUserId(user.id);
        console.log('hasUncompletedTasks: ', hasUncompletedTasks)
    };

    const handleNameChange = (e) => {
        setUserName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setUserEmail(e.target.value);
    };

    const handleUpdateUser = async (userId) => {
        const resp = await updateUser(userId, { name: userName, email: userEmail });
        console.log(resp)
    };

    const handleDeleteUser = async (userId) => {
        const resp = await deleteUser(userId);
        console.log('Delete user resp: ', resp)
    };

    const showOtherData = () => {
        setIsHovered(true);
    };

    const hideOtherData = () => {
        setIsHovered(false);
    };

    const handleShowUserDeails = () => {
        setIsToShowUserTodos(true)
        setIsToShowUserPosts(true)
    };

    const closeTasts = () => {
        setIsToShowUserTodos(false)
        setIsToShowUserPosts(false)
        setSelectedUserId(null)

    }

    const handleMarkCompleted = async (todoId) => {
        const resp = await updateTodos({ id: todoId, completed: true });
        console.log("Todo Updated: ", resp)
    };

    const handleAddNewTodo = async (IsToDisplay) => {
        setIsToDisplayAddNewTodo(IsToDisplay)
    };

    const handleAddNewPost = async (IsToDisplay) => {
        setIsToDisplayAddNewPost(IsToDisplay)
    };

    const handleTitle = (e) => {
        setTodoTitle(e.target.value)
    };

    const handlePostTitle = (e) => {
        setPostTitle(e.target.value)
    };

    const handlePostBody = (e) => {
        setPostBody(e.target.value)
    };

    const handleAddTodo = async () => {
        const resp = await addNewTodo({ title: todoTitle })
        console.log(resp);
    };

    const addingNewPost = async () => {
        const resp = await addNewPost({ title: postTitle, body: postBody })
        console.log(resp);
    };

    const hasUncompletedTasks = todos.some((todo) => todo.userId === user.id && !todo.completed);

    const borderColor = hasUncompletedTasks ? 'red' : 'green';



    return (
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', position: 'relative' }}>


            {/* User details */}
            <div key={user.id} style={{ border: 'solid', borderColor: borderColor, padding: '10px', width: '300px', backgroundColor: selectedUserId === user.id ? 'orange' : 'black' }} onClick={handleUserSelect}>

                <p onClick={handleShowUserDeails}>ID: {user.id} <br /> <br /></p>
                <p>Name: <input type="text" defaultValue={user.name} onChange={handleNameChange} style={{ marginLeft: '10px' }} /> <br /></p>
                <p>Email: <input type="email" defaultValue={user.email} onChange={handleEmailChange} style={{ marginLeft: '10px' }} /> <br /> <br /></p>
                <button onMouseOver={showOtherData} style={{ backgroundColor: 'blue', color: 'white', marginBottom: '10px', padding: '5px 10px' }}>Other Data</button>
                {isHovered && (
                    <div style={{ border: '2px solid black', padding: '10px', marginTop: '10px' }} onClick={hideOtherData}>
                        Street: <input type="text" defaultValue={user.address.street} /> <br />
                        City: <input type="text" defaultValue={user.address.city} /> <br />
                        Zip Code: <input type="text" defaultValue={user.address.zipcode} /> <br />
                    </div>

                )}

                <button style={{ backgroundColor: 'green', color: 'white', marginRight: '10px', padding: '5px 10px' }} onClick={() => handleUpdateUser(user.id)}>Update</button>
                <button style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px' }} onClick={() => handleDeleteUser(user.id)}>Delete</button>
            </div>

            {/* {Todos section} */}
            {isToShowUserTodos && (
                <div style={{ border: '2px solid black', padding: '10px', width: '400px' }}>
                    <strong onClick={closeTasts}>Todos - user: {user.id}</strong>
                    <button style={{ backgroundColor: 'gold', color: 'black', marginLeft: '350px', padding: '10px' }} onClick={() => handleAddNewTodo(true)}>Add</button >
                    {isToDisplayAddNewTodo && (
                        <div style={{ border: '2px solid red' }}>
                            New Todo - User {user.id} <br /> <br />
                            Title: <input type="text" onChange={handleTitle} /> <br /> <br />
                            <button style={{ backgroundColor: 'green', color: 'white', marginRight: '10px', padding: '5px 10px' }} onClick={handleAddTodo}>Add</button>
                            <button style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px' }} onClick={() => handleAddNewTodo(false)}>Cancel</button> <br /> <br />



                        </div>
                    )}
                    {todos.filter(todo => todo.userId === user.id)
                        .map((todo) => (
                            < div key={todo.id} style={{ marginBottom: '30px', padding: '20px', border: '1px solid purple', borderRadius: '5px', }}>
                                <strong>Title:</strong> {todo.title} <br />
                                <strong>Completed:</strong> {todo.completed ? 'True' : 'False'} <br />
                                {!todo.completed && (
                                    <button onClick={() => handleMarkCompleted(todo.id)} style={{ backgroundColor: 'yellow', color: 'black', padding: '5px 10px', marginTop: '10px' }}>Mark Completed</button>
                                )}



                            </div>
                        ))}
                </div>
            )
            }

            {/* {Posts section} */}
            {
                isToShowUserPosts && (
                    <div style={{ border: '2px solid black', padding: '10px', width: '400px' }}>
                        <strong>Posts - user:  {user.id}</strong> <br />
                        <button style={{ backgroundColor: 'gold', color: 'black', marginLeft: '350px', padding: '10px' }} onClick={() => handleAddNewPost(true)}>Add</button >
                        {isToDisplayAddNewPost && (
                            <div style={{ border: '2px solid red' }}>
                                New Post - User {user.id} <br /> <br />
                                Title: <input type="text" onChange={handlePostTitle} /> <br /> <br />
                                Body: <input type="text" onChange={handlePostBody} /> <br /> <br />
                                <button style={{ backgroundColor: 'green', color: 'white', marginRight: '10px', padding: '5px 10px' }} onClick={addingNewPost}>Add</button>
                                <button style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px' }} onClick={() => handleAddNewPost(false)}>Cancel</button> <br /> <br />



                            </div>
                        )}
                        {posts.filter(post => post.userId === user.id)
                            .map((post) => (
                                <div key={post.id} style={{ marginBottom: '30px', padding: '20px', border: '1px solid purple', borderRadius: '5px', }}>
                                    <strong>Title:</strong> {post.title} <br />
                                    <strong>Body:</strong> {post.body} <br />

                                </div>
                            ))}
                    </div>
                )
            }
        </div >


    )
}

export default UserTile