// migrations/20250521513_update_users_add_role.js
exports.up = function(knex) {
  return knex.schema.alterTable('users', function(table){
    table.enu('role', ['patient', 'clinic', 'employee', 'specialist']).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('users', function(table){
    table.dropCollumn('role');
  });
};