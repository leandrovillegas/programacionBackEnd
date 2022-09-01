const sqlite = {
  client: 'sqlite3', // or 'better-sqlite3'
  connection: {
    filename: "./db/mydb.sqlite"
  },
  useNullAsDefault: true
};


module.exports = { sqlite }