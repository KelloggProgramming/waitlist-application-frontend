import {configureStore} from '@reduxjs/toolkit'
import apiConnectionStatusReducer from '../services/apiSlice'

export default configureStore({
    reducer: {
        apiConnectionStatus: apiConnectionStatusReducer
    }
})