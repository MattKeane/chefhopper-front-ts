import { 
    createSlice,
    createAsyncThunk 
} from '@reduxjs/toolkit'
import { User } from '../../types'

interface UserState {
    user: User | null
}

interface LogInPayload {
    username: string,
    password: string
}
export const logInUser = createAsyncThunk(
    'user/logIn',
    async (payload: LogInPayload, thunkAPI) => {
        console.log(payload)
        const { REACT_APP_API_URL: baseUrl } = process.env
        const url = baseUrl + '/api/v1/users/login'
        try {
            const logInResponse = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(payload),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const logInJson = await logInResponse.json()
            console.log(logInJson)
            return logInJson.data
        } catch (err) {
            console.log(err)
        }
        
    }
)



const initialState = {
    user: null
} as UserState

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(logInUser.fulfilled, (state, action) => {
            console.log('extra reducer is running')
            state.user = action.payload
        })
    }
})

export default userSlice.reducer