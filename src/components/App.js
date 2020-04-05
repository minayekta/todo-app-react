import React , {useState, useRef , useEffect} from 'react'
import TodoList from './TodoList'
import uuidv4 from 'uuid/v4'
import '../index.css';
import {Button
,Input,
InputGroup,
Spinner,
Progress,
ButtonGroup
} from 'reactstrap'
const LOCAL_STOREG_KEY = 'todoApp.todos'

function App() {
    const [todos , SetTodos] = useState([])
    const todoNameRef  = useRef()

    useEffect(() => {
        const storedTodo = JSON.parse(localStorage.getItem(LOCAL_STOREG_KEY))
        if(storedTodo) SetTodos(storedTodo)
    }, [])


    useEffect(() => {
        localStorage.setItem(LOCAL_STOREG_KEY, JSON.stringify(todos))
    }, [todos])

    function toggleTodo (id){
        const newTodos = [...todos]
        const todo = newTodos.find(todo => todo.id === id )
        todo.complete = !todo.complete
        SetTodos(newTodos)
    }

    function handleAddTodo(e){
        const name = todoNameRef.current.value
        if( name === '') return
        SetTodos(prevTodos => {
            return([...prevTodos , {id:  uuidv4(), name: name , complete: false}])
        })
        todoNameRef.current.value = null        
    }
    
    function handleClearTodos(){
        const newTodos = todos.filter(todo => !todo.complete)
        SetTodos(newTodos)
    }

    return (
        <>
        
            <div className="container">
            <TodoList todos={todos} toggleTodo={toggleTodo}/>
            <InputGroup>
             <input className="col-md-4" placeholder="inter todos" ref={todoNameRef} type="text"/>
            </InputGroup>
            <ButtonGroup>
            <Button outline color="success" onClick={handleAddTodo} > add Todo  </Button>
            </ButtonGroup>
            
            <div>
                 <Button outline color="warning" onClick={handleClearTodos}> clear </Button>
            </div>
           
            {/* <div> {todos.filter(todo=> !todo.complete).length} left to do </div> */}
           <div className="col-md-3">
            <Progress className="" color="danger" value={todos.filter(todo=> !todo.complete).length} left to do />
            </div>
            </div>
            
        </>
    )
}

export default  App;