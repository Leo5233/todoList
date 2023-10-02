import { Footer, Header, TodoCollection, TodoInput } from 'components';
import { useState, useEffect } from 'react'
import { getTodo, createTodo, patchTodo, deleteTodo} from '../api/todos'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'


const TodoPage = () => {
  const [inputValue, setInputValue] = useState('')
  const [todos, setTodos] = useState([])
  const navigate = useNavigate()
  const { isAuthenticated, currentMember } = useAuth() 

  useEffect(()=>{
    if(!isAuthenticated){
      navigate('/login')
    }
  }, [navigate, isAuthenticated])

  useEffect(() => {
    const getTodoAsync = async () => {
      try{
        const todos = await getTodo();
        setTodos(todos.map(todo =>{
          return (
            {...todo, isEdit: false}
          )
        }))
      } catch(error){
        console.error(error)
      }
    }
  getTodoAsync()
  }, [])

  const handleChange = (value) => {
    setInputValue(value)

  }
  const handleAdd = async() => {
    if (inputValue.length === 0){
      return
    }
    try{
      const data = await createTodo(
        {title: inputValue,
        isDone: false}
      )
      setTodos((prevTodos) => {
        return [
          ...prevTodos,
          {
            id: data.id,
            title: data.title,
            isDone: data.isDone,
            isEdit: false
          }
        ]
      })
      setInputValue("")
    } catch(error){
        console.error(error)
     }
}

  const handleKeyDown = async() => {
    if (inputValue.length === 0){
      return
    }
    try{
      const data = await createTodo(
        {title: inputValue,
        isDone: false}
      )
      console.log('data', data)
      setTodos((prevTodos) => {
        return [
          ...prevTodos,
          {
            id: data.id,
            title: data.title,
            isDone: data.isDone,
            isEdit: false
          }
        ]
      })
      setInputValue("")
    } catch(error){
        console.error(error)
    }
    setInputValue("")
  }

  const handleToggleDone = async (id) => {
    try{
      const currentTodo = todos.find((todo) => todo.id===id)
      await patchTodo({id, isDone: !currentTodo.isDone})
    } catch(error){
      console.error(error)
    }
    setTodos(todos.map(todo => {
      if (todo.id === id){
        return {...todo, isDone: !todo.isDone}
      }
      return todo
    }))
  }

  const handleChangeMode = ({id, isEdit}) => {
    setTodos((prevTodos) => {
      return prevTodos.map(todo => {
        if (id === todo.id){
          return {...todo, isEdit}
        }
        return {...todo, isEdit: false}
      })
    })
  }

  const handleSave = async ({id, title}) => {
    try{
      await patchTodo({id, title})
    } catch(error){
      console.error(error)
    }  
    setTodos(todos.map( todo => {
      if (id === todo.id){
        return {...todo, title, isEdit: false}
      }
      return todo
    }))
  }

  const handleDelete = async (id) => {
    try{
      await deleteTodo(id)
    } catch(error){
      console.error(error)
    }  
    setTodos(todos.filter(todo => todo.id !== id))
  }


  return (
    <div>
      TodoPage
      <Header username={currentMember?.name}/> 
      <TodoInput 
        onChange={handleChange} 
        inputValue={inputValue} 
        onAddTodo={handleAdd} 
        onKeyDown={handleKeyDown}/>
      <TodoCollection 
      todos={todos} 
      onToggleDone={handleToggleDone}
      onSave={handleSave}
      onDelete={handleDelete}
      onChangeMode={handleChangeMode}/>
      <Footer todos={todos}/>
    </div>
  );
};

export default TodoPage;
