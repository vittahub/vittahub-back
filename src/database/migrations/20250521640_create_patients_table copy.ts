import { Knex } from 'knex';

// migrations/20250521640_create_patients_table.ts
export async function up (knex: Knex): Promise<void> {
  await knex.schema.createTable('patients', (table) => {
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
  });
};

export async function down (knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('patients');
};
