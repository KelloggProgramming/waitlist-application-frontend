import {connected, connecting, ConnectionStatus, disconnected} from "./apiSlice";
import store from '../store/store'

// const API_URL = 'https://cafebelleepoque.com/api';
// const API_URL = 'http://192.168.0.202:7363/api';
const API_URL = 'http://localhost:8080/api';

class TableService {
    makeRequest(endpoint, options, callback) {
        if (!API_URL) {
            console.log("API URL not set!");
            store.dispatch(disconnected())

            return callback(null);
        }

        if (store.getState().apiConnectionStatus.value === ConnectionStatus.DISCONNECTED) {
            store.dispatch(connecting());
        }

        fetch(API_URL + endpoint, options)
            .then(res => {
                if (res.status === 200) {
                    store.dispatch(connected());
                } else {
                    store.dispatch(disconnected());
                }

                return callback(res);
            }).catch(() => {
            console.log("Error making request to endpoint: " + endpoint);
            store.dispatch(disconnected())

            return callback(null);
        });
    }

    getTables(callback) {
        const ALL_TABLES_API_URL = '/tables';
        this.makeRequest(ALL_TABLES_API_URL, {}, callback)
    }

    updateStatus(tableId, status, callback) {
        const setTableStatusUrl = "/tables/" + tableId + "/status/" + status
        this.makeRequest(setTableStatusUrl, {method: "PUT"}, callback)
    }

    getTableTypes(callback) {
        const ALL_TABLES_TYPES_API_URL = '/tables/types';
        this.makeRequest(ALL_TABLES_TYPES_API_URL, {}, callback);
    }
}

const tableService = new TableService();

export default tableService;