export const up = async function (knex) {
   await knex.schema.createTable('account', (table) => {
      table.uuid('id').defaultTo(knex.raw('uuid_generate_v1mc()')).primary();
      table.string('email');
      table.string('hash');
      table.string('salt');
      table.string('role');
   });
};

export const down = async function (knex) {
   await knex.schema.dropTable('account');
};
