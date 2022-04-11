export interface Recipe {
    title: string
    ingredients: string[],
    instructions: string[],
    id: number,
}

export interface User {
    username: string,
    email: string,
    id: number,
}

export interface UserState {
    username: string | null,
    email: string | null,
    id: number | null,
    status: string,
}

export interface SavedRecipesState {
    recipes: Recipe[],
    status: string,
}

export interface State {
    user: UserState,
    savedRecipes: SavedRecipesState,
}