
exports.up = async knex => {
  const exists = await knex.schema.hasTable('jsons');
  if (!exists) {
    return knex.schema.createTable('jsons', table => {
      table.increments();
      table.string('jsonpath').unique();
      table.string('ip');
      table.text('json');
      table.timestamps();
    });
  } else {
    return "Table already exists";
  }
};

exports.down = knex => {
  return knex.schema.dropTable("jsons");
};
