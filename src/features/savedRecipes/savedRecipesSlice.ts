import { 
    createSlice,
    createAsyncThunk, 
} from '@reduxjs/toolkit'
import { Recipe } from '../../types'

interface RecipeState {
    recipes: Recipe[],
    status: string
}

export const getSavedRecipes = createAsyncThunk(
    'savedRecipes/getSavedRecipes',
    async (_, thunkAPI) => {
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

export const saveRecipe = createAsyncThunk(
    'savedRecipes/saveRecipe',
    async (recipeId: string, thunkAPI) => {
        const { REACT_APP_API_URL: baseUrl } = process.env
        const url = baseUrl + '/api/v1/recipes/save/' + recipeId
        try {
            const saveRecipeResponse = await fetch(url, {
                method: 'POST',
                credentials: 'include'
            })
            if (saveRecipeResponse.status === 201) {
                const saveRecipeJson = await saveRecipeResponse.json()
                return saveRecipeJson.data
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
} as RecipeState

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
            .addCase(saveRecipe.fulfilled, (state, action) => {
                state.recipes = [action.payload, ...state.recipes]
            })    
})

export default savedRecipesSlice.reducer