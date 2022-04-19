import {
    useState,
    useEffect,
} from 'react'
import {
    useSearchParams,
    Link,
} from 'react-router-dom'
import { Recipe } from '../types'
import SearchBar from '../components/SearchBar'

export default function SearchResults() {
    const [recipes, setRecipes] = useState<Recipe[]>([])
    const [loading, setLoading] = useState(false)

    const [searchParams, setSearchParams] = useSearchParams()
    const q = searchParams.get('q') || ''

    const showRecipes = recipes.map(recipe => {
        const recipeUrl = '/recipe/' + recipe.id
        return (
            <li key={ recipe.id }>
                <Link to={ recipeUrl }>{ recipe.title }</Link>
            </li>
        )
    })

    useEffect(() => {
        setLoading(true)
        const { REACT_APP_API_URL: baseUrl } = process.env
        const query = q.replace(/\s/g, '+')
        const url = baseUrl + '/api/v1/recipes/search/' + query
        fetch(url)
            .then(res => res.json())
            .then(json => setRecipes(json.data))
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }, [q])

    return (
        <>
            <SearchBar />
            {
                loading
                ?
                <p>Loading…</p>
                :
                <ul>
                    { showRecipes }
                </ul>
            }           
        </>
    )
}