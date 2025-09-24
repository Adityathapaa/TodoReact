import React, { useState, useRef } from 'react'

import './App.css'


function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
   const [todoIndex, setTodoIndex] = useState([null])
    const [todoText, setTodosText] = useState([""])
    const buttonRef = useRef(null);


  const yo = (e) => {

    setTodo(e.target.value);
  }

  const clicked = () => {
    if (todo.trim() !== "") {
      setTodos([...todos, { text: todo, completed: false }]);
      setTodo("");
      console.log(todos);
    }
  };

  const check = (index) => {
    const newtodos = [...todos];
    newtodos[index].completed = !newtodos[index].completed;
    setTodos(newtodos);


  }
  const edit= (index)=>{
    setTodoIndex(index);
    setTodosText(todos[index].text);
    
  }
  const saveme = (index)=>{
    // setTodos(todos[index].text) = todoText;
    const newtodo = [...todos]
    newtodo[index].text = todoText;
    setTodos(newtodo);
    setTodoIndex(null);
    setTodosText("");
    // newtodo = "";
  }

  const deleteme = (index)=>{
    const newtodo = todos.filter((_,i)=>i!=index);
    setTodos(newtodo);

  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent default form submission if inside a form
      buttonRef.current.click(); // Programmatically click the button
    }
  };




  return (
    <>
      <h1 class='todo'>TODO </h1>
      
      <div className='flex-1 '>
      <input type="text" onKeyDown={handleKeyDown} onChange={yo} value={todo} placeholder='Add your new todo' className=' text-center my-8 p-1 ' />
      <button className=' bg-sky-100 mx-5' onClick={clicked } ref={buttonRef} >Add me</button>
      </div>

      <ul>
        {todos.map((t, index) => {

          return <div className='flex'>

            <input type="checkbox" checked={t.completed} onChange={() => check(index)}  />

            
            
            {todoIndex === index? (
              <>
              <input class="editText" value={todoText} type='text' onChange={(e)=> setTodosText(e.target.value)}/>
              <button  class= "save" onClick={()=>saveme(index)}>Save</button>
              </>

            ):(
              <span class="ok" style={{ textDecoration: t.completed ? "line-through" : ""}}>
              {t.text}
            </span>

            )
            
          }
          <button onClick={()=>edit(index)}class="buttone">Edit</button>
          <button onClick={()=>deleteme(index)} class="buttone">Delete</button>

          </div>

        })}
      </ul>





    </>
  );
}


export default App
