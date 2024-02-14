// const API_URL = 'https://cafebelleepoque.com/api';

// const API_URL = 'http://192.168.0.202:7363/api';
const API_URL = 'http://localhost:8080/api';

class TableService {

    getTables(callback) {
        const ALL_TABLES_API_URL = '/tables';
        return fetch(API_URL + ALL_TABLES_API_URL);
    }

    updateStatus(tableId, status, callback) {
        const setTableStatusUrl = API_URL + "/tables/" + tableId + "/status/" + status
        return fetch(setTableStatusUrl, {method: "PUT"})
    }

    getTableTypes(callback) {
        const ALL_TABLES_TYPES_API_URL = '/tables/types';
        return fetch(API_URL + ALL_TABLES_TYPES_API_URL);
    }
}

export default new TableService();