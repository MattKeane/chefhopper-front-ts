import './App.css';
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { State } from './types'
import NavBar from './components/NavBar'

function App() {
  const userState = useSelector((state: State) => state.user)

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
