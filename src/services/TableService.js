const API_URL = 'http://192.168.0.202:7363';

class TableService {

    getTables() {
        const ALL_TABLES_API_URL = '/tables';
        return fetch(API_URL + ALL_TABLES_API_URL);
    }

    updateStatus(tableId, status) {
        const setTableStatusUrl = API_URL + "/tables/" + tableId + "/status/" + status
        return fetch(setTableStatusUrl, {method: "PUT"})
    }
}

export default new TableService();