import db from '../knex.js';
import seedArtists from './artistSeedData.js';

/*export default*/ 
async function seedingArtistService() {
    console.log('Creating and seeding service for ARTISTS has started...');

    const existsArtist = await db.schema.hasTable('artist');
    if (existsArtist) {
    await db.schema.dropTable('artist');
    }

    await db.schema.createTable('artist', (table) => {
        table.uuid('id').defaultTo(db.raw('uuid_generate_v1mc()')).primary();
        table.string('fullName');
        table.string('citedName').nullable();
        table.string('nationality').nullable();
        table.string('birthPlace').nullable();
        table.datetime('birthDate').nullable();
        table.datetime('deathDate').nullable();
    });
    console.log('Created artists table');
    await db('artist').insert(seedArtists);
    console.log('Seeded artists...');

    const checkArtist = await db.select('*').from('artist');
    console.log(checkArtist);
}

seedingArtistService();