import mysql from "mysql";
import config from "./config";

// Creating a connection object:
const connection = mysql.createPool({
    host: config.mysql.mysqlHost,
    user: config.mysql.mysqlUser,
    password: config.mysql.mysqlPassword,
    database: config.mysql.mysqlDatabase
});

console.log("We're connected to MySQL");

function execute(sql: string, values: any[]): Promise<any> {

    return new Promise<any>((resolve, reject) => {

        // Execute the sql on MySQL:
        connection.query(sql, values, (err, result) => {

            // If there is an error: 
            if (err) {
                reject(err);
                return;
            }

            // No error - report data: 
            resolve(result);
        });

    });
}

export default {
    execute
};