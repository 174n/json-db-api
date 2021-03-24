const path = require('path');
const minimist = require('minimist');
const knex = require('knex');
const updateNotice = require('update-notice');
const pkg = require("./package.json");

module.exports = {
  run: async argv => {
    const args = minimist(argv);
    
    const notice = updateNotice({
      pkg,
      options: {
        isGlobal: true
      }
    });
    notice.notify();

    if (args.version) {
      console.log(`${pkg.name} (${pkg.version}) - ${pkg.description}`);
      process.exit(1);
    }

    if (!args.database) {
      args.database = "./db.sqlite3"
    }

    let knexfile;
    try {
      knexfile =  require('./knexfile');
      knexfile.connection.filename = args.database;
      if (!knexfile.migrations)
        knexfile.migrations = {};
      knexfile.migrations.directory = path.join(__dirname, "migrations");
    } catch (err) {
      console.log(err);
      process.exit(1);
    }

    if (args.migrate) {
      try {
        const migrationResult = await knex(knexfile).migrate.up();
        console.log(migrationResult);
      } catch (err) {
        console.log(err);
        process.exit(1);
      }
      console.log("Migrated successful");
      process.exit(1);
    }

    if (args.rollback) {
      try {
        const migrationResult = await knex(knexfile).migrate.down();
        console.log(migrationResult);
      } catch (err) {
        console.log(err);
        process.exit(1);
      }
      console.log("Rolled back successful");
      process.exit(1);
    }

    require('./server')({
      port: args.port || 3000,
      logger: {
        prettyPrint: args.notpretty ? false : {
          translateTime: 'SYS:HH:MM:ss'
        }
      },
      knexfile
    });

  }
}