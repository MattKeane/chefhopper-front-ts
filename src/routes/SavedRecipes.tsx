import { useEffect } from 'react'
import {
    useSelector,
    useDispatch
} from 'react-redux'
import { useNavigate } from 'react-router-dom'
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

    const showSavedRecipes = savedRecipes.map(recipe => (
        <li key={ recipe.id }>{ recipe.title }</li>
    ))

    return (
        <ul>
            { showSavedRecipes }
        </ul>
    )
}