import React , {useState, useRef} from 'react'
import TodoList from './TodoList'
 import uuidv4 from 'uuid/v4'
function App() {
    const [todos , SetTodos] = useState([{ id: 1 , name: 'todo 1' , complete: false }])
    const todoNameRef  = useRef()
    function handleAddTodo(e){
        const name = todoNameRef.current.value
        if( name === '') return
        SetTodos(prevTodos => {
            return([...prevTodos , {id:  uuidv4(), name: name , complete: false}])
        })
        todoNameRef.current.value = null        
    }
    return (
        <>
            <div>
            <TodoList todos={todos}/>
            <input ref={todoNameRef} type="text"/>
            <button onClick={handleAddTodo}> add Todo </button>
            <button> clear </button>
            <div> 0 todo </div>
            </div>
        </>
    )
}

export default  App;