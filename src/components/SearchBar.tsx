import { 
    useState,
    ChangeEvent,
    SyntheticEvent,
} from 'react';
import {
    useNavigate
} from 'react-router-dom'
import styled from 'styled-components'

const Form = styled.form`
    display: flex;
    flex-direction: column;
    margin: 1rem auto;
    width: 100%;
    max-width: 500px;

    button {
        margin: 5px;
        align-self: center;
    }

    input {
        border: 0;
        padding: 3px;
        border-radius: 8px;
    }
`


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
        <Form onSubmit={ handleSubmit }>
            <input
                type="text"
                value={ searchQuery }
                name="searchField"
                id="searchField"
                onChange={ handleChange }
                placeholder="Search for a new recipe"
            />
            <button>
                Search
            </button>
        </Form>
    )
}