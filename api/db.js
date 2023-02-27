import mysql from 'mysql';

const mysqlUser = {
    poolLimit: 10,
    host: "localhost",
    user: "root",
    password: "password",
    database: 'fwitter'
}

export const db = mysql.createPool(mysqlUser);
