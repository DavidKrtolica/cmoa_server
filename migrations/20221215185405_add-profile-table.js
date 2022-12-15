export const up = async function (knex) {
   await knex.schema.createTable('profile', (table) => {
      table.uuid('id').defaultTo(knex.raw('uuid_generate_v1mc()')).primary();
      table.string('firstName');
      table.string('lastName');
      table.string('phone');
      table.integer('age');
      table.string('gender');
      /**
       * Would need to ensure address has thie following json format
       * {
       *  addressLine
       *  zip
       *  city
       *  region
       *  country
       * }
       */
      table.jsonb('address');
      table.text('about');
      table.uuid('accountId');
   });
};

export const down = async function (knex) {
   await knex.schema.dropTable('profile');
};
