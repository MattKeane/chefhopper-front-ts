import { 
    useState,
    useEffect,
    ChangeEvent,
    SyntheticEvent, 
} from 'react'
import { 
    useDispatch,
    useSelector 
} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { logInUser } from '../features/user/userSlice'
import { State } from '../types'

const Form = styled.form`
    margin: 0 auto;
    max-width: 300px;

    fieldset {
        display: flex;
        justify-content: space-between;
    }
`

export default function LogIn() {
    const initialFormState = {
        username: '',
        password: '',
    }

    const [formState, setFormState] = useState(initialFormState)
    const [message, setMessage] = useState('')
    const navigate = useNavigate()
    const userState = useSelector((state: State) => state.user)

    const dispatch = useDispatch()

    useEffect(() => {
        if (userState.status === 'success') {
            // navigate to home on successful login
            navigate('/')
        } else if (userState.status === 'rejected') {
            // set invalid credentials message
            setMessage('Invalid username or password')
        } else if (userState.status === 'error') {
            // set error message
            setMessage('Error logging in')
        }
    }, [userState.status, navigate])

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
        <>
            <h2>Log In</h2>
            {
                message
                &&
                <p>{ message }</p>
            }
            <Form onSubmit={ handleSubmit }>
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
            </Form>
        </>
    )
}