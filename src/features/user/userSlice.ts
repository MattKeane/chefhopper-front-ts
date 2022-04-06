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
    // thunk to handle user log ins
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
            if (logInResponse.status === 200) {
                // fulfill on successful api request
                console.log('status 200')
                const logInJson = await logInResponse.json()
                return logInJson.data
            } else if (logInResponse.status === 401) {
                // reject with invalid message when credentials are invalid
                console.log('status 401')
                return thunkAPI.rejectWithValue('invalid')
            }
        } catch (err) {
            // reject with error on erros
            return thunkAPI.rejectWithValue('error')
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
        builder
            .addCase(logInUser.fulfilled, (state, action) => {
                // update user on successful login
                const { username, id, email } = action.payload
                state.username = username
                state.id = id
                state.email = email
                state.status = 'success'
            })
            .addCase(logInUser.rejected, (state, action) => {
                // set rejection status on login rejection
                console.log('Rejected reducer running')
                if (action.payload === 'invalid') {
                    state.status = 'rejected'
                } else {
                    state.status = 'error'
                }
            })
    }
})

export default userSlice.reducer