import mongoose from 'mongoose';

// Connection URI
const mongoURI = 'mongodb://localhost:27017/ea-exercise-mongoose';  

export async function startConnection() {
    mongoose.set('strictQuery', true);

    try {
        await mongoose.connect(mongoURI);
        console.log('✅ Conectado a MongoDB');

        // Eliminar colecciones solo si existen
        const db = mongoose.connection.db;
        const collections = await db.listCollections().toArray();
        const collectionNames = collections.map(c => c.name);

        if (collectionNames.includes('users')) {
            await db.dropCollection('users');
            console.log('🗑 Colección users eliminada');
        }
        if (collectionNames.includes('todos')) {
            await db.dropCollection('todos');
            console.log('🗑 Colección todos eliminada');
        }
    } catch (err) {
        console.error('Error al conectar:', err);
    }
}