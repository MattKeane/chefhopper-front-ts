import {
    useSearchParams
} from 'react-router-dom'

export default function SearchResults() {
    const [searchParams, setSearchParams] = useSearchParams()
    const q = searchParams.get('q')

    return (
        <p>{ q }</p>
    )
}