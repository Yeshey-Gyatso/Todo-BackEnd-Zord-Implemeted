import React, { useContext, useState, useEffect } from 'react';
import { authState } from '../store/authState.js';
import {useRecoilValue} from "recoil";
import { useHistory } from 'react-router-dom';
interface Todo{
  _id: string;
  title:string;
  description:string;
  done:boolean;

}
type TodoArray=Todo[]

const TodoList = () => {
    const [todos, setTodos] = useState<TodoArray>([]);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const authStateValue = useRecoilValue(authState);
    const history = useHistory();

    useEffect(() => {
        const getTodos = async () => {
            const response = await fetch('http://localhost:3000/todo/todos', {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            const data: Todo[] = await response.json();
            setTodos(data);
            
        };
        getTodos();
    }, []);

    const addTodo = async () => {
        try {
          const response = await fetch("http://localhost:3000/todo/todos", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ title, description }),
          });
          if (response.ok) {
            const data = await response.json();
            setTodos([...todos, data]);
          } else {
           
            const errorData = await response.json();
            console.log("Server Error:", errorData);
            
          }
        } catch (error: any) {
        
          console.log("Network Error:", error.message);
         
        }
      };

    const markDone = async (id:string) => {
        const response = await fetch(`http://localhost:3000/todo/todos/${id}/done`, {
            method: 'PATCH',
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        const updatedTodo = await response.json();
        setTodos(todos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo)));
    };

    return (
        <div>
            <div style={{display: "flex"}}>
                <h2>Welcome {authStateValue.username}</h2>
                <div style={{marginTop: 25, marginLeft: 20}}>
                    <button onClick={() => {
                        localStorage.removeItem("token");
                        // window.location = "/login";
                        history.push("/login");
                    }}>Logout</button>
                </div>
            </div>
            <h2>Todo List</h2>
            <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' />
            <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' />
            <button onClick={addTodo}>Add Todo</button>
            {todos.map((todo) => (
                <div key={todo._id}>
                    <h3>{todo.title}</h3>
                    <p>{todo.description}</p>
                    <button onClick={() => markDone(todo._id)}>{todo.done ? 'Done' : 'Mark as Done'}</button>
                </div>
            ))}
        </div>
    );
};

export default TodoList;
