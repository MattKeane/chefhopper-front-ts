import {
    useState,
    useEffect,
} from 'react'
import { useParams } from 'react-router-dom'
import { 
    useSelector,
    useDispatch, 
} from 'react-redux'
import { 
    Recipe,
    State, 
} from '../types'
import { saveRecipe } from '../features/savedRecipes/savedRecipesSlice'
import SearchBar from '../components/SearchBar'

export default function ShowRecipe() {
    const [recipe, setRecipe] = useState<Recipe | null>(null)
    const { username } = useSelector((state: State) => state.user)
    const savedRecipes = useSelector((state: State) => state.savedRecipes.recipes)
    const { recipeId } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        const { REACT_APP_API_URL: baseUrl } = process.env
        const url = baseUrl + '/api/v1/recipes/' + recipeId
        fetch(url)
            .then(res => res.json())
            .then(json => setRecipe(json.data))
            .catch(err => console.log(err))
    }, [recipeId])

    const handleClick = () => {
        if (recipeId) {
            dispatch(saveRecipe(recipeId))
        }
    }

    const showSaveRecipeButton = 
        username 
        && 
        recipe 
        && 
        !savedRecipes.find(savedRecipe => savedRecipe.id === recipe.id)

    return(
        <>
            <SearchBar />
            {
                recipe
                &&
                <>
                    <h1>{ recipe.title }</h1>
                    {
                        showSaveRecipeButton
                        &&
                        <button onClick={ handleClick }>Save Recipe</button>
                    }
                    <ul>
                        {
                            recipe.ingredients.map((ingredient, i) => <li key={ i }>{ ingredient }</li>)
                        }
                    </ul>
                    <ol>
                        {
                            recipe.instructions.map((instruction, i) => <li key={ i }>{ instruction }</li>)
                        }
                    </ol>
                </>
            }
        </>
    )
}