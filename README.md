# json-db-api

[![last commit](https://img.shields.io/github/last-commit/Rundik/json-db-api.svg)](https://github.com/Rundik/json-db-api/commits/master)
[![version](https://img.shields.io/npm/v/json-db-api.svg)](https://www.npmjs.com/package/json-db-api)
[![downloads](https://img.shields.io/npm/dm/json-db-api.svg)](https://www.npmjs.com/package/json-db-api)
[![license](https://img.shields.io/npm/l/json-db-api.svg)](https://github.com/Rundik/json-db-api/blob/master/license)
![HitCount](http://hits.dwyl.com/Rundik/json-db-api.svg)

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

# check version
json-db-api.cmd --version
```

## Usage

```js
// use longpoll
fetch("localhost:8080/test/note?longpoll=1")
// use json patch
fetch("localhost:8080/test/note?patch=1")
// use both
fetch("localhost:8080/test/note?longpoll=1&patch=1")

```

## Development

```bash
# Install dependencies
npm i

# link package
npm link

# run
json-db-api
```

## ToDo

- [x] Specify database path
- [x] Long polling
- [x] JSON patch
- [ ] Code splitting with fastify plugins
- [ ] Tests
- [ ] Nodemon
- [ ] Eslint