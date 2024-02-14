import {createSlice} from "@reduxjs/toolkit";

export const ConnectionStatus = {
    CONNECTING: 'CONNECTING',
    CONNECTED: 'CONNECTED',
    DISCONNECTED: 'DISCONNECTED',
}
export const apiSlice = createSlice({
    name: 'apiConnectionStatus',
    initialState: {
        value: ConnectionStatus.CONNECTED
    },
    reducers: {
        connected: (state) => {
            state.value = ConnectionStatus.CONNECTED
        },
        disconnected: (state) => {
            state.value = ConnectionStatus.DISCONNECTED
        },
        connecting: (state) => {
            state.value = ConnectionStatus.CONNECTING
        }
    }
})

export const {connected, disconnected, connecting} = apiSlice.actions

export default apiSlice.reducer