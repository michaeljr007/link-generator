import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) throw new Error("Please add your Mongo URI to .env.local");

// Extend the NodeJS global type safely
declare global {
  var mongooseCache:
    | {
        conn: Mongoose | null;
        promise: Promise<Mongoose> | null;
      }
    | undefined;
}

const cached = global.mongooseCache || { conn: null, promise: null };

export async function connectDB(): Promise<Mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((m) => m);
  }

  cached.conn = await cached.promise;
  global.mongooseCache = cached;

  return cached.conn;
}
