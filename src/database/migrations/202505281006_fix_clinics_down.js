exports.up = function(knex) {
  return Promise.resolve();
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('clinics');
};
