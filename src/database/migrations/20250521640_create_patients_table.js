// migrations/20250521640_create_patients_table.js
exports.up = function(knex) {
  return knex.schema.createTable('patients', function(table){
    table.increments('id').primary();      
    table.integer('user_id')
         .unsigned()
         .notNullable()
         .references('id')
         .inTable('users')
         .onDelete('CASCADE');      
    table.string('name', 100).notNullable();
    table.date('birthdate').notNullable();
    table.enu('sex', ['male', 'female', 'other']).notNullable();
    table.jsonb('address').notNullable();
    table.string('phone_1').notNullable();
    table.string('phone_2').nullable();
    table.string('cpf', 14).notNullable().unique();
    table.timestamps(true, true);                   
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('patients');  // Remove a tabela caso a migração seja revertida
};