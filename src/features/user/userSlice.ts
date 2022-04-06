import { 
    createSlice,
    createAsyncThunk 
} from '@reduxjs/toolkit'
import { UserState } from '../../types'

interface LogInPayload {
    username: string,
    password: string
}
export const logInUser = createAsyncThunk(
    'user/logIn',
    async (payload: LogInPayload, thunkAPI) => {
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
            return logInJson.data
        } catch (err) {
            console.log(err)
        }
        
    }
)

const initialState = {
    username: null,
    email: null,
    id: null,
    status: 'idle',
} as UserState

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(logInUser.fulfilled, (state, action) => {
            const { username, id, email } = action.payload
            state.username = username
            state.id = id
            state.email = email
            state.status = 'success'
        })
    }
})

export default userSlice.reducer