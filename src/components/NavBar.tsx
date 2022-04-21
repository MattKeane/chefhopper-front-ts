import { useSelector } from 'react-redux'
import { State } from '../types'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Nav = styled.nav`
    padding: 5px 7px;
    display: flex;
    justify-content: space-between;
    box-shadow: 0px 2px 4px #666;

    a {
        text-decoration: none;
        padding: 0 5px;
        border-left: 1px solid #666;
        border-right: 1px solid #666;
    }

    li {
        list-style: none;
    }

    .current {
        li {
            border-bottom: 1px solid black;
        }
    }

    @media (prefers-color-scheme: dark) {
        .current {
            li {
                border-bottom: 1px solid rgb(200, 255, 200);
            }
        }
    }
`

const UserBox = styled.div`
    display: flex
`

export default function NavBar() {
    const { username } = useSelector((state: State) => state.user)

    const assignActiveClass = ({ isActive }: { isActive: boolean }) => isActive ? "current" : undefined

    return (
        <Nav>
            <NavLink to="/" className={ assignActiveClass }><li>Home</li></NavLink>
            <UserBox>
            {
                username
                ?
                <>
                    <NavLink to="/saved" className={ assignActiveClass }><li>My Recipes</li></NavLink>
                    <NavLink to="/logout"><li>Log Out</li></NavLink>
                </>
                :
                <>
                    <NavLink to="/login" className={ assignActiveClass }><li>Log In</li></NavLink>
                    <NavLink to="/register" className={ assignActiveClass }><li>Register</li></NavLink>
                </>
            }
            </UserBox>
        </Nav>
    )
}