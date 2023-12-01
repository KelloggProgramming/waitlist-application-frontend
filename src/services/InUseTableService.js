const IN_USE_TABLE_API = 'http://192.168.0.202:7363/tables/in-use';

class InUseTable {

    getInUseTable() {
        return fetch(IN_USE_TABLE_API);
    }
}

export default new InUseTable();