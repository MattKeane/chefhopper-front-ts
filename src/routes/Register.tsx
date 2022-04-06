import { 
    useState,
    useEffect,
    ChangeEvent,
    SyntheticEvent, 
} from 'react'
import { 
    useDispatch,
    useSelector, 
} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../features/user/userSlice'
import { State } from '../types'

export default function Register() {
    const initialFormState = {
        username: '',
        email: '',
        password: '',
        verifyPassword: ''
    }

    const [formState, setFormState] = useState(initialFormState)
    const [message, setMessage] = useState('')
    const user = useSelector((state: State) => state.user)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (user.status === 'success') {
            // redirect to home page on successful registration
            navigate('/')
        } else if (user.status === 'exists') {
            // display message if username is already taken
            setMessage('Username taken')
        } else if (user.status === 'error') {
            // display message if an error has occured
            setMessage('Error registering')
        }
    }, [user.status, navigate])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormState(currentFormState => ({
            ...currentFormState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        if (formState.password === formState.verifyPassword) {
            // attempt registration if passwords match
            dispatch(registerUser(formState))
        } else {
            // display message if passwords don't match
            setMessage('Passwords must match.')
        }
    }

    return (
        <main>
            {
                message
                &&
                <p>{ message }</p>
            }
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