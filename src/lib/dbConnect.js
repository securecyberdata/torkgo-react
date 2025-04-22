import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

const MONGODB_URI = process.env.MONGODB_URI;

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  try {
    if (cached.conn) {
      console.log('Using cached MongoDB connection');
      return cached.conn;
    }

    if (!cached.promise) {
      const opts = {
        bufferCommands: false,
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 45000,
        maxPoolSize: 10,
        retryWrites: true,
        retryReads: true,
      };

      console.log('Connecting to MongoDB...');
      cached.promise = mongoose.connect(MONGODB_URI, opts);
    }

    try {
      cached.conn = await cached.promise;
      console.log('MongoDB connected successfully');

      // Add connection event listeners
      mongoose.connection.on('connected', () => {
        console.log('MongoDB connection established');
      });

      mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error:', err);
        cached.promise = null;
        cached.conn = null;
      });

      mongoose.connection.on('disconnected', () => {
        console.log('MongoDB connection disconnected');
        cached.promise = null;
        cached.conn = null;
      });

      return cached.conn;
    } catch (error) {
      console.error('Error establishing MongoDB connection:', error);
      cached.promise = null;
      cached.conn = null;
      throw error;
    }
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error(`Database connection failed: ${error.message}`);
  }
}

export default dbConnect; 