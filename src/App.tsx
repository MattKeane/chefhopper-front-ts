import { 
  useState,
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
import NavBar from './components/NavBar'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const userState = useSelector((state: State) => state.user)
  const navigate = useNavigate()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    navigate('/search?q=' + searchQuery)
  }

  return (
    <div className="App">
      <NavBar />
      {
        userState.username
        &&
        <p>Welcome, { userState.username }</p>
      }
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
