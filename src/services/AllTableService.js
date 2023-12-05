const ALL_TABLES_API_URL = 'http://192.168.0.202:7363/tables';

class AllTableService {
    
    getTables() {
        return fetch(ALL_TABLES_API_URL);
    }
}

export default new AllTableService();