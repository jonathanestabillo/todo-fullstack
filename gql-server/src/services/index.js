import Mysql from 'promise-mysql';

export class SqlService {
    constructor() {
        this.conn = null;

        Mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "secret",
            database: "todo_db",
        }).then((con) => {
            console.log("Connected!");
            this.conn = con;
        }).catch((err) => {
            console.log(err.message);
        });
    }

    getItems() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM items';

            this.conn.query(sql).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    addItem({ id, value, completed }) {
        return new Promise((resolve, reject) => {
            (completed) ? completed = 1 : completed = 0;
            const sql = `INSERT INTO todo_db.items (item_id, value, completed) VALUES ('${id}', '${value}', ${completed})`;

            this.conn.query(sql).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    updateItem({ id, value, completed }) {
        return new Promise((resolve, reject) => {
            (completed) ? completed = 1 : completed = 0;
            const sql = `UPDATE todo_db.items SET value='${value}', completed=${completed} WHERE item_id = '${id}'`;

            this.conn.query(sql).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    deleteItem(id) {
        return new Promise((resolve, reject) => {
            const sql = `DELETE FROM todo_db.items WHERE item_id = '${id}'`;

            this.conn.query(sql).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }
}