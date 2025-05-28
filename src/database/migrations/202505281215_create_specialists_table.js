exports.up = function(knex){
    return knex.schema.hasTable('specialists').then(function(exists) {
        if (!exists) {
            return knex.schema.createTable('specialists', function(table){
                table.increments('id').primary();
                table.integer('user_id')
                     .unsigned()
                     .notNullable()
                     .references('id')
                     .inTable('users')
                     .onDelete('CASCADE');
                table.integer('clinic_id')
                     .unsigned()
                     .notNullable()
                     .references('id')
                     .inTable('clinics')
                     .onDelete('CASCADE');
                table.string('name', 100).notNullable();
                table.string('speciality').notNullable();
                table.string('phone').notNullable();
                table.timestamps(true, true)
            });
        }
    });
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('specialists');
};