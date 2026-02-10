#!/usr/bin/env node

/**
 * Seed script to create admin user
 * Usage: node scripts/seed-admin.js [optional-url]
 * 
 * Examples:
 *   node scripts/seed-admin.js                    # Uses http://localhost:3000
 *   node scripts/seed-admin.js https://example.com
 *   SEED_URL=https://example.com node scripts/seed-admin.js
 */

// Get URL from arguments, environment, or default
const urlArg = process.argv[2];
const urlEnv = process.env.SEED_URL || process.env.NEXT_PUBLIC_API_URL;
const url = urlArg || urlEnv || "http://localhost:3000";

async function seedAdmin() {
  try {
    const seedUrl = `${url}/api/auth/seed-admin`.replace(/\/+/g, "/").replace(":/", "://");
    console.log(`🌱 Seeding admin user at ${seedUrl}...`);
    
    const response = await fetch(seedUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok) {
      console.log("✅ Admin user created successfully!");
      console.log(`   Email: ${data.email}`);
      console.log(`   Message: ${data.message}`);
      process.exit(0);
    } else {
      console.log("⚠️  Response:", data.message || data.error);
      if (data.message === "Admin already exists") {
        console.log("ℹ️  Admin user already exists in the database");
        process.exit(0);
      }
      process.exit(1);
    }
  } catch (error) {
    console.error("❌ Error seeding admin user:", error.message);
    console.error("   Make sure the server is running at:", url);
    console.error();
    console.error("   Usage:");
    console.error("     node scripts/seed-admin.js");
    console.error("     node scripts/seed-admin.js https://example.com");
    console.error("     SEED_URL=https://example.com node scripts/seed-admin.js");
    process.exit(1);
  }
}

seedAdmin();
