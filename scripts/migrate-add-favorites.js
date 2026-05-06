// Migration script to add favorites field to existing users
// Run this once: node scripts/migrate-add-favorites.js

import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, "../.env.local") });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI not found in environment variables");
  process.exit(1);
}

async function migrate() {
  try {
    console.log("🔄 Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    const db = mongoose.connection.db;
    const usersCollection = db.collection("users");

    console.log("🔄 Updating users without favorites field...");

    const result = await usersCollection.updateMany(
      { favorites: { $exists: false } },
      { $set: { favorites: [] } }
    );

    console.log(`✅ Updated ${result.modifiedCount} users`);
    console.log(`📊 Matched ${result.matchedCount} users`);

    // Verify the update
    const usersWithFavorites = await usersCollection.countDocuments({
      favorites: { $exists: true },
    });
    const totalUsers = await usersCollection.countDocuments();

    console.log(`\n📈 Summary:`);
    console.log(`   Total users: ${totalUsers}`);
    console.log(`   Users with favorites field: ${usersWithFavorites}`);

    console.log("\n✅ Migration completed successfully!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Disconnected from MongoDB");
    process.exit(0);
  }
}

migrate();
