import { Knex } from 'knex';

// migrations/20230512030000_create_users_table.ts
export async function up (knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();      // ID autoincrementável
    table.string('email', 255).notNullable().unique();  // Email único e obrigatório
    table.string('password').notNullable();        // Senha obrigatória
    table.string('role').notNullable();
    table.timestamps(true, true);                   // Cria campos created_at e updated_at
  });
};

export async function down (knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('users');  // Remove a tabela caso a migração seja revertida
};
