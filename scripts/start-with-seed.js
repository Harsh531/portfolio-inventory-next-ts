#!/usr/bin/env node

/**
 * Startup script that runs Next.js server and seeds admin on start
 * This ensures admin user is created automatically on production deployment
 */

const { spawn } = require("child_process");
const http = require("http");

const nextStartProcess = spawn("next", ["start"], {
  stdio: "inherit",
  shell: true
});

// Wait for server to be ready, then seed admin
function waitForServer(maxRetries = 30) {
  let retries = 0;

  const checkServer = () => {
    const options = {
      hostname: "localhost",
      port: 3000,
      path: "/api/profile",
      method: "GET",
      timeout: 2000
    };

    const req = http.request(options, (res) => {
      console.log("✅ Server is ready!");
      seedAdmin();
    });

    req.on("error", () => {
      retries++;
      if (retries < maxRetries) {
        console.log(`⏳ Waiting for server... (${retries}/${maxRetries})`);
        setTimeout(checkServer, 1000);
      } else {
        console.warn("⚠️  Could not connect to server after retries");
      }
    });

    req.end();
  };

  checkServer();
}

async function seedAdmin() {
  try {
    const url = process.env.SEED_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const seedUrl = `${url}/api/auth/seed-admin`.replace(/\/+/g, "/").replace(":/", "://");
    
    console.log(`\n🌱 Attempting to seed admin user at ${seedUrl}...`);

    const response = await fetch(seedUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    });

    const data = await response.json();

    if (response.ok) {
      console.log("✅ Admin user created successfully!");
      console.log(`   Email: ${data.email}`);
    } else if (data.message === "Admin already exists") {
      console.log("ℹ️  Admin user already exists");
    } else {
      console.warn("⚠️  Could not seed admin:", data.message || data.error);
    }
  } catch (error) {
    console.warn("⚠️  Could not seed admin user:", error.message);
  }
  console.log(""); // Empty line for readability
}

// Handle process termination
process.on("SIGINT", () => {
  console.log("\n🛑 Shutting down...");
  nextStartProcess.kill();
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("\n🛑 Shutting down...");
  nextStartProcess.kill();
  process.exit(0);
});

// Start waiting for server
setTimeout(waitForServer, 2000);
