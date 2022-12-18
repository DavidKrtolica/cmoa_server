export const up = async function (knex) {
   await knex.schema.createTable('artworkAccount', (table) => {
      table.uuid('artworkId');
      table.uuid('accountId');
   });
};

export const down = async function (knex) {
   await knex.schema.dropTable('artworkAccount');
};
