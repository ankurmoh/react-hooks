import React, { useState, useEffect, useReducer } from 'react';
import NoteList from './NoteList'
import notesReducer from '../reducers/notes'
import AddNoteForm from './AddNoteFrom'
import NotesContext from '../context/notes-context'

const NoteApp = () => {

    const [notes, dispatch] = useReducer(notesReducer, [])
  
    useEffect(() => {
      console.log('This only runs once!')
      const notes = JSON.parse(localStorage.getItem('notes'))
  
      if (notes) {
        dispatch( {type: 'POPULATE_NOTES', notes} )
      }
    }, [])
  
    useEffect(() => {
      localStorage.setItem('notes', JSON.stringify(notes))
    },[notes])
  
    return (
      <NotesContext.Provider value={{ notes, dispatch }}>
        <h1>Notes</h1>
        <NoteList/>
        <AddNoteForm/>
      </NotesContext.Provider>
    )
  }
  
  // const App = (props) => {
  
  //   const [state, setState] = useState({
  //     count: props.count,
  //     text: ''
  //   })
  
  //   return (
  //     <div>
  //       <p>The current {state.text || 'count'} is {state.count}</p>
  //       <button onClick={() => setState({ ...state, count: state.count - 1})}>-1</button>
  //       <button onClick={() => setState({ ...state, count: props.count})}>Reset</button>
  //       <button onClick={() => setState({ ...state, count: state.count + 1})}>+1</button>
  //       <input value={state.text} onChange={(e) => setState({...state, text: e.target.value})}/>
  //     </div>
  //   )
  // }
  
  const App = (props) => {
    const [count, setCount] = useState(props.count)
    const [text, setText] = useState('')
  
    useEffect(() => {
      console.log('Only run once!')
    }, [])
  
    useEffect(() => {
      console.log('useEffect() ran!')
      document.title = count
    }, [count])
  
    const increment = () => {
      setCount(count + 1)
    }
    return (
      <div>
        <p>The current {text || 'count'} is {count}</p>
        <button onClick={() => setCount(count-1)}>-1</button>
        <button onClick={() => setCount(props.count)}>Reset</button>
        <button onClick={increment}>+1</button>
        <input value={text} onChange={(e) => setText(e.target.value)}/>
      </div>
    )
  }

  export {NoteApp as default}