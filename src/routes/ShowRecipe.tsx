import {
    useState,
    useEffect,
} from 'react'
import { useParams } from 'react-router-dom'
import { Recipe } from '../types'

export default function ShowRecipe() {
    const [recipe, setRecipe] = useState<Recipe | null>(null)
    const { recipeId } = useParams()

    useEffect(() => {
        const { REACT_APP_API_URL: baseUrl } = process.env
        const url = baseUrl + '/api/v1/recipes/' + recipeId
        fetch(url)
            .then(res => res.json())
            .then(json => setRecipe(json.data))
            .catch(err => console.log(err))
    }, [recipeId])

    return(
        <main>
            {
                recipe
                &&
                <>
                    <h1>{ recipe.title }</h1>
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
        </main>
    )
}