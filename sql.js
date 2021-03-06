let mssql = require('mssql');

let config = {
    user: 'testapp',
    password: 'testapp',
    server: '127.0.0.1', // '127.0.0.1\\sqlexpress'
    port: 1433,
    database: 'MiniInsta',
    connectionTimeout: 5000,
    options: {
        encrypt: false
    }
};

let pool;

(async function() {
    try {
        pool = await mssql.connect(config);
        console.log('Connected to DB');
    } catch(err) {
        console.log('ERROR: ' + err);
    }
})();

exports.querySql = function(query, onData, onError) {
    try {
        pool.request()
            .query(query)
            .then(result => {
                if (onData !== undefined) {
                    onData(result);
                }
            })
            .catch(error => {
                if (onError !== undefined) {
                    onError(error);
                }
            });
    } catch(err) {
        if (onError !== undefined) {
            onError(err);
        }
    }
}

