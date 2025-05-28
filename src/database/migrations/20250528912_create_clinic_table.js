exports.up = function(knex) {
  return knex.schema.createTable('clinics', function(table){
    table.increments('id').primary();      
    table.integer('user_id')
         .unsigned()
         .notNullable()
         .references('id')
         .inTable('users')
         .onDelete('CASCADE');      
    table.string('name', 100).notNullable();
    table.string('cnpj', 14).notNullable().unique();
    table.jsonb('address').notNullable();
    table.string('phone').notNullable();
    table.string('whatsapp').nullable();
    table.timestamps(true, true);                   
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('patients');  // Remove a tabela caso a migração seja revertida
};