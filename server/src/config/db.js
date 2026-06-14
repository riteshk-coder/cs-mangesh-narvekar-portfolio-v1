import mongoose from 'mongoose';

/**
 * Connects to MongoDB Atlas using the connection string supplied via
 * the MONGODB_URI environment variable.
 *
 * The process exits if the initial connection fails, since the API
 * cannot safely operate without a database connection. Subsequent
 * runtime connection errors are logged but do not crash the process,
 * since Mongoose will automatically attempt to reconnect.
 */
export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error(
      '[MongoDB] MONGODB_URI is not defined. Please set it in your .env file.'
    );
    process.exit(1);
  }

  try {
    mongoose.set('strictQuery', true);

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log(`[MongoDB] Connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error('[MongoDB] Initial connection failed:', error.message);
    process.exit(1);
  }

  mongoose.connection.on('error', (error) => {
    console.error('[MongoDB] Connection error:', error.message);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('[MongoDB] Disconnected. Mongoose will attempt to reconnect automatically.');
  });
}
