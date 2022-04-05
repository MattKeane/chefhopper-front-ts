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
    user: {
        user: User | null
    }    
}