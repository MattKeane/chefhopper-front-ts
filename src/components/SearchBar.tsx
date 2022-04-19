import { 
    useState,
    ChangeEvent,
    SyntheticEvent,
} from 'react';
import {
    useNavigate
} from 'react-router-dom'


export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('')
    const navigate = useNavigate()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
    }

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        navigate('/search?q=' + searchQuery)
    }

    return (
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
    )
}