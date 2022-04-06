import { 
    useState,
    ChangeEvent,
    SyntheticEvent, 
} from 'react'

export default function Register() {
    const initialFormState = {
        username: '',
        email: '',
        password: '',
        verifyPassword: ''
    }

    const [formState, setFormState] = useState(initialFormState)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormState(currentFormState => ({
            ...currentFormState,
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
                    <label htmlFor="username">
                        Username:
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={ formState.username }
                        onChange={ handleChange }
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="email">
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={ formState.email }
                        onChange={ handleChange }
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="password">
                        Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={ formState.password }
                        onChange={ handleChange }
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="verifyPassword">
                        Re-enter Password:
                    </label>
                    <input
                        type="password"
                        id="verifyPassword"
                        name="verifyPassword"
                        value={ formState.verifyPassword }
                        onChange={ handleChange }
                    />
                </fieldset>
                <button>Register</button>
            </form>
        </main>
    )
}