
exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('jsons', function(table) {
    table.increments();
    table.string('jsonpath').unique();
    table.string('ip');
    table.text('json');
    table.timestamps();
});
};

exports.down = function(knex) {
  return knex.schema.dropTable("jsons");
};
