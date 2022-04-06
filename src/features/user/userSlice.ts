import { 
    createSlice,
    createAsyncThunk 
} from '@reduxjs/toolkit'
import { UserState } from '../../types'

interface LogInPayload {
    username: string,
    password: string
}

interface RegisterPayload {
    username: string,
    email: string,
    password: string,
    verifyPassword?: string
}

// thunk to handle user log ins
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
            if (logInResponse.status === 200) {
                // fulfill on successful api request
                const logInJson = await logInResponse.json()
                return logInJson.data
            } else if (logInResponse.status === 401) {
                // reject with invalid message when credentials are invalid
                return thunkAPI.rejectWithValue('invalid')
            }
        } catch (err) {
            // reject with error on errors
            return thunkAPI.rejectWithValue('error')
        }
        
    }
)

// thunk to handle user registration
export const registerUser = createAsyncThunk(
    'user/register',
    async (payload: RegisterPayload, thunkAPI) => {
        const { REACT_APP_API_URL: baseUrl } = process.env
        const url = baseUrl + '/api/v1/users/register'
        try {
            const registerResponse = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(payload),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (registerResponse.status === 201) {
                // fulfill on succesful api request
                const registerJson = await registerResponse.json()
                return registerJson.data
            } else if (registerResponse.status === 401) {
                // reject with exists message if username is taken
                return thunkAPI.rejectWithValue('exists')
            }
        } catch (err) {
            // reject on error
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
                if (action.payload === 'invalid') {
                    state.status = 'rejected'
                } else {
                    state.status = 'error'
                }
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                // update user on successful registration
                const { username, id, email } = action.payload
                state.username = username
                state.id = id
                state.email = email
                state.status = 'success'
            })
            .addCase(registerUser.rejected, (state, action) => {
                // set rejection status on registration rejection
                if (action.payload === 'exists') {
                    state.status = 'exists'
                } else {
                    state.status = 'error'
                }
            })
    }
})

export default userSlice.reducer