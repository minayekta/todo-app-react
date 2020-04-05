import React , {useState, useRef , useEffect, Fragment} from 'react'
import TodoList from './TodoList'
import uuidv4 from 'uuid/v4'
import { Colxx, Separator } from "./CustomBootstrap";

import './App.css';
import {Button
,Input,
InputGroup,
Spinner,
FormGroup,
Progress,
ButtonGroup,
Card,
Label,
Row,
CardImg,

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
        <Fragment>
            <div className=" container col-md-8">
        <Card   className=" col-md-5" body outline color="secondary" >
            
            {/* <Card className="col-md-4"> */}
            <TodoList todos={todos} toggleTodo={toggleTodo}/>
            {/* </Card> */}
            <Row>
          {/* <Colxx xxs="12"> */}
            <Separator className="mb-2" />
          {/* </Colxx> */}
        </Row>
        <img src="data:image/png;base64,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"/>
        <Separator className="mb-3" />
        
         
            {/* <label for="input">To Do</label> */}
            
            <input className="" placeholder="inter todos" ref={todoNameRef} type="text"/>
            
            <Separator className="mb-2" />

            <ButtonGroup>
            <Button outline color="success" onClick={handleAddTodo} >  add Todo  </Button>
            <Button outline color="warning" onClick={handleClearTodos}> clear </Button>
            </ButtonGroup>
            
            <Separator className="mb-3" />

           
            {/* <div> {todos.filter(todo=> !todo.complete).length} left to do </div> */}
           <div  >
           <label for="input"> unDone</label>
           <Separator className="mb-1" />

            <Progress className="" color="danger" value={todos.filter(todo=> !todo.complete).length} left to do />
            </div>
            
            </Card></div>
           
        </Fragment>
    )
}

export default  App;