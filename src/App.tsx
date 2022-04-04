import { 
  useState,
  ChangeEvent,
  SyntheticEvent,
} from 'react';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    console.log(searchQuery)
  }

  return (
    <div className="App">
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
    </div>
  );
}

export default App;
