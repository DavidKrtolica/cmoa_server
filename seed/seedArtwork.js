import db from '../knex.js';
import seedArtworks from './artworkSeedData.js';

/*export default*/
async function seedingArtworkService() {
    console.log('Creating and seeding service for ARTWORK has started...');

    const existsArtwork = await db.schema.hasTable('artwork');
    if (existsArtwork) {
        await db.schema.dropTable('artwork');
    }

    await db.schema.createTable('artwork', (table) => {
        table.uuid('id').defaultTo(db.raw('uuid_generate_v1mc()')).primary();
        table.string('title');
        table.integer('creationYear').nullable();
        table.string('medium');
        table.string('curatorDescription').nullable();
        table.float('itemHeight').nullable();
        table.float('itemWidth').nullable();
        table.float('itemDepth').nullable();
        table.float('itemDiameter').nullable();
        table.string('artistNote').nullable();
        table.string('image');
        table.string('creatorId');
        table.datetime('submittedAt');
    });
    console.log('Created artworks table');
    await db('artwork').insert(seedArtworks);
    console.log('Seeded artworks...');

    const checkArtwork = await db.select('*').from('artwork');
    console.log(checkArtwork);
}

seedingArtworkService();