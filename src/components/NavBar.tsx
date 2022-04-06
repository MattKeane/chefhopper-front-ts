import { useSelector } from 'react-redux'
import { State } from '../types'
import { Link } from 'react-router-dom'

export default function NavBar() {
    const { username } = useSelector((state: State) => state.user)

    return (
        <nav>
            {
                username
                ?
                <Link to="/logout">Log Out</Link>
                :
                <>
                    <Link to="/login">Log In</Link>
                    <Link to="/register">Register</Link>
                </>
            }
        </nav>
    )
}