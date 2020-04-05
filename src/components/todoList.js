import React from 'react'
import Todo from './Todo'
import { Card } from 'reactstrap'
export default function TodoList({todos, toggleTodo}) {
    return (
         todos.map(todo => {
             return( 
                
             <Todo key={todo.id} toggleTodo={toggleTodo} todo={todo}/>
         
            ) }
        
            ) 
    )
}
