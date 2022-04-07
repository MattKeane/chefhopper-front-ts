import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import savedRecipesReducer from './savedRecipes/savedRecipesSlice'

export default configureStore({
    reducer: {
        user: userReducer,
        savedRecipes: savedRecipesReducer,
    }
})