// migrations/20230512030000_create_users_table.js
exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id').primary();      // ID autoincrementável
    table.string('email').notNullable().unique();  // Email único e obrigatório
    table.string('password').notNullable();        // Senha obrigatória
    table.timestamps(true, true);                   // Cria campos created_at e updated_at
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');  // Remove a tabela caso a migração seja revertida
};
