import { 
    useState,
    ChangeEvent,
    SyntheticEvent, 
} from 'react'

export default function LogIn() {
    const initialFormState = {
        username: '',
        password: '',
    }

    const [formState, setFormState] = useState(initialFormState)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormState(currentState => ({
            ...currentState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        console.log(formState)
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