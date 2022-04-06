import { 
  useState,
  useEffect,
  ChangeEvent,
  SyntheticEvent,
} from 'react';
import './App.css';
import {
  Outlet,
  useNavigate
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { State } from './types'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const userState = useSelector((state: State) => state.user)
  const navigate = useNavigate()
  console.log(userState)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  useEffect(() => console.log(userState))

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    navigate('/search?q=' + searchQuery)
  }

  return (
    <div className="App">
      {
        userState.username
        &&
        <p>Welcome, { userState.username }</p>
      }
      <form onSubmit={ handleSubmit }>
        <label htmlFor="searchField">
          Search:
        </label>
        <input
          type="text"
          value={ searchQuery }
          name="searchField"
          id="searchField"
          onChange={ handleChange }
        />
        <button>
          Search
        </button>
      </form>
      <Outlet />
    </div>
  );
}

export default App;
