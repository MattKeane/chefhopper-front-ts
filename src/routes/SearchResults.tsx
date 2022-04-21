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
import styled from 'styled-components'

const Ul = styled.ul`
    list-style: none;
    text-align: left;
    display: inline-block;
    margin: 0 auto;

    a {
        color: inherit;
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }

    li {
        margin: 2px;
    }
`

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
            .then(json => {
                setRecipes(json.data)
                console.log(json)
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }, [q])

    return (
        <>
            <h2>Search Results</h2>
            <SearchBar />
            {
                loading
                ?
                <p>Loading…</p>
                :
                <Ul>
                    { showRecipes }
                </Ul>
            }           
        </>
    )
}