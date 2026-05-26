const Database = require("better-sqlite3");
const path = require("path");

// DB file will be created automatically if it doesn't exist
const dbPath = path.join(__dirname, "../../database.sqlite");

const db = new Database(dbPath);

// Good practice
db.pragma("foreign_keys = ON");

module.exports = db;
