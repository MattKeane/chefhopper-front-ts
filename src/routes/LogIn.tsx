import { 
    useState,
    ChangeEvent,
    SyntheticEvent, 
} from 'react'
import { useDispatch } from 'react-redux'
import { logInUser } from '../features/user/userSlice'

export default function LogIn() {
    const initialFormState = {
        username: '',
        password: '',
    }

    const [formState, setFormState] = useState(initialFormState)

    const dispatch = useDispatch()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormState(currentState => ({
            ...currentState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        dispatch(logInUser(formState))
    }

    return (
        <main>
            <form onSubmit={ handleSubmit }>
                <fieldset>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={ formState.username }
                        onChange={ handleChange }
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={ formState.password }
                        onChange={ handleChange }
                    />
                </fieldset>
                <button>Log In</button>
            </form>
        </main>
    )
}