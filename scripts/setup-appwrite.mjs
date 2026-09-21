#!/usr/bin/env node
/**
 * Appwrite bootstrap script — creates the "gom" database, all collections
 * and attributes, storage buckets, and (optionally) an admin user.
 *
 * Usage:
 *   node scripts/setup-appwrite.mjs
 *
 * Reads Appwrite credentials from `.env.local` (or process.env).
 * Requires an API key with scopes:
 *   users.read, users.write, sessions.read, sessions.write,
 *   databases.read, databases.write, storage.read, storage.write
 *
 * Idempotent: existing resources are skipped, missing attributes are added.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  Client,
  Databases,
  Storage,
  Users,
  ID,
  Query,
  Permission,
  Role,
} from "node-appwrite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

function loadEnv() {
  const env = { ...process.env };
  const envFile = path.join(root, ".env.local");
  if (fs.existsSync(envFile)) {
    for (const line of fs.readFileSync(envFile, "utf8").split("\n")) {
      const match = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)\s*$/);
      if (match && env[match[1]] === undefined) {
        env[match[1]] = match[2].replace(/^["']|["']$/g, "").trim();
      }
    }
  }
  return env;
}

const env = loadEnv();

const REQUIRED = [
  "NEXT_PUBLIC_APPWRITE_ENDPOINT",
  "NEXT_PUBLIC_APPWRITE_PROJECT_ID",
  "APPWRITE_API_KEY",
];

const missing = REQUIRED.filter((key) => !env[key]);
if (missing.length) {
  console.error(
    `Missing required env vars: ${missing.join(", ")}\n` +
      "Add them to .env.local first (endpoint, projectId, and a server API key)."
  );
  process.exit(1);
}

const endpoint = env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectId = env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const apiKey = env.APPWRITE_API_KEY;

const DATABASE_ID = env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "gom";

const COLLECTIONS = {
  events: "events",
  pastors: "pastors",
  churches: "churches",
  contact: "contact",
};

const BUCKETS = {
  event_images: "event_images",
  pasto_images: "pasto_images",
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const client = new Client()
  .setEndpoint(endpoint)
  .setProject(projectId)
  .setKey(apiKey);

const databases = new Databases(client);
const storage = new Storage(client);
const users = new Users(client);

// ── helpers ───────────────────────────────────────────────────────────────
async function resourceExists(probe) {
  try {
    await probe();
    return true;
  } catch (error) {
    return error?.code === 409 || error?.type === "resource_already_exists";
  }
}

async function waitForAttributes(databaseId, collectionId, keys, timeoutMs = 30000) {
  const deadline = Date.now() + timeoutMs;
  const pending = new Set(keys);
  while (pending.size && Date.now() < deadline) {
    const attrs = await databases.listAttributes(databaseId, collectionId);
    for (const attr of attrs.attributes) {
      if (attr.status === "available") pending.delete(attr.key);
    }
    if (pending.size) await sleep(400);
  }
  if (pending.size) {
    console.warn(
      `  ⚠ Attributes still processing: ${[...pending].join(", ")}`
    );
  }
}

async function ensureAttributes(databaseId, collectionId, attrs) {
  const existing = await databases.listAttributes(databaseId, collectionId);
  const keys = new Set(existing.attributes.map((a) => a.key));
  const created = [];
  for (const attr of attrs) {
    if (keys.has(attr.key)) continue;
    try {
      await databases[attr.type](
        databaseId,
        collectionId,
        attr.key,
        attr.size,
        attr.required,
        attr.default,
        attr.array,
        attr.encrypt
      );
      created.push(attr.key);
    } catch (error) {
      if (error?.code !== 409) throw error;
    }
  }
  if (created.length) {
    console.log(`  added attributes: ${created.join(", ")}`);
    await waitForAttributes(databaseId, collectionId, created);
  }
}

function publicReadWrite(writeOperate) {
  const perms = [
    Permission.read(Role.any()),
    Permission.create(writeOperate),
    Permission.update(writeOperate),
    Permission.delete(writeOperate),
  ];
  return perms;
}

// ── database ──────────────────────────────────────────────────────────────
console.log(`\nAppwrite setup for project ${projectId}\n`);

if (await resourceExists(() => databases.getDatabase(DATABASE_ID))) {
  console.log(`• Database "${DATABASE_ID}" already exists`);
} else {
  await databases.createDatabase(DATABASE_ID, "God's Oracle Ministries");
  console.log(`• Created database "${DATABASE_ID}"`);
}

// ── collections ───────────────────────────────────────────────────────────
const schema = {
  [COLLECTIONS.events]: {
    permissions: publicReadWrite(Role.users()),
    attributes: [
      { key: "title", type: "createStringAttribute", size: 255, required: true },
      { key: "subtitle", type: "createStringAttribute", size: 512, required: false },
      { key: "address", type: "createStringAttribute", size: 512, required: false },
      { key: "date", type: "createDatetimeAttribute", size: null, required: true },
      { key: "starttime", type: "createStringAttribute", size: 32, required: false },
      { key: "endtime", type: "createStringAttribute", size: 32, required: false },
      { key: "gspeaker", type: "createStringAttribute", size: 255, required: false },
      { key: "tag", type: "createStringAttribute", size: 128, required: false },
      { key: "image", type: "createStringAttribute", size: 1024, required: false },
      { key: "status", type: "createStringAttribute", size: 32, required: false, default: "Active" },
    ],
  },
  [COLLECTIONS.pastors]: {
    permissions: publicReadWrite(Role.users()),
    attributes: [
      { key: "name", type: "createStringAttribute", size: 255, required: true },
      { key: "rank", type: "createStringAttribute", size: 255, required: false },
      { key: "address", type: "createStringAttribute", size: 512, required: false },
      { key: "email", type: "createStringAttribute", size: 255, required: false },
      { key: "phone", type: "createStringAttribute", size: 64, required: false },
      { key: "startdate", type: "createStringAttribute", size: 64, required: false },
      { key: "image", type: "createStringAttribute", size: 1024, required: false },
      { key: "borderColor", type: "createStringAttribute", size: 64, required: false },
      { key: "glowColor", type: "createStringAttribute", size: 64, required: false },
      { key: "status", type: "createStringAttribute", size: 32, required: false, default: "Active" },
    ],
  },
  [COLLECTIONS.churches]: {
    permissions: publicReadWrite(Role.users()),
    attributes: [
      { key: "name", type: "createStringAttribute", size: 255, required: true },
      { key: "address", type: "createStringAttribute", size: 512, required: false },
      { key: "desc", type: "createStringAttribute", size: 4096, required: false },
      { key: "map", type: "createStringAttribute", size: 2048, required: false },
      { key: "status", type: "createStringAttribute", size: 32, required: false, default: "Active" },
    ],
  },
  [COLLECTIONS.contact]: {
    permissions: [
      Permission.read(Role.users()),
      Permission.create(Role.any()),
      Permission.update(Role.users()),
      Permission.delete(Role.users()),
    ],
    attributes: [
      { key: "name", type: "createStringAttribute", size: 255, required: true },
      { key: "email", type: "createStringAttribute", size: 255, required: true },
      { key: "phone", type: "createStringAttribute", size: 64, required: false },
      { key: "message", type: "createStringAttribute", size: 8192, required: true },
      { key: "createdAt", type: "createDatetimeAttribute", size: null, required: true },
    ],
  },
};

for (const [collectionId, config] of Object.entries(schema)) {
  const exists = await resourceExists(() =>
    databases.getCollection(DATABASE_ID, collectionId)
  );
  if (exists) {
    console.log(`• Collection "${collectionId}" already exists`);
  } else {
    await databases.createCollection(
      DATABASE_ID,
      collectionId,
      collectionId,
      config.permissions,
      false,
      true
    );
    console.log(`• Created collection "${collectionId}"`);
    await sleep(500);
  }
  await ensureAttributes(DATABASE_ID, collectionId, config.attributes);
}

// ── buckets ───────────────────────────────────────────────────────────────
const imagePermissions = [
  Permission.read(Role.any()),
  Permission.create(Role.users()),
  Permission.update(Role.users()),
  Permission.delete(Role.users()),
];

for (const [bucketId, name] of Object.entries(BUCKETS)) {
  const exists = await resourceExists(() => storage.getBucket(bucketId));
  if (exists) {
    console.log(`• Bucket "${bucketId}" already exists`);
    // Ensure it can be read publicly / written by logged-in users
    await storage.updateBucket(
      bucketId,
      name,
      imagePermissions,
      false,
      true
    );
  } else {
    await storage.createBucket(
      bucketId,
      name,
      imagePermissions,
      false,
      true,
      10 * 1024 * 1024,
      ["jpg", "jpeg", "png", "webp", "gif"],
      undefined,
      undefined,
      undefined,
      true
    );
    console.log(`• Created bucket "${bucketId}"`);
  }
}

// ── admin user ────────────────────────────────────────────────────────────
if (env.APPWRITE_ADMIN_EMAIL && env.APPWRITE_ADMIN_PASSWORD) {
  const existing = await users.list([Query.equal("email", env.APPWRITE_ADMIN_EMAIL)]);
  if (existing.users.length) {
    console.log(`• Admin user ${env.APPWRITE_ADMIN_EMAIL} already exists`);
  } else {
    await users.create(
      ID.unique(),
      env.APPWRITE_ADMIN_EMAIL,
      "",
      env.APPWRITE_ADMIN_PASSWORD,
      "Church Administrator"
    );
    console.log(`• Created admin user ${env.APPWRITE_ADMIN_EMAIL}`);
  }
} else {
  console.log("• Skip admin user (set APPWRITE_ADMIN_EMAIL/PASSWORD to create one)");
}

console.log("\n✅ Setup complete.\n");