import { 
    createSlice,
    createAsyncThunk, 
} from '@reduxjs/toolkit'

export const getSavedRecipes = createAsyncThunk(
    'savedRecipes/getSavedRecipes',
    async (userId: number, thunkAPI) => {
        const { REACT_APP_API_URL: baseUrl } = process.env
        const url = baseUrl + '/api/v1/users/saved_recipes'
        try {
            const getSavedRecipesResponse = await fetch(url, {credentials: 'include'})
            if (getSavedRecipesResponse.status === 200) {
                const getSavedRecipesJson = await getSavedRecipesResponse.json()
                return getSavedRecipesJson.data
            } else {
                return thunkAPI.rejectWithValue('error')
            }
        } catch (err) {
            console.log(err)
            return thunkAPI.rejectWithValue('error')
        }
    }
)

const initialState = {
    recipes: [],
    status: 'idle',
}

export const savedRecipesSlice = createSlice({
    name: 'savedRecipes',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getSavedRecipes.fulfilled, (state, action) => {
                state.recipes = action.payload
                state.status = 'fulfilled'
            })    
})