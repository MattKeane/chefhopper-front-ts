import { useEffect } from 'react'
import {
    useSelector,
    useDispatch
} from 'react-redux'
import { 
    useNavigate,
    Link 
} from 'react-router-dom'
import { getSavedRecipes } from '../features/savedRecipes/savedRecipesSlice'
import { State } from '../types'

export default function SavedRecipes() {
    const savedRecipes = useSelector((state: State) => state.savedRecipes.recipes)
    const user = useSelector((state: State) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (!user.username) {
            navigate('/')
        } else {
            dispatch(getSavedRecipes())
        }
    }, [user.username, navigate, dispatch])

    const showSavedRecipes = savedRecipes.map(recipe => {
        const url = '/recipe/' + recipe.id
        return (
            <li key={ recipe.id }>
                <Link to={ url }>{ recipe.title }</Link>
            </li>
        )}
    )

    return (
        <ul>
            { showSavedRecipes }
        </ul>
    )
}