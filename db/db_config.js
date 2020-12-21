const sqlite3 = require('sqlite3');

let sqlDb;

const columnNames = {
  user_id: "user_id",
  password: "password",
  username: "username",
  description: "description",
  link: "link",
  name: "name",
  show: "show"
};
Object.freeze(columnNames);


function createDb() {
  console.log("created our db!");
  sqlDb = new sqlite3.Database('db.db', function() {
    createUserTable();
    createUserLinksTable();


  });
};

function createUserTable() {
  sqlDb.run(`CREATE TABLE IF NOT EXISTS users (
    ${columnNames.user_id} INTEGER PRIMARY KEY AUTOINCREMENT,
    ${columnNames.username} TEXT NOT NULL UNIQUE,
    ${columnNames.password} TEXT NOT NULL,
    ${columnNames.description} TEXT,
    ${columnNames.show} BOOL DEFAULT FALSE
  )`);
};


function createUserLinksTable() {
  sqlDb.run(`CREATE TABLE IF NOT EXISTS userLinks (
    ${columnNames.user_id} INTEGER NOT NULL,
    ${columnNames.name} TEXT NOT NULL,
    ${columnNames.link} TEXT NOT NULL,
    FOREIGN KEY (${columnNames.user_id}) REFERENCES users(${columnNames.user_id})
  )`);
};


// Helper wrapper functions that return promises that resolve when sql queries are complete.

function run(sqlQuery) {
  return new Promise((resolve, reject) => {
    sqlDb.run(sqlQuery, (err) => {
      if (err !== null) {
        reject(err);
      } else {
        resolve();
      }
    })
  });
};

function get(sqlQuery) {
  return new Promise((resolve, reject) => {
    sqlDb.get(sqlQuery, (err, row) => {
      if (err !== null) {
        reject(err);
      } else {
        resolve(row);
      }
    })
  });
};

function all(sqlQuery) {
  return new Promise((resolve, reject) => {
    sqlDb.all(sqlQuery, (err, rows) => {
      if (err !== null) {
        reject(err);
      } else {
        resolve(rows);
      }
    })
  });
};

createDb();

module.exports = {
  columnNames,
  get,
  all,
  run
};