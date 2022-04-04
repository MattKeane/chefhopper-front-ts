import {
    useState,
    useEffect,
} from 'react'
import {
    useSearchParams
} from 'react-router-dom'
import { Recipe } from '../types'

interface SearchResponse {
    data: Recipe[],
    status: number,
    message: string,
}

export default function SearchResults() {
    const [recipes, setRecipes] = useState<Recipe[]>([])
    const [loading, setLoading] = useState(false)

    const [searchParams, setSearchParams] = useSearchParams()
    const q = searchParams.get('q') || ''

    const showRecipes = recipes.map(recipe => <li key={ recipe.id }>{ recipe.title }</li>)

    useEffect(() => {
        setLoading(true)
        const { REACT_APP_API_URL: baseUrl } = process.env
        const query = q.replace(/\s/g, '+')
        const url = baseUrl + '/api/v1/recipes/search/' + query
        fetch(url)
            .then((res): Promise<SearchResponse> => res.json())
            .then(json => setRecipes(json.data))
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }, [q])

    return (
        <main>
            {
                loading
                ?
                <p>Loading…</p>
                :
                <ul>
                    { showRecipes }
                </ul>
            }           
        </main>
    )
}