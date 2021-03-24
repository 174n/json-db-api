# json-db-api

[![last commit](https://img.shields.io/github/last-commit/Rundik/json-db-api.svg)](https://github.com/Rundik/json-db-api/commits/master)
[![version](https://img.shields.io/npm/v/json-db-api.svg)](https://www.npmjs.com/package/json-db-api)
![downloads](https://img.shields.io/npm/dm/json-db-api.svg)
[![license](https://img.shields.io/npm/l/json-db-api.svg)](https://github.com/Rundik/json-db-api/blob/master/license)

Simple JSON API server inspired by jsonbase/myjson

## Install

```bash
# install json-db-api
npm i -g json-db-api

# migrate database
json-db-api --database db.sqlite3 --migrate
```

## Run

```bash
# specify database (db.sqlite3 by default)
json-db-api --database my-sqlite-database.sqlite3

# specify port (3000 by defautl)
json-db-api --port 8080

# log as json instead of pino-pretty
json-db-api --notpretty
```

## ToDo

[x] Specify database path
[ ] Long polling
[ ] JSON patch
[ ] Code splitting with fastify plugins