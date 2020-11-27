module.exports = {
  "type": process.env.DB_TYPE,
  "host": process.env.DB_HOST,
  "database": process.env.DB_NAME,
  "username": process.env.DB_USER,
  "password": process.env.DB_PASS,
  "port": process.env.DB_PORT,
  "entities": [
    "dist/models/**/*.js"
  ],
  "migrations": [
    "dist/migration/**/*.js"
  ],
  "cli": {
    "entitiesDir": "dist/models",
    "migrationsDir": "dist/migration"
  }
}
